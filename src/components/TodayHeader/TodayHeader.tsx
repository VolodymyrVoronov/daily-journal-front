import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps } from 'react';

import { useJournalStore } from '../../store/journalStore';

import styles from './TodayHeader.module.css';

interface ITodayHeaderProps extends ComponentProps<'div'> {
  className?: string;
}

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

  const variants = {
    initial: { opacity: 0, filter: 'blur(10px)' },
    exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1 } },
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence mode='sync'>
        <motion.span
          key={day + 100}
          variants={variants}
          initial='initial'
          exit='exit'
          animate='animate'
          className={styles.day}
        >
          {day}
        </motion.span>
        <motion.span
          key={day + 200}
          variants={variants}
          initial='initial'
          exit='exit'
          animate='animate'
          className={styles['week-day']}
        >
          {dayOfTheWeek}
        </motion.span>
        <motion.span
          key={day + 300}
          variants={variants}
          initial='initial'
          exit='exit'
          animate='animate'
          className={styles.month}
        >
          {monthOfTheYear}
        </motion.span>
        <motion.span
          key={day + 400}
          variants={variants}
          initial='initial'
          exit='exit'
          animate='animate'
          className={styles.year}
        >
          {year}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TodayHeader;
