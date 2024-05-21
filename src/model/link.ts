export interface Link {
  linkId: number;
  title: string;
  summary: number;
  LinkState: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
  url: string;
}

export interface LinkResponse {
  httpStatus: string;
  message: string;
  success: boolean;
  data: Link;
}
