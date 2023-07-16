import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiLogOut, BiBookmark, BiStar, BiSolidStar } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { RouterPath } from '../../types';
import { useJournalStore } from '../../store/journalStore';

import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import Error from '../../components/Error/Error';
import UserInfo from '../../components/UserInfo/UserInfo';
import TodayHeader from '../../components/TodayHeader/TodayHeader';

import styles from './Journal.module.css';

const Journal = (): JSX.Element => {
  const navigate = useNavigate();

  const { isLoggedIn, accessToken, refreshToken, logout } = useAuthStore();
  const { saveUserInfo } = useUserStore();
  const { setToday } = useJournalStore();

  const [resError, setResError] = useState('');

  const onLogoutButtonClick = (): void => {
    logout();
  };

  const onTodayButtonClick = (): void => {
    setToday();
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
              <BiBookmark className={styles.icon} /> Today
            </Button>

            <Button
              className={styles.button}
              onClick={() => {}}
              type='button'
              buttonAs='text'
              aria-label='Favorite'
            >
              <BiStar className={styles.icon} /> Favorite
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
        </section>
      </motion.div>

      {resError && <Error errorMessage={resError} />}
    </>
  );
};

export default Journal;
