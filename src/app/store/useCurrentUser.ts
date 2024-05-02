import { create } from 'zustand';

// 초기 상태 설정
const initialState = {
  userInfo: {
    username: '',
    password: '',
    nickname: '',
    contact: '',
    userCategories: [],
  },
};

// Zustand 스토어 생성
const useUCurrentUser = create((set) => ({
  userInfo: initialState.userInfo,
  // userInfo를 업데이트하는 액션
  setUserInfo: (newUserInfo: Object) =>
    set((state: any) => ({
      userInfo: newUserInfo,
    })),

  // userInfo를 초기 상태로 재설정하는 액션
  resetUserInfo: () => set({ userInfo: initialState.userInfo }),
}));

export default useUCurrentUser;
