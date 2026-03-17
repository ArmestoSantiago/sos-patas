export interface User {
  id: string;
  name: string;
  photoURL: string;
}

export interface UserState {
  userInfo: User | null,
  userLogged: boolean;
  setUser: (user: User) => void;
  userLogOut: () => void;
}