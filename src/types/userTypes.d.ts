export interface User {
  id: string;
  name: string;
  photo: string;
}

export interface UserState {
  userInfo: User | null,
  userLogged: boolean;
  userLogIn: (user: User) => void;
}