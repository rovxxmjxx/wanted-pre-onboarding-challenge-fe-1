import Token from '../Token';
import { BASE_URL } from '../constants/fetcher';
import { TOKEN_KEY } from '../constants/token';

export interface AnyOBJ {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  let url = `${BASE_URL}${path}`;

  const token = Token.getToken(TOKEN_KEY);

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL,
      Authorization: token || '',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += '?' + searchParams.toString();
  }

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default fetcher;
