const UPDATE_TODOS = 'cart/MUTATE_CART' as const;

export const updateTodos = (todos: Todo[]) => ({ type: UPDATE_TODOS, payload: todos });

export type Todo = {
  id: string;
  title: string;
  content: string;
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
