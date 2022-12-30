import React from 'react';

import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { getClient } from './queryClient';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const client = getClient();

  const element = useRoutes(routes);
  return (
    <QueryClientProvider client={client}>
      <div className="App">{element}</div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
