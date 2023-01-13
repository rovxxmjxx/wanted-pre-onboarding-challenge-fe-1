import { useQuery, useMutation } from 'react-query';
import { QueryKeys } from '../lib/constants/fetcher';
import TodoApi, { GetTodoParams, CreateTodoParams, UpdateTodoParams, DeleteTodoParams } from '../lib/apis/TodoApi';

export const useGetTodos = () => {
  return useQuery(QueryKeys.TODO, () => TodoApi.getTodos());
};

export const useGetTodoById = ({ id }: GetTodoParams) => {
  return useQuery(QueryKeys.TODO, () => TodoApi.getTodoById({ id }));
};

export const useCreateTodo = ({ title, content }: CreateTodoParams) => {
  return useMutation(QueryKeys.TODO, ({ title, content }: CreateTodoParams) => TodoApi.createTodo({ title, content }));
};

export const useUpdateTodo = ({ id, title, content }: UpdateTodoParams) => {
  return useMutation([QueryKeys.TODO, id], ({ id, title, content }: UpdateTodoParams) =>
    TodoApi.updateTodo({ id, title, content })
  );
};

export const useDeleteTodo = ({ id }: DeleteTodoParams) => {
  return useMutation([QueryKeys.TODO, id], ({ id }: DeleteTodoParams) => TodoApi.deleteTodo({ id }));
};
