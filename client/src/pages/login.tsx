import React, { SyntheticEvent, useEffect } from 'react';

import AuthLayout from '../layouts/authLayout';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import { useMutation } from 'react-query';
import { QUERYKEYS, fetcher } from '../queryClient';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../utils/useInput';

export type ErrorType = {
  [key: string]: { isError: boolean; message?: string } | null;
};

export const executeToken = (() => {
  let token = localStorage.getItem('token');

  return (newToken?: string) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      token = localStorage.getItem('token');
    }

    return token;
  };
})();

export const clearToken = () => {
  localStorage.removeItem('token');
};

export default function Login() {
  const {
    ref: emailRef,
    error: emailError,
    onChange: onEmailChange,
    onError: onEmailError,
  } = useInput({
    name: 'email',
    value: '',
    error: {
      regex: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      isError: false,
      message: '이메일 형식에 맞는지 확인해주세요.',
    },
  });
  const {
    ref: passwordRef,
    error: passwordError,
    onChange: onPasswordChange,
    onError: onPasswordError,
  } = useInput({
    name: 'password',
    value: '',
    error: {
      regex: /^[A-Za-z0-9._%+-]{8,}$/,
      isError: false,
      message: '8글자 이상인지 확인해주세요',
    },
  });

  const { mutate: loginMutate } = useMutation(QUERYKEYS.AUTH, (body: { email: string; password: string }) =>
    fetcher({ method: 'POST', path: '/users/login', body })
  );
  const navigate = useNavigate();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!email || !password) return;

    loginMutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.token) {
            executeToken(data.token);
            navigate('/', { replace: true });
          } else {
            onEmailError(true, '이메일 주소 혹은 비밀번호를 다시 확인해주세요');
            onPasswordError(true);
          }
        },
      }
    );
  };

  const isSubmitAvailable =
    emailRef?.current?.value.length !== 0 &&
    passwordRef?.current?.value.length !== 0 &&
    !emailError?.isError &&
    !passwordError?.isError;

  useEffect(() => {
    emailRef?.current?.focus();

    const token = executeToken();

    if (token) navigate('/', { replace: true });
    else {
      navigate('/login');
    }
  }, []);

  return (
    <AuthLayout pageTitle="로그인">
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label={'이메일'}
            name={'email'}
            ref={emailRef}
            onChange={onEmailChange}
            error={emailError}
            placeholder={'example@gmail.com'}
          />
          <Input
            type="password"
            label={'패스워드'}
            name={'password'}
            placeholder={'8글자 이상'}
            ref={passwordRef}
            onChange={onPasswordChange}
            error={passwordError}
          />
          <Button title={'로그인'} disabled={!isSubmitAvailable} />
          {emailError.message && <p className="error-message">{emailError.message}</p>}
        </form>
      </div>
      <p className="opposite-link">
        <Link to="/signup">회원가입하러 가기</Link>
      </p>
    </AuthLayout>
  );
}
