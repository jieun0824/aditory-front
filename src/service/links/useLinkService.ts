import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/links/queries';

export function useLink({
  accessToken,
  linkId,
}: {
  accessToken: string;
  linkId: number;
}) {
  return useQuery(queryOptions.link({ accessToken, linkId }));
}

export function useLinkReminder({ accessToken }: { accessToken: string }) {
  return useQuery(queryOptions.linkReminder({ accessToken }));
}

export function usePostLink({
  accessToken,
  autoComplete,
  title,
  summary,
  url,
  categoryId,
}: {
  accessToken: string;
  autoComplete: boolean;
  title: string;
  summary: string;
  url: string;
  categoryId: number;
}) {
  return useMutation(
    queryOptions.newLink({
      accessToken,
      autoComplete,
      title,
      summary,
      url,
      categoryId,
    })
  );
}

export function useUpdateLink({
  accessToken,
  title,
  summary,
  url,
  categoryId,
  linkId,
}: {
  accessToken: string;
  title: string;
  summary: string;
  url: string;
  categoryId: number;
  linkId: number;
}) {
  return useMutation(
    queryOptions.updateLink({
      accessToken,
      title,
      summary,
      url,
      categoryId,
      linkId,
    })
  );
}

export function useUpdateStatus({
  accessToken,
  linkId,
}: {
  accessToken: string;
  linkId: number;
}) {
  return useMutation(queryOptions.updateStatus({ accessToken, linkId }));
}

export function useDeleteLink({
  accessToken,
  linkId,
}: {
  accessToken: string;
  linkId: number;
}) {
  return useMutation(queryOptions.deleteLink({ accessToken, linkId }));
}
