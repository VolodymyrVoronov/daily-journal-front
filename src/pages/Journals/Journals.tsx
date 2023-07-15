import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { RouterPath } from '../../types';

import Error from '../../components/Error/Error';

import styles from './Journals.module.css';

const Journals = (): JSX.Element => {
  const navigate = useNavigate();

  const { isLoggedIn, logout, accessToken, refreshToken } = useAuthStore();
  const { saveUserInfo } = useUserStore();

  const [resError, setResError] = useState('');

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
        Journals
        <button type='button' onClick={logout}>
          Logout
        </button>
      </motion.div>

      {resError && <Error errorMessage={resError} />}
    </>
  );
};

export default Journals;
