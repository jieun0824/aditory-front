import Service from '@/service/service';
import { Login, Refresh, User, profileImageResponse } from '@/types/model/user';

class UserService extends Service {
  getUsers({ accessToken }: { accessToken: string }) {
    return this.http.get<User>(`/users`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  postSignIn({ username, password }: { username: string; password: string }) {
    return this.http.post<Login>(`/users/login`, {
      username,
      password,
    });
  }
  refreshAccess({
    userId,
    refreshToken,
  }: {
    userId: number;
    refreshToken: string;
  }) {
    return this.http.post<Refresh>('/users/refresh', {
      userId,
      refreshToken,
    });
  }

  updateUser({
    accessToken,
    nickname,
    contact,
  }: {
    accessToken: string;
    nickname: string;
    contact: string;
  }) {
    return this.http.patch<User>(
      `/users`,
      {
        nickname,
        contact,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }

  //profile-image
  getProfileImage({ accessToken }: { accessToken: string }) {
    return this.http.get<profileImageResponse>(`/users/profile-image`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  postProfileImage({
    accessToken,
    profileImage,
  }: {
    accessToken: string;
    profileImage: string;
  }) {
    return this.http.post<profileImageResponse>(
      `/users/profile-image`,
      {
        profileImage,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
