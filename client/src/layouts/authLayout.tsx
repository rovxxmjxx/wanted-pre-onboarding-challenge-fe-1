import React from 'react';

export default function Layout({
  pageTitle,
  children,
}: {
  pageTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__inner">
        <h1>{pageTitle}</h1>
        {children}
      </div>
    </div>
  );
}
