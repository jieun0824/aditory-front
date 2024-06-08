import UserService from '@/service/user/userService';
import { MyLikes } from '@/types/model/user';

const queryKeys = {
  getUser: ['user'] as const,
  signIn: ({ username, password }: { username: string; password: string }) =>
    ['user', 'signIn'] as const,
  refresh: ({
    userId,
    refreshToken,
  }: {
    userId: number;
    refreshToken: string;
  }) => [userId, refreshToken] as const,
  updateUser: ['updateUser'] as const,
  getProfileImage: ['getProfileImage'] as const,
  postProfileImage: ['postProfileImage'] as const,
  getLike: ['getLike'] as const,
};

const UserQueryOptions = {
  getUser: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.getUser,
    queryFn: async () => await UserService.getUsers({ accessToken }),
    enabled: !!accessToken,
  }),
  signIn: ({ username, password }: { username: string; password: string }) => ({
    queryKey: queryKeys.signIn({ username, password }),
    mutationFn: async () =>
      await UserService.postSignIn({ username, password }),
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
  refresh: ({
    userId,
    refreshToken,
  }: {
    userId: number;
    refreshToken: string;
  }) => ({
    queryKey: queryKeys.refresh({ userId, refreshToken }),
    queryFn: () => UserService.refreshAccess({ userId, refreshToken }),
    onError: (error: Error) => {
      alert('refresh token expired');
      console.error(error);
    },
  }),
  getProfileImage: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.getProfileImage,
    queryFn: async () => await UserService.getProfileImage({ accessToken }),
  }),
  postProfileImage: ({
    accessToken,
    profileImage,
  }: {
    accessToken: string;
    profileImage: string;
  }) => ({
    queryKey: queryKeys.postProfileImage,
    mutationFn: async () =>
      await UserService.postProfileImage({ accessToken, profileImage }),
  }),
  updateUser: ({
    accessToken,
    nickname,
    contact,
  }: {
    accessToken: string;
    nickname: string;
    contact: string;
  }) => ({
    queryKey: queryKeys.updateUser,
    mutationFn: async () =>
      await UserService.updateUser({ accessToken, nickname, contact }),
  }),
  getLike: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.getLike,
    queryFn: async () => await UserService.getLike({ accessToken }),
    enabled: !!accessToken,
    select: (data: any) => {
      return data.data.likeCategoryList as number[];
    },
  }),
};

export default UserQueryOptions;
