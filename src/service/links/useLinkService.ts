import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import queryOptions from '@/service/links/queries';
import { Link, LinkResponse } from '@/types/model/link';
import { useToast } from '@/components/ui/use-toast';

export function useLink({
  accessToken,
  linkId,
  selectFn,
}: {
  accessToken: string;
  linkId: number;
  selectFn?: (data: any) => any;
}) {
  return useQuery({
    ...queryOptions.link({ accessToken, linkId }),
    select: (data) => {
      selectFn && selectFn(data);
      return data;
    },
    staleTime: Infinity,
  });
}

export function useLinkReminder({ accessToken }: { accessToken: string }) {
  return useQuery({ ...queryOptions.linkReminder({ accessToken }) });
}

export function usePostLink({
  accessToken,
  autoComplete,
  title,
  summary,
  url,
  categoryId,
  additionalFn,
}: {
  accessToken: string;
  autoComplete: boolean;
  title: string;
  summary: string;
  url: string;
  categoryId: number;
  additionalFn?: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.newLink({
      accessToken,
      autoComplete,
      title,
      summary,
      url,
      categoryId,
    }),
    onSettled: (data, error) => {
      if (data) {
        toast({
          title: 'successfully created link',
        });
      } else if (error) {
        toast({
          title: 'failed to create link',
          variant: 'destructive',
        });
      }

      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['myCategory'] }),
        queryClient.invalidateQueries({
          queryKey: ['reminder'],
        }),
      ]);
      return data;
    },
    onSuccess: () => additionalFn && additionalFn(),
  });
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
