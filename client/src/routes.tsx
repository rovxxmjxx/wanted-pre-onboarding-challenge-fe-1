import React from 'react';
import GlobalLayout from './pages/_layout';

import Index from './pages/index';
import Login from './pages/login';
import SignUp from './pages/signup';
import TodoList from './pages/todos';
import TodoItem from './pages/todos/[id]';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/login', element: <Login />, index: true },
      { path: '/signup', element: <SignUp />, index: true },
      { path: '/todos', element: <TodoList />, index: true },
      { path: '/todos/:id', element: <TodoItem /> },
    ],
  },
];

export const pages = [
  { route: '/' },
  { route: '/login' },
  { route: '/signup' },
  { route: '/todos' },
  { route: '/todos/:id' },
];
