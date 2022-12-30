import React, { useRef, SyntheticEvent, useState } from 'react';

import AuthLayout from '../layouts/authLayout';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import { useMutation } from 'react-query';
import { QUERYKEYS, fetcher } from '../queryClient';
import { Link, useNavigate } from 'react-router-dom';

export type ErrorType = {
  [key: string]: { isError: boolean; message?: string } | null;
};

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<ErrorType>({
    email: null,
    password: null,
    submit: null,
  });

  const { mutate: loginMutate } = useMutation(
    QUERYKEYS.AUTH,
    (body: { email: string; password: string }) =>
      fetcher({ method: 'POST', path: '/users/login', body })
  );
  const navigate = useNavigate();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    loginMutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.token) {
            navigate('/', { replace: true });
          } else {
            setError({
              submit: {
                isError: true,
                message: '이메일 주소 혹은 비밀번호를 다시 확인해주세요',
              },
            });
          }
        },
      }
    );
  };

  const isSubmitAvailable = Object.entries(error)
    .filter(([key, value]) => key !== 'submit')
    .every(([key, value]) => value !== null && value?.isError === false);

  return (
    <AuthLayout pageTitle="로그인">
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label={'이메일'}
            name={'email'}
            ref={emailRef}
            placeholder={'example@gmail.com'}
            validate={{
              regex: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              error,
              setError,
            }}
          />
          <Input
            type="password"
            label={'패스워드'}
            name={'password'}
            placeholder={'8글자 이상'}
            ref={passwordRef}
            validate={{
              regex: /^[A-Za-z0-9._%+-]{8,}$/,
              error,
              setError,
            }}
          />
          <Button title={'로그인'} disabled={!isSubmitAvailable} />
          {error.submit && (
            <p className="error-message">{error['submit'].message}</p>
          )}
        </form>
      </div>
      <p className="opposite-link">
        <Link to="/signup">회원가입으로 이동하기</Link>
      </p>
    </AuthLayout>
  );
}
