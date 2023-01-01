import React from 'react';
import { Todo } from '../../redux/todo';

export default function TodoItem({ item }: { item: Todo }) {
  return (
    <li className="todo-item">
      <p>{item.title}</p>
      <p>{item.content}</p>
    </li>
  );
}
