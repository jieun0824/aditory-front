import { create } from 'zustand';

// refresh token 만료 / 로그아웃해서 localStorage 에 정보가 없는 경우 -> false
const initialState = {
  isLoggedIn: true,
};

// Zustand 스토어 생성
const useIsLoggedIn = create((set) => ({
  isLoggedIn: initialState.isLoggedIn,
  // userInfo를 업데이트하는 액션
  setIsLoggedIn: (newLinkInfo: boolean) =>
    set((state: any) => ({
      isLoggedIn: newLinkInfo,
    })),
}));

export default useIsLoggedIn;
