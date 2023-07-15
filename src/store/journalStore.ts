import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IJournalStore {
  year: number;
  month: number;
  day: number;
}

interface IJournalStoreActions {
  setDate: (date: IJournalStore) => void;
}

export const useAuthStore = create(
  immer<IJournalStore & IJournalStoreActions>((set, get) => ({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),

    setDate: (date: IJournalStore) => {
      set((state) => {
        state.year = date.year;
        state.month = date.month;
        state.day = date.day;
      });
    },
  })),
);
