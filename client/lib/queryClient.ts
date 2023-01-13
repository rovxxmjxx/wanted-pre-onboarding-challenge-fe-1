import { QueryClient } from 'react-query';

const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client) client = new QueryClient(); // {defaultOptions} 추가 설정 필요
    return client;
  };
})();

export default getClient;
