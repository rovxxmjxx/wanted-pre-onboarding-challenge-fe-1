import React, { useEffect, useState } from 'react';
import { useSession } from '../contexts/SessionContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import AddTodoFormModal from '../components/Todo/AddTodoFormModal';

export default function Home() {
  const router = useRouter();
  const { session, isLoggedIn, logout } = useSession();
  const [showAddTodoFormModal, setShowTodoFormModal] = useState(false);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  return (
    <>
      <header style={styles.header}>
        <Link href="/">로고</Link>
        <button onClick={logout}>로그아웃</button>
      </header>
      <Layout>
        <Container>
          <ListSection>
            <ToolBar>
              <h2 className="toolbar__name">목록</h2>
              <ul className="toolbar__items">
                <li>설정</li>
                <li onClick={() => setShowTodoFormModal(true)}>추가하기</li>
              </ul>
            </ToolBar>
            <div>
              {session.todos.length <= 0 && <EmptyMessage>아직 작성된 투두가 없어요!</EmptyMessage>}
              {session.todos && (
                <ul>
                  {session.todos.map((todo, i) => (
                    <li key={todo.id} onClick={() => setIndex(i)}>
                      {todo.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ListSection>
          <DetailSection>
            <h2>{session.todos[index]?.title}</h2>
            <div>{session.todos[index]?.content}</div>
          </DetailSection>
        </Container>
      </Layout>
      <AddTodoFormModal show={showAddTodoFormModal} onClose={() => setShowTodoFormModal(false)} />
    </>
  );
}

const styles = {
  header: {
    padding: '0 30px',
    height: '60px',
    borderBottom: '1px solid #dfdfdf',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sections: {
    width: '100%',
    height: '100%',
    display: 'flex',
    border: '1px solid #dfdfdf',
    borderRadius: '8px',
  },
};

const Layout = styled.main`
  max-width: 1100px;
  height: 700px;
  overflow: hidden;
  padding: 0 20px;
  margin: auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #dfdfdf;
  borderradius: 8px;
`;

const ListSection = styled.section`
  position: relative;
  flex: 0.7;
  height: 100%;
`;
const DetailSection = styled.section`
  flex: 1.3;
  height: 100%;
  border-left: 1px solid #dfdfdf;
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid #dfdfdf;

  > .toolbar__name {
    font-size: 20px;
  }

  > .toolbar__items {
    display: flex;

    > li {
      margin-left: 5px;
      font-size: 14px;
      cursor: pointer;
    }

    > li:hover {
      font-weight: 700;
      transition: 0.2s ease;
    }
  }
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  color: gray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
