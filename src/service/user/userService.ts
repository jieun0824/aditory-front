import Service from '@/service/service';
import { Login, Refresh, User } from '@/model/user';

let authorization = { headers: {} };
if (typeof window !== 'undefined') {
  if (localStorage.getItem('userInfo')) {
    const accessToken = JSON.parse(
      localStorage.getItem('userInfo')!
    ).accessToken;
    authorization = { headers: { Authorization: `Bearer ${accessToken}` } };
  }
}

class UserService extends Service {
  getUsers() {
    return this.http.get<User>(`/users`, authorization);
  }
  postSignIn({ username, password }: { username: string; password: string }) {
    return this.http.post<Login>(`/users/login`, {
      username,
      password,
    });
  }
  refreshAccess({ refreshToken }: { refreshToken: string }) {
    return this.http.post<Refresh>('/users/refresh', {
      refreshToken,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
