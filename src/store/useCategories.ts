import { create } from 'zustand';

// 초기 상태 설정
const initialState = {
  categories: [],
};

// Zustand 스토어 생성
const useCategories = create((set) => ({
  categories: initialState.categories,
  // userInfo를 업데이트하는 액션
  setCategories: (newCategories: []) =>
    set((state: any) => ({
      categories: [...newCategories],
    })),
}));

export default useCategories;
