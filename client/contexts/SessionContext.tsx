import { createContext, useContext, useEffect, useReducer, useState, SetStateAction } from 'react';
import { UserType } from '../lib/apis/AuthApi';
import Token from '../lib/Token';
import { TOKEN_KEY, USER_KEY } from '../lib/constants/token';
import { TodoType } from '../lib/apis/TodoApi';
import { useGetTodos } from '../components/hooks/todo/TodoQuery';

const SessionContext = createContext<SessionContextType | null>(null);

type CommonContextType = UserType & {
  token: string;
};

type SessionContextType = {
  session: SessionType;
  login: ({ email, password, token }: CommonContextType) => void;
  signUp: ({ email, password, token }: CommonContextType) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

type SessionType = {
  user: UserType | null;
  isLoggedIn: boolean;
  todos: TodoType[];
  token: string | null;
};

type ActionType =
  | { type: 'SET'; payload: { user: UserType | null; todos: TodoType[]; token: string | null } }
  | { type: 'LOGIN'; payload: { user: UserType; token: string } }
  | { type: 'SIGNUP'; payload: { user: UserType; token: string } }
  | { type: 'LOGOUT' };

export function reducer(session: SessionType, action: ActionType): SessionType {
  switch (action.type) {
    case 'SET': {
      const { user, todos, token } = action.payload;
      return { ...session, user, todos, token };
    }
    case 'LOGIN': {
      const { user, token } = action.payload;
      return { ...session, user, token };
    }
    case 'SIGNUP': {
      const { user, token } = action.payload;
      return { ...session, user, token };
    }
    case 'LOGOUT': {
      return { ...session, user: null, token: null, todos: [] };
    }
    default:
      return session;
  }
}

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const token = Token.getToken(TOKEN_KEY);
  const user = Token.getToken(USER_KEY);

  const { data: todos } = useGetTodos();

  const defaultSession: SessionType = {
    user: null,
    todos: [],
    token: null,
    isLoggedIn: !!token,
  };

  const [session, dispatch] = useReducer(reducer, defaultSession);

  const login = ({ email, password, token }: CommonContextType) => {
    Token.saveToken(TOKEN_KEY, token, 60000);
    Token.saveToken(USER_KEY, JSON.stringify({ email, password }), 60000);
    dispatch({ type: 'LOGIN', payload: { user: { email, password }, token } });
  };

  const signUp = ({ email, password, token }: CommonContextType) => {
    Token.saveToken(TOKEN_KEY, token, 60000);
    Token.saveToken(USER_KEY, JSON.stringify({ email, password }), 60000);
    dispatch({ type: 'SIGNUP', payload: { user: { email, password }, token } });
  };

  const logout = () => {
    Token.clearToken(TOKEN_KEY);
    Token.clearToken(USER_KEY);
    dispatch({ type: 'LOGOUT' });
  };

  const set = ({ user, todos, token }: { user: UserType | null; todos: TodoType[]; token: string | null }) => {
    dispatch({ type: 'SET', payload: { user, todos, token } });
  };

  useEffect(() => {
    if (todos?.data) {
      set({ user: user ? JSON.parse(user) : null, todos: todos.data, token });
    }
  }, [todos, user, token]);

  return (
    <SessionContext.Provider value={{ session, login, signUp, logout, isLoggedIn: !!session.token }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSession = () => {
  const value = useContext(SessionContext);
  if (!value) throw new Error('session context 없음!!');
  return value;
};
