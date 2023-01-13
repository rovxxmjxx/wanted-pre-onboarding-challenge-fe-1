import { useQuery, useMutation } from 'react-query';
import { QueryKeys } from '../../../lib/constants/fetcher';
import TodoApi, {
  GetTodoParams,
  CreateTodoParams,
  UpdateTodoParams,
  DeleteTodoParams,
} from '../../../lib/apis/TodoApi';

export const useGetTodos = () => {
  return useQuery(QueryKeys.TODO, () => TodoApi.getTodos(), {
    staleTime: 0,
    cacheTime: 1000,
  });
};

export const useGetTodoById = ({ id }: GetTodoParams) => {
  return useQuery([QueryKeys.TODO, id], () => TodoApi.getTodoById({ id }));
};

export const useCreateTodo = () => {
  return useMutation(
    QueryKeys.TODO,
    ({ title, content }: CreateTodoParams) => TodoApi.createTodo({ title, content }),
    {}
  );
};

export const useUpdateTodo = () => {
  return useMutation(QueryKeys.TODO, ({ id, title, content }: UpdateTodoParams) =>
    TodoApi.updateTodo({ id, title, content })
  );
};

export const useDeleteTodo = () => {
  return useMutation(QueryKeys.TODO, ({ id }: DeleteTodoParams) => TodoApi.deleteTodo({ id }));
};
