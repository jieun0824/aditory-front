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
