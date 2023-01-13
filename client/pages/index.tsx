import React, { useEffect } from 'react';
import { useSession } from '../contexts/SessionContext';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { session, isLoggedIn, logout } = useSession();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  return (
    <div style={styles.layout}>
      {session.todos.length <= 0 && <p>Empty</p>}
      {session.todos.length > 0 && <p>dfdf</p>}
      <button onClick={logout}>logout</button>
    </div>
  );
}

const styles = {
  layout: {
    minWidth: '900px',
    margin: 'auto',
    padding: '0 20px',
  },
};
