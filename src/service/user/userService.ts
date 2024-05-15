import Service from '@/service/service';
import { Login, Refresh, User } from '@/model/user';

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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
