import Token from '../Token';
import fetcher from './fetcher';

export type TodoType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTodoParams = {
  id: string;
};
export type CreateTodoParams = {
  title: string;
  content: string;
};
export type UpdateTodoParams = {
  id: string;
  title: string;
  content: string;
};

export type DeleteTodoParams = {
  id: string;
};
export type GetTodosResponse = {
  data: TodoType[];
};
type CommonTodoResponseType = {
  data: TodoType;
};
export type GetTodoResponse = CommonTodoResponseType;
export type CreateTodoResponse = CommonTodoResponseType;
export type UpdateTodoResponse = CommonTodoResponseType;
export type DeleteTodoResponse = {
  data: null;
};

class TodoApi {
  public async getTodos(): Promise<GetTodosResponse> {
    return await fetcher({ method: 'GET', path: '/todos' });
  }

  public async getTodoById({ id }: GetTodoParams): Promise<GetTodoResponse> {
    return await fetcher({ method: 'GET', path: `/todos/${id}` });
  }

  public async createTodo({ title, content }: CreateTodoParams): Promise<CreateTodoResponse> {
    return await fetcher({
      method: 'POST',
      path: '/todos',
      body: { title, content },
    });
  }

  public async updateTodo({ id, title, content }: UpdateTodoParams): Promise<UpdateTodoResponse> {
    return await fetcher({
      method: 'PUT',
      path: `/todos/${id}`,
      body: { title, content },
    });
  }

  public async deleteTodo({ id }: DeleteTodoParams): Promise<DeleteTodoResponse> {
    return await fetcher({ method: 'DELETE', path: `/todos/${id}` });
  }
}

export default new TodoApi();
