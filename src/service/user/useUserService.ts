import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/user/queries';

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
  return useMutation(queryOptions.signIn({ username, password }));
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

export function useGetProfileIamge({ accessToken }: { accessToken: string }) {
  return useQuery(queryOptions.getProfileImage({ accessToken }));
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
