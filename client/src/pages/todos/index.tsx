import React, { useEffect } from 'react';
import { executeToken } from '../../utils/executeToken';
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../layouts/listLayout';
import TodoList from '../../components/todos/list';
import NewTodoInput from '../../components/todos/newTodo';

export default function TodoListPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = executeToken();

    if (!token) {
      navigate('/login');
    }
  }, []);
  return (
    <ListLayout pageTitle="TODO LIST">
      <NewTodoInput />
      <TodoList todos={[{ id: '1', content: 'test' }]} />
    </ListLayout>
  );
}
