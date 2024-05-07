import UserService from '@/service/user/userService';

const queryKeys = {
  all: ['user'] as const,
  signIn: ({ username, password }: { username: string; password: string }) =>
    ['user', 'signIn'] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => UserService.getUsers(),
  }),
  signIn: ({ username, password }: { username: string; password: string }) => ({
    queryKey: queryKeys.signIn({ username, password }),
    queryFn: () => UserService.postSignIn({ username, password }),
    onSuccess: async (data: any) => {
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
    },
    onError: (error: Error) => {
      alert('잘못된 아이디 혹은 비밀번호입니다.');
      console.error(error);
    },
  }),
};

export default queryOptions;
