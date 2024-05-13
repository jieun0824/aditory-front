import UserService from '@/service/user/userService';
import { useStorage } from '@/store/useStorage';

const queryKeys = {
  all: ['user'] as const,
  signIn: ({ username, password }: { username: string; password: string }) =>
    ['user', 'signIn'] as const,
  refresh: ['refresh'] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => await UserService.getUsers(),
  }),
  signIn: ({ username, password }: { username: string; password: string }) => ({
    queryKey: queryKeys.signIn({ username, password }),
    queryFn: async () => await UserService.postSignIn({ username, password }),
    // onSuccess: async (data: any) => {
    //   //use persist middleware in zustand
    //   //cookieStore.set('accessToken', JSON.stringify(data.data.accessToken));
    //   //localStorage.setItem('userInfo', JSON.stringify(data.data));
    // },
    onError: (error: Error) => {
      alert('잘못된 아이디 혹은 비밀번호입니다.');
      console.error(error);
    },
  }),
  refresh: ({ refreshToken }: { refreshToken: string }) => ({
    queryKey: queryKeys.refresh,
    queryFn: () => UserService.refreshAccess({ refreshToken }),
  }),
};

export default queryOptions;
