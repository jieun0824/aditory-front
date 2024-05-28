import { Category } from '@/types/model/category';
import { create } from 'zustand';

const initialState = {
  CategoryInfo: {
    categoryId: null,
    categoryName: '',
    linkCount: null,
    categoryState: null,
    linkList: [],
  },
};

const useCategoryStore = create((set) => ({
  CategoryInfo: initialState.CategoryInfo,
  setCategoryInfo: (newCategoryInfo: Category) =>
    set((state: any) => ({
      CategoryInfo: newCategoryInfo,
    })),

  resetCategoryInfo: () => set({ CategoryInfo: initialState.CategoryInfo }),
}));

export default useCategoryStore;
