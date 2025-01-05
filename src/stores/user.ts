import { create } from 'zustand';
import { User, UserState } from '../types/userTypes';

export const useUserStore = create<UserState>((set) => {
  return {
    userInfo: null,
    userLogged: false,
    userLogIn: (user: User) => { console.log('Hola', user.name); set({ userInfo: user, userLogged: true }); }
  };
}); 