interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  roles: string[];
  permissions: string[];
}

interface User {
  id: number;
  name: string;
  age: number;
  address: string;
}

interface UserState {
  token: string | null;
  userInfo: UserInfo | null;
}
