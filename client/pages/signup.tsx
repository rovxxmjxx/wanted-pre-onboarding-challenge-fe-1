import React, { useEffect } from 'react';
import { useSession } from '../contexts/SessionContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginParams, LoginResponse } from '../lib/apis/AuthApi';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import Input from '../components/Login/Input';
import { useRouter } from 'next/router';
import { useSignUpMutation } from '../components/hooks/auth/AuthQuery';
import Link from 'next/link';

type FormType = LoginParams;

export default function Login() {
  const router = useRouter();
  const { isLoggedIn, login } = useSession();

  const schema = yup.object({
    email: yup
      .string()
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
      .required('email is required'),
    password: yup
      .string()
      .matches(/^[A-Za-z0-9._%+-]{8,}$/)
      .required('password is required'),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const signUpMutation = useSignUpMutation();

  const onSubmit = ({ email, password }: FormType) => {
    signUpMutation.mutateAsync(
      { email, password },
      {
        onSuccess: (data: LoginResponse) => {
          console.log(data);
          if (!data.token) {
            setError('email', {
              type: 'submitError',
              message: 'Invalid email. Already taken. :(',
            });
          } else {
            const { token } = data;
            login({ email, password, token });
            router.push('/');
          }
        },
      }
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Signup</h1>
      <p>
        <Link href="/login">login</Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label={'email'} icon={AiOutlineUser} name={'email'} control={control} />
        <Input type="password" label={'password'} icon={AiOutlineLock} name={'password'} control={control} />
        <button type="submit">Signup</button>
        {errors.email?.type === 'submitError' && errors.email?.message && <p>{errors.email?.message}</p>}
      </form>
    </div>
  );
}
