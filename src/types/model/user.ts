import { ResponseType } from './response';

export interface User {
  userId?: number;
  username?: string;
  nickname?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  aditoryPower?: number;
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

export interface MyLikes extends ResponseType {
  data: { likeCategoryList: number[] };
}

export interface UserResponse extends ResponseType {
  data: User;
}
