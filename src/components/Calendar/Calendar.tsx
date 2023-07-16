import {
  Calendar as C,
  DayValue,
} from '@hassanmojab/react-modern-calendar-datepicker';
import cn from 'classnames';
import { ComponentProps, useEffect } from 'react';

import getCurrentDate from '../../helpers/getCurrentDate';
import { useJournalStore } from '../../store/journalStore';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import styles from './Calendar.module.css';

interface ICalendarProps extends ComponentProps<'div'> {
  className?: string;
}

const myCustomLocale = {
  // months list by order
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Monday',
      short: 'M',
    },
    {
      name: 'Tuesday',
      short: 'T',
    },
    {
      name: 'Wednesday',
      short: 'W',
    },
    {
      name: 'Thursday',
      short: 'T',
    },
    {
      name: 'Friday',
      short: 'F',
    },
    {
      name: 'Saturday',
      short: 'S',
      isWeekend: true,
    },
    {
      name: 'Sunday', // used for accessibility
      short: 'S', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: -1,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject: any) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date: any) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date: { year: number; month: number; day: number }) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit: string | number) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',

  // for input range value
  from: 'from',
  to: 'to',

  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};

const minimumDate = {
  year: getCurrentDate().year,
  month: getCurrentDate().month - 1,
  day: getCurrentDate().day,
};

const maximumDate = {
  year: getCurrentDate().year,
  month: getCurrentDate().month + 3,
  day: getCurrentDate().day,
};

const Calendar = ({ className, ...props }: ICalendarProps): JSX.Element => {
  const { year, month, day, setDate } = useJournalStore();

  console.log(year, month, day);

  const onCalendarChange = (value: DayValue) => {
    setDate(value);
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <C
        calendarClassName={styles.calendar}
        value={{ year, month, day }}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onCalendarChange}
        shouldHighlightWeekends
        locale={myCustomLocale}
        colorPrimary='#228be6'
        colorPrimaryLight='#066ec9'
      />
    </div>
  );
};

export default Calendar;
