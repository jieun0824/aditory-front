import Service from '@/service/service';
import { User } from '@/model/user';

class UserService extends Service {
  getUsers() {
    return this.http.get<User>(`/users`);
  }
  postSignIn({ username, password }: { username: string; password: string }) {
    return this.http.post<User>(`/users/login`, {
      username,
      password,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
