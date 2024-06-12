import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import queryOptions from '@/service/user/queries';
import { useStorage } from '@/lib/useStorage';
import { useRouter } from 'next/navigation';
import { UserResponse } from '@/types/model/user';

export function useUsers({
  accessToken,
  selectFn,
}: {
  accessToken: string;
  selectFn?: (data: any) => any;
}) {
  return useQuery({
    ...queryOptions.getUser({ accessToken }),
    select: (data: UserResponse) => {
      if (selectFn) {
        return selectFn(data);
      } else {
        return data;
      }
    },
  });
}

export function useSignIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const { addUserInfo } = useStorage();

  const router = useRouter();
  return useMutation({
    ...queryOptions.signIn({ username, password }),
    onSuccess: async (userInfo: any) => {
      const { queryFn } = queryOptions.getProfileImage({
        accessToken: userInfo.data.accessToken,
      });
      await queryFn().then((data) => {
        addUserInfo({
          ...userInfo.data,
          profileImageUrl: data.data.s3DownloadResult.url,
        });
      });

      router.push('/');
      return userInfo;
    },
  });
}

export function useRefresh({
  userId,
  refreshToken,
}: {
  userId: number;
  refreshToken: string;
}) {
  return useMutation(queryOptions.refresh({ userId, refreshToken }));
}

export function useGetProfileImage({
  accessToken,
  selectFn,
}: {
  accessToken: string;
  selectFn?: (data: any) => any;
}) {
  const { userInfo, addUserInfo } = useStorage();
  return useQuery({
    ...queryOptions.getProfileImage({ accessToken }),
    select: (data) => {
      // addUserInfo({
      //   ...userInfo,
      //   profileImageUrl: data.data.s3DownloadResult.url,
      // });
      selectFn && selectFn(data);
      return data;
    },
  });
}

export function usePostProfileImage({
  accessToken,
  profileImage,
}: {
  accessToken: string;
  profileImage: string;
}) {
  const { userInfo, addUserInfo } = useStorage();
  return useMutation({
    ...queryOptions.postProfileImage({ accessToken, profileImage }),
    onSuccess: async (data: any) => {
      addUserInfo({
        ...userInfo,
        profileImageUrl: data.data.s3DownloadResult.url,
      });
      return data;
    },
  });
}

export function usePatchUserInfo({
  accessToken,
  nickname,
  contact,
  profileImage,
}: {
  accessToken: string;
  nickname: string;
  contact: string;
  profileImage?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.updateUser({
      accessToken,
      nickname,
      contact,
    }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['getProfileImage'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      return data;
    },
  });
}

export function useMyLikes({ accessToken }: { accessToken: string }) {
  return useQuery(queryOptions.getLike({ accessToken }));
}
