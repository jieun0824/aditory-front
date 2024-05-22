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

export interface LinkResponse {
  httpStatus: string;
  message: string;
  success: boolean;
  data: Link;
}
