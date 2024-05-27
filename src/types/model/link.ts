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
}

export interface LinkResponse extends ResponseType {
  data: Link;
}

export interface LinkReminder extends ResponseType {
  data: { linkList: Link[] };
}
