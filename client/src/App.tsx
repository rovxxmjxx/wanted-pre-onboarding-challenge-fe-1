import React from 'react';

import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { getClient } from './queryClient';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getStore } from './redux/index';
import { Provider } from 'react-redux';

function App() {
  const client = getClient();
  const store = getStore();
  const element = useRoutes(routes);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <div className="App">{element}</div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
