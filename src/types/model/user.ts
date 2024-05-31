import { ResponseType } from './response';

export interface User {
  userId?: number;
  username?: string;
  nickname?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Login {
  httpStatus: string;
  message: string;
  success: boolean;
  data: User;
}

export interface Refresh {
  refreshToken: string;
}

export interface profileImage {
  userId: number;
  username: string;
  nickname: string;
  s3DownloadResult: {
    profileImageId: number;
    originalName: string;
    url: string;
  };
}

export interface profileImageResponse extends ResponseType {
  data: profileImage;
}
