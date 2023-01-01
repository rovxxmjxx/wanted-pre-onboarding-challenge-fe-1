import React from 'react';

export type Todo = {
  id: string;
  content: string;
};

export default function TodoItem({ item }: { item: Todo }) {
  return <li>{item.content}</li>;
}
