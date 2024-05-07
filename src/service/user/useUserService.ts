import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/user/queries';
import { Variable } from 'lucide-react';

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
