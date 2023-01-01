import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/todos', { replace: true });
  }, []);

  return <div>메인 홈입니다.</div>;
}
