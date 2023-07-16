import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const getCurrentFullYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth() + 1;
const getCurrentDay = () => new Date().getDate();

interface IJournalStore {
  year: number;
  month: number;
  day: number;
}

interface IJournalStoreActions {
  setDate: (value: DayValue) => void;
  setToday: () => void;
}

export const useJournalStore = create(
  immer<IJournalStore & IJournalStoreActions>((set, get) => ({
    year: getCurrentFullYear(),
    month: getCurrentMonth(),
    day: getCurrentDay(),

    setDate: (value: DayValue) => {
      set((state) => {
        state.year = value ? value.year : state.year;
        state.month = value ? value.month : state.month;
        state.day = value ? value.day : state.day;
      });
    },

    setToday: () => {
      set((state) => {
        state.year = getCurrentFullYear();
        state.month = getCurrentMonth();
        state.day = getCurrentDay();
      });
    },
  })),
);
