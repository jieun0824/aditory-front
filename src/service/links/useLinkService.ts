import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import queryOptions from '@/service/links/queries';

export function useLink({
  accessToken,
  linkId,
  selectFn,
}: {
  accessToken: string;
  linkId: number;
  selectFn: (data: any) => any;
}) {
  return useQuery({
    ...queryOptions.link({ accessToken, linkId }),
    select: (data) => selectFn(data),
  });
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
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.updateLink({
      accessToken,
      title,
      summary,
      url,
      categoryId,
      linkId,
    }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['specificCategory', categoryId],
        }),
        queryClient.invalidateQueries({ queryKey: ['link', linkId] }),
      ]),
  });
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
  categoryId,
}: {
  accessToken: string;
  linkId: number;
  categoryId: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.deleteLink({ accessToken, linkId, categoryId }),
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['myCategory'] }),
        queryClient.invalidateQueries({
          queryKey: ['specificCategory', categoryId],
        }),
      ]),
  });
}
