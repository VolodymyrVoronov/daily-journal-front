import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  BiBookmark,
  BiLogOut,
  BiSolidBookmark,
  BiSolidStar,
  BiStar,
} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '../../constants';
import getCurrentDate from '../../helpers/getCurrentDate';
import { getAllJournals, getProfile } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { useJournalStore } from '../../store/journalStore';
import { useUserStore } from '../../store/userStore';
import { RouterPath } from '../../types';

import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import JournalItems from '../../components/JournalItems/JournalItems';
import Notification from '../../components/Notification/Notification';
import TodayHeader from '../../components/TodayHeader/TodayHeader';
import UserInfo from '../../components/UserInfo/UserInfo';

import styles from './Journal.module.css';

const Journal = (): JSX.Element => {
  const navigate = useNavigate();

  const { isLoggedIn, logout, accessToken, refreshToken } = useAuthStore();
  const { saveUserInfo } = useUserStore();
  const {
    setToday,
    setJournals,
    setShowFavorite,
    year,
    month,
    day,
    journals,
    refetchEventHappened,
    showFavorite,
  } = useJournalStore();

  const [resError, setResError] = useState('');

  const isTodaySelected =
    year === getCurrentDate().year &&
    month === getCurrentDate().month + 1 &&
    day === getCurrentDate().day;

  const anyFavorite = journals.some((journal) => journal.favorite);

  const onLogoutButtonClick = (): void => {
    logout();
  };

  const onTodayButtonClick = (): void => {
    setToday();
  };

  const onFavoriteButtonClick = () => {
    if (showFavorite) {
      setShowFavorite(false);
    } else {
      setShowFavorite(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RouterPath.Start);
    }

    if (isLoggedIn()) {
      setResError('');

      getProfile()
        .then(({ data }) => {
          saveUserInfo(data);
        })
        .catch((error) => {
          if (error instanceof AxiosError && error.response) {
            setResError(error.response.data.message);
          }
        });
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    getAllJournals(year, month, day)
      .then(({ data }) => {
        setJournals([]);
        setJournals(data);
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);
        }
      });
  }, [year, month, day, refetchEventHappened]);

  useEffect(() => {
    if (anyFavorite === false) {
      setShowFavorite(false);
    }
  }, [anyFavorite]);

  return (
    <>
      <motion.div
        className={styles.root}
        initial={{ y: -window.innerHeight, opacity: 0 }}
        exit={{ y: window.innerHeight, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <section className={styles.left}>
          <UserInfo className={styles['user-info']} />

          <Calendar className={styles.calendar} />

          <div className={styles.buttons}>
            <Button
              className={styles.button}
              onClick={onTodayButtonClick}
              type='button'
              buttonAs='text'
              aria-label='Today'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={String(isTodaySelected)}
                  initial={{ opacity: 0 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                >
                  {isTodaySelected ? (
                    <BiSolidBookmark
                      className={styles.icon}
                      color={COLORS.BLUE}
                    />
                  ) : (
                    <BiBookmark className={styles.icon} />
                  )}
                </motion.div>
              </AnimatePresence>
              Today
            </Button>

            <Button
              className={styles.button}
              onClick={onFavoriteButtonClick}
              type='button'
              buttonAs='text'
              aria-label='Favorite'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={String(anyFavorite)}
                  initial={{ opacity: 0 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                >
                  {anyFavorite ? (
                    <BiSolidStar className={styles.icon} color={COLORS.GOLD} />
                  ) : (
                    <BiStar className={styles.icon} />
                  )}
                </motion.div>
              </AnimatePresence>
              Favorite
            </Button>
          </div>

          <Button
            className={styles['logout-button']}
            onClick={onLogoutButtonClick}
            type='button'
            aria-label='Logout'
          >
            <BiLogOut />
          </Button>
        </section>

        <section className={styles.right}>
          <TodayHeader />

          <JournalItems />
        </section>
      </motion.div>

      {resError && <Notification message={resError} type='error' />}
    </>
  );
};

export default Journal;
