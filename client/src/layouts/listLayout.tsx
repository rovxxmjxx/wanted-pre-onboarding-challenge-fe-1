import React from 'react';

export default function ListLayout({ pageTitle, children }: { pageTitle: string; children: React.ReactNode }) {
  return (
    <div className="list-layout">
      <div className="list-layout__inner">
        <h1 className="page-title">{pageTitle}</h1>
        {children}
      </div>
    </div>
  );
}
