export interface Response {
  httpStatus: string;
  message: string;
  success: boolean;
}

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

export interface LinkResponse extends Response {
  data: Link;
}

export interface LinkReminder extends Response {
  data: { linkList: Link[] };
}
