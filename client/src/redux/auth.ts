const SAVE_TOKEN = 'auth/SAVE_TOKEN' as const;
const REMOVE_TOKEN = 'auth/REMOVE_TOKEN' as const;

export const saveToken = (token: string) => ({ type: SAVE_TOKEN, payload: token });
export const removeToken = () => ({ type: REMOVE_TOKEN });

type SessionState = string | null;
type SessionAction = ReturnType<typeof saveToken | typeof removeToken>;

const initialTodos: SessionState = localStorage.getItem('token');

export default function Auth(state: SessionState = initialTodos, action: SessionAction): SessionState {
  switch (action.type) {
    case SAVE_TOKEN: {
      const token = action.payload;
      localStorage.setItem('token', token);
      return token;
    }

    case REMOVE_TOKEN: {
      localStorage.removeItem('token');
      return null;
    }

    default:
      return state;
  }
}
