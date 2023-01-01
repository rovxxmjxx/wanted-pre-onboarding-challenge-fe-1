import React, { useEffect } from 'react';
import { executeToken } from '../utils/executeToken';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';

export default function ListLayout({ pageTitle, children }: { pageTitle: string; children: React.ReactNode }) {
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="list-layout">
      <div className="list-layout__inner">
        <h1 className="page-title">{pageTitle}</h1>
        <div className="list-layout__inner__flipped">{children}</div>
      </div>
    </div>
  );
}
