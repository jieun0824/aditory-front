import { Link } from '@/model/link';
import LinkService from '@/service/links/linkService';

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

const queryOptions = {
  //get method
  link: ({ linkId }: { linkId: number }) => ({
    queryKey: queryKeys.link({ linkId }),
    queryFn: () => LinkService.getLink({ linkId }),
    onError: errorHandler,
  }),
  linkReminder: () => ({
    queryKey: queryKeys.reminder,
    queryFn: () => LinkService.getLinkReminder(),
    onError: errorHandler,
  }),
  //post method
  newLink: ({
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
  }) => ({
    queryKey: queryKeys.newLink,
    queryFn: () =>
      LinkService.postLink({ autoComplete, title, summary, url, categoryId }),
    onError: errorHandler,
  }),
  updateLink: ({
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
  }) => ({
    queryKey: queryKeys.updateLink({ linkId }),
    queryFn: () =>
      LinkService.updateLink({ title, summary, url, categoryId, linkId }),
    onError: errorHandler,
  }),
  updateStatus: ({ linkId }: { linkId: number }) => ({
    queryKey: queryKeys.updateStatus({ linkId }),
    queryFn: () => LinkService.updateLinkStatus({ linkId }),
    onError: errorHandler,
  }),
  //delete method
  deleteLink: ({ linkId }: { linkId: number }) => ({
    queryKey: queryKeys.deleteLink({ linkId }),
    queryFn: () => LinkService.deleteLink({ linkId }),
    onError: errorHandler,
  }),
};

export default queryOptions;
