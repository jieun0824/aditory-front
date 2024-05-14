import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/user/queries';

export function useUsers() {
  return useQuery(queryOptions.all());
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

export function useRefresh({ refreshToken }: { refreshToken: string }) {
  return useMutation(queryOptions.refresh({ refreshToken }));
}
