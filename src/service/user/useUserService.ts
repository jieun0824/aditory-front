import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/user/queries';
import { useStorage } from '@/lib/useStorage';
import { useRouter } from 'next/navigation';

export function useUsers({ accessToken }: { accessToken: string }) {
  return useQuery(queryOptions.all({ accessToken }));
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
      const accessTokenExpires = Date.now() + 10 * 60 * 1000;
      const refreshTokenExpires = Date.now() + 6 * 60 * 60 * 1000;

      addUserInfo({
        ...userInfo.data,
        accessTokenExpires: accessTokenExpires,
        refreshTokenExpires: refreshTokenExpires,
      });
      router.push('/');
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

export function useGetProfileImage({ accessToken }: { accessToken: string }) {
  const { userInfo, addUserInfo } = useStorage();
  return useQuery({
    ...queryOptions.getProfileImage({ accessToken }),
    // select: (data) => {
    //   addUserInfo({
    //     ...userInfo,
    //     profileImageUrl: data.data.s3DownloadResult.url,
    //   });
    //   return data;
    // },
  });
}

export function usePostProfileImage({
  accessToken,
  profileImage,
}: {
  accessToken: string;
  profileImage: string;
}) {
  return useMutation(
    queryOptions.postProfileImage({ accessToken, profileImage })
  );
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
  return useMutation({
    ...queryOptions.updateUser({
      accessToken,
      nickname,
      contact,
    }),
    // onSettled: () => {
    //   usePostProfileImage({
    //     accessToken,
    //     profileImage,
    //   });
    // },
  });
}
