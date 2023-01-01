const UPDATE_TODOS = 'cart/MUTATE_CART' as const;

export const updateTodos = ({ todos }: { todos: any[] }) => ({ type: UPDATE_TODOS, payload: todos });

type Todo = {
  id: string;
  content: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodoState = Todo[];
type TodoAction = ReturnType<typeof updateTodos>;

const initialTodos: TodoState = [];

export default function Todo(state: TodoState = initialTodos, action: TodoAction): TodoState {
  switch (action.type) {
    case UPDATE_TODOS: {
      const newTodos = action.payload;
      return [...newTodos];
    }
    default:
      return state;
  }
}
