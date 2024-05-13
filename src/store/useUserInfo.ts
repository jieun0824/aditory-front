import { create } from 'zustand';

// initial state
const initialState = {
  userInfo: {
    username: '',
    password: '',
    nickname: '',
    contact: '',
    userCategories: [],
  },
};

const useUserInfo = create((set) => ({
  userInfo: initialState.userInfo,
  //update userInfo
  setUserInfo: (newUserInfo: Object) =>
    set((state: any) => ({
      userInfo: {
        ...state.userInfo,
        ...newUserInfo,
      },
    })),

  //reset userInfo
  resetUserInfo: () => set({ userInfo: initialState.userInfo }),
}));

export default useUserInfo;
