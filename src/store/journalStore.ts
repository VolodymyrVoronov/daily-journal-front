import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import getCurrentDate from '../helpers/getCurrentDate';

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
    year: getCurrentDate().year,
    month: getCurrentDate().month + 1,
    day: getCurrentDate().day,

    setDate: (value: DayValue) => {
      set((state) => {
        state.year = value ? value.year : state.year;
        state.month = value ? value.month : state.month;
        state.day = value ? value.day : state.day;
      });
    },

    setToday: () => {
      set((state) => {
        state.year = getCurrentDate().year;
        state.month = getCurrentDate().month + 1;
        state.day = getCurrentDate().day;
      });
    },
  })),
);
