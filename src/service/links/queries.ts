import { Link } from '@/model/link';
import LinkService from '@/service/links/linkService';

//create unique key
const queryKeys = {
  //get method
  link: ({ accessToken, linkId }: { accessToken: string; linkId: number }) => {
    return ['link', accessToken, linkId] as const;
  },
  reminder: ({ accessToken }: { accessToken: string }) =>
    ['reminder', accessToken] as const,

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

const queryOptions = {
  //get method
  link: ({ accessToken, linkId }: { accessToken: string; linkId: number }) => ({
    queryKey: queryKeys.link({ accessToken, linkId }),
    queryFn: () => LinkService.getLink({ accessToken, linkId }),
    onError: errorHandler,
  }),
  linkReminder: ({ accessToken }: { accessToken: string }) => ({
    queryKey: queryKeys.reminder({ accessToken }),
    queryFn: () => LinkService.getLinkReminder({ accessToken }),
    onError: errorHandler,
    enabled: !!accessToken,
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
    queryFn: () =>
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
    queryFn: () =>
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
  }: {
    accessToken: string;
    linkId: number;
  }) => ({
    queryKey: queryKeys.deleteLink({ linkId }),
    queryFn: () => LinkService.deleteLink({ accessToken, linkId }),
    onError: errorHandler,
  }),
};

export default queryOptions;
