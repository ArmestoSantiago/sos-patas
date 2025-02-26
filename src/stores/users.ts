import { create } from 'zustand';
import { User, UserState } from '@/types/usersTypes.d';

export const useUserStore = create<UserState>((set) => {
  return {
    userInfo: null,
    userLogged: false,
    userLogIn: (user: User) => { set({ userInfo: user, userLogged: true }); },
    userLogOut: () => { set({ userInfo: null, userLogged: false }); }
  };
}); 