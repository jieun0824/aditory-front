import { create } from 'zustand';

// 초기 상태 설정
const initialState = {
  linkInfo: {
    autoComplete: false, // true 면 url 제외하고 모두 자동완성
    title: '',
    summary: '',
    url: '',
    categoryId: 0,
  },
};

// Zustand 스토어 생성
const useLinkStore = create((set) => ({
  linkInfo: initialState.linkInfo,
  // userInfo를 업데이트하는 액션
  setUserInfo: (newLinkInfo: Object) =>
    set((state: any) => ({
      linkInfo: newLinkInfo,
    })),

  // userInfo를 초기 상태로 재설정하는 액션
  resetLinkInfo: () => set({ linkInfo: initialState.linkInfo }),
}));

export default useLinkStore;
