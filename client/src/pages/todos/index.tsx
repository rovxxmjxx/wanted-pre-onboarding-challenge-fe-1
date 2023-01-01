import React, { useEffect } from 'react';
import { executeToken } from '../login';
import { useNavigate } from 'react-router-dom';

export default function TodoList() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = executeToken();

    if (!token) {
      navigate('/login');
    }
  }, []);
  return <div>TodoList</div>;
}
