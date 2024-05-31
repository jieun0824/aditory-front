import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface loginInfo {
  userId?: number;
  username?: string;
  nickname?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  refreshTokenExpires?: number;
  profileImageUrl?: string;
}

interface State {
  userInfo: loginInfo;
  addUserInfo: (state: loginInfo) => void;
  removeUserInfo: () => void;
}

export const useStorage = create<State>()(
  persist(
    (set) => ({
      userInfo: {},
      addUserInfo: (state: loginInfo) =>
        set({
          userInfo: {
            ...state,
          },
        }),
      removeUserInfo: () => set({ userInfo: {} }),
    }),
    {
      name: 'userInfo', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
