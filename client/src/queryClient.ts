import { QueryClient } from 'react-query';

type AnyOBJ = {
  [key: string]: any;
};

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });

    return client;
  };
})();

const BASE_URL = 'http://localhost:8080';

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  let url = `${BASE_URL}${path}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL,
    },
  };

  if (params) {
    const seachParams = new URLSearchParams(params);
    url += '?' + seachParams.toString();
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);
    const json = await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const QUERYKEYS = {
  AUTH: 'AUTH',
  TODOS: 'TODOS',
};
