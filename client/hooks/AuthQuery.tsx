import { useMutation } from 'react-query';
import AuthApi, { LoginParams, SignUpParams } from '../lib/apis/AuthApi';
import { QueryKeys } from '../lib/constants/fetcher';

export const useLoginMutation = () => {
  return useMutation(QueryKeys.AUTH, ({ email, password }: LoginParams) => AuthApi.login({ email, password }));
};

export const useSignUpMutation = () => {
  return useMutation(QueryKeys.AUTH, ({ email, password }: SignUpParams) => AuthApi.signUp({ email, password }));
};
