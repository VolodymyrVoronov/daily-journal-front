import cn from 'classnames';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ComponentProps } from 'react';

import { useJournalStore } from '../../store/journal';

import styles from './TodayHeader.module.css';

interface ITodayHeaderProps extends ComponentProps<'div'> {
  className?: string;
}

const variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1 } },
} as Variants;

const animations = {
  initial: 'initial',
  exit: 'exit',
  animate: 'animate',
} as const;

const TodayHeader = ({
  className,

  ...props
}: ITodayHeaderProps): JSX.Element => {
  const { year, month, day } = useJournalStore();

  const dayOfTheWeek = new Date(year, month - 1, day).toLocaleString('en-US', {
    weekday: 'long',
  });
  const monthOfTheYear = new Date(year, month - 1, day).toLocaleString(
    'en-US',
    { month: 'long' },
  );

  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence mode='sync'>
        <motion.span
          className={styles.day}
          key={day + 100}
          variants={variants}
          {...animations}
        >
          {day}
        </motion.span>
        <motion.span
          className={styles['week-day']}
          key={day + 200}
          variants={variants}
          {...animations}
        >
          {dayOfTheWeek}
        </motion.span>
        <motion.span
          className={styles.month}
          key={day + 300}
          variants={variants}
          {...animations}
        >
          {monthOfTheYear}
        </motion.span>
        <motion.span
          className={styles.year}
          key={day + 400}
          variants={variants}
          {...animations}
        >
          {year}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TodayHeader;
