import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import getCurrentDate from '../helpers/getCurrentDate';
import { IJournal } from '../types';

interface IJournalStore {
  year: number;
  month: number;
  day: number;
  journals: IJournal[];
  refetchEventHappened: boolean;
  showFavorite: boolean;
}

interface IJournalStoreActions {
  setDate: (value: DayValue) => void;
  setToday: () => void;
  setJournals: (value: IJournal[]) => void;
  setRefetchEventHappened: () => void;
  setShowFavorite: (value: boolean) => void;
}

export const useJournalStore = create(
  immer<IJournalStore & IJournalStoreActions>((set, get) => ({
    year: getCurrentDate().year,
    month: getCurrentDate().month + 1,
    day: getCurrentDate().day,
    journals: [],
    refetchEventHappened: false,
    showFavorite: false,

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

    setJournals: (value: IJournal[]) => {
      if (value.length === 0) {
        set((state) => {
          state.journals = [];
        });
      }

      set((state) => {
        state.journals.push(...value);
      });
    },

    setRefetchEventHappened: () => {
      set((state) => {
        state.refetchEventHappened = !get().refetchEventHappened;
      });
    },

    setShowFavorite: (value: boolean) => {
      set((state) => {
        state.showFavorite = value;
      });
    },
  })),
);
