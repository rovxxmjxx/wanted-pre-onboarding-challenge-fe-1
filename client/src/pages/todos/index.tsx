import React, { useEffect } from 'react';
import { executeToken } from '../../utils/executeToken';
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../layouts/listLayout';
import NewTodoInput from '../../components/todos/newTodo';
import { useQuery } from 'react-query';
import { QUERYKEYS, fetcher } from '../../queryClient';
import TodoList from '../../components/todos/list';

export default function TodoListPage() {
  const navigate = useNavigate();
  const token = executeToken();

  const { data, isLoading } = useQuery(QUERYKEYS.TODOS, () =>
    fetcher({ method: 'GET', path: '/todos', token: token || '' })
  );

  if (isLoading) return <div>로딩중...</div>;
  return (
    <ListLayout pageTitle="TODO LIST">
      <TodoList todos={data.data} />
      <NewTodoInput />
    </ListLayout>
  );
}
