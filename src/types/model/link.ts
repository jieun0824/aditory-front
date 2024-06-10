import { ResponseType } from './response';

export interface PatchedLink {
  title: string;
  summary: string;
  url: string;
  categoryId: number;
  linkId: number;
}

export interface Link {
  title: string;
  summary: string;
  url: string;
  linkId: number;
  LinkState: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
  categoryId: number;
  categoryName: string;
}

export interface LinkResponse extends ResponseType {
  data: Link;
}

export interface LinkListResponse extends ResponseType {
  data: { linkList: Link[] };
}

export interface InfiniteLinkResponse {
  pages: LinkResponse[];
  pagesParams: number[];
}
