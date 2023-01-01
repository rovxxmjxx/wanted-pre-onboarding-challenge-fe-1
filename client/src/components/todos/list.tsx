import React, { useEffect } from 'react';
import TodoItem from './item';
import { useDispatch } from 'react-redux';
import { updateTodos, Todo } from '../../redux/todo';

export default function TodoList({ todos }: { todos: Todo[] }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTodos(todos));
  }, [todos]);

  return (
    <ul className="todos">
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </ul>
  );
}
