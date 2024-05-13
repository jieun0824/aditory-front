import { create } from 'zustand';

// 초기 상태 설정
const initialState = {
  token: '',
};

// Zustand 스토어 생성
const useToken = create((set) => ({
  token: initialState.token,
  // userInfo를 업데이트하는 액션
  setToken: (token: string) =>
    set((state: any) => ({
      token: token,
    })),
}));

export default useToken;
