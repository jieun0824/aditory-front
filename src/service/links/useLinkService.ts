import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@/service/links/queries';

export function useLink({ linkId }: { linkId: number }) {
  return useQuery(queryOptions.link({ linkId }));
}

export function useLinkReminder() {
  return useQuery(queryOptions.linkReminder());
}

export function usePostLink({
  autoComplete,
  title,
  summary,
  url,
  categoryId,
}: {
  autoComplete: boolean;
  title: string;
  summary: string;
  url: string;
  categoryId: number;
}) {
  return useMutation(
    queryOptions.newLink({ autoComplete, title, summary, url, categoryId })
  );
}

export function useUpdateLink({
  title,
  summary,
  url,
  categoryId,
  linkId,
}: {
  title: string;
  summary: string;
  url: string;
  categoryId: number;
  linkId: number;
}) {
  return useMutation(
    queryOptions.updateLink({ title, summary, url, categoryId, linkId })
  );
}

export function useUpdateStatus({ linkId }: { linkId: number }) {
  return useMutation(queryOptions.updateStatus({ linkId }));
}

export function useDeleteLink({ linkId }: { linkId: number }) {
  return useMutation(queryOptions.deleteLink({ linkId }));
}
