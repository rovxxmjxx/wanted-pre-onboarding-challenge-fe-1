import fetcher from './fetcher';

export type UserType = {
  email: string;
  password: string;
};
export type LoginParams = UserType;
export type SignUpParams = UserType;
export type CommonResponse = {
  message: string;
  token: string;
};
export type LoginResponse = CommonResponse;
export type SignUpResponse = CommonResponse;

class AuthApi {
  // 로그인
  public async login({ email, password }: LoginParams): Promise<LoginResponse> {
    return await fetcher({ method: 'POST', path: '/users/login', body: { email, password } });
  }

  // 회원가입
  public async signUp({ email, password }: SignUpParams): Promise<SignUpResponse> {
    return await fetcher({ method: 'POST', path: '/users/create', body: { email, password } });
  }
}

export default new AuthApi();
