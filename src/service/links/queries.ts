import { Link } from '@/types/model/link';
import LinkService from '@/service/links/linkService';
import { Suspense } from 'react';

//create unique key
const queryKeys = {
  //get method
  link: ({ linkId }: { linkId: number }) => {
    return ['link', linkId] as const;
  },
  reminder: ['reminder'] as const,

  //post method
  newLink: ['newLink'] as const,
  updateLink: ({ linkId }: { linkId: number }) => {
    return ['updateLink', linkId] as const;
  },
  updateStatus: ({ linkId }: { linkId: number }) => {
    return ['updateStatus', linkId] as const;
  },
  //delete method
  deleteLink: ({ linkId }: { linkId: number }) => {
    return ['deleteLink', linkId] as const;
  },
};

const errorHandler = (error: any) => {
  if (error.status === 401) {
    window.location.href = '/login';
  } else {
    alert('something went wrong');
  }
  console.error(error);
};

const LinkQueryOptions = {
  //get method
  link: ({ accessToken, linkId }: { accessToken: string; linkId: number }) => ({
    queryKey: queryKeys.link({ linkId }),
    queryFn: () => LinkService.getLink({ accessToken, linkId }),
    enabled: !!accessToken,
  }),
  linkReminder: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.reminder,
    queryFn: () => LinkService.getLinkReminder({ accessToken }),
    onError: errorHandler,
    enabled: !!accessToken,
    retry: false,
  }),
  //post method
  newLink: ({
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
  }) => ({
    queryKey: queryKeys.newLink,
    mutationFn: () =>
      LinkService.postLink({
        accessToken,
        autoComplete,
        title,
        summary,
        url,
        categoryId,
      }),
    onError: errorHandler,
  }),
  updateLink: ({
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
  }) => ({
    queryKey: queryKeys.updateLink({ linkId }),
    mutationFn: () =>
      LinkService.updateLink({
        accessToken,
        title,
        summary,
        url,
        categoryId,
        linkId,
      }),
    onError: errorHandler,
  }),
  updateStatus: ({
    accessToken,
    linkId,
  }: {
    accessToken: string;
    linkId: number;
  }) => ({
    queryKey: queryKeys.updateStatus({ linkId }),
    queryFn: () => LinkService.updateLinkStatus({ accessToken, linkId }),
    onError: errorHandler,
  }),
  //delete method
  deleteLink: ({
    accessToken,
    linkId,
    categoryId,
  }: {
    accessToken: string;
    linkId: number;
    categoryId: number;
  }) => ({
    queryKey: queryKeys.deleteLink({ linkId }),
    mutationFn: () =>
      LinkService.deleteLink({ accessToken, linkId, categoryId }),
    onError: errorHandler,
  }),
};

export default LinkQueryOptions;
