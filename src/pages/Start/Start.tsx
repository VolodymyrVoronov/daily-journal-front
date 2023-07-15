import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logIn, register } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { Form, RouterPath, type FormType, type IFormData } from '../../types';

import AuthenticationForm from '../../components/AuthenticationForm/AuthenticationForm';
import Error from '../../components/Error/Error';
import Logo from '../../components/Logo/Logo';

import styles from './Start.module.css';

const Start = (): JSX.Element => {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    login,
    accessToken: aT,
    refreshToken: rT,
  } = useAuthStore();

  const onSubmitButtonClick = async (
    data: IFormData,
    type: FormType,
  ): Promise<void> => {
    try {
      const response =
        type === Form.Login ? await logIn(data) : await register(data);

      const { accessToken, refreshToken } = response.data;

      login({ accessToken, refreshToken });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }

      if (error instanceof AxiosError && error.response) {
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    // if (!isLoggedIn()) {
    //   navigate(RouterPath.Start);
    // }

    if (isLoggedIn()) {
      navigate(RouterPath.Journal);
    }
  }, [aT, rT]);

  const e = '';

  return (
    <>
      <motion.div
        className={styles.root}
        initial={{ y: -window.innerHeight, opacity: 0 }}
        exit={{ y: window.innerHeight, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.section
          className={styles.left}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
        >
          <AuthenticationForm onSubmitButtonClick={onSubmitButtonClick} />
        </motion.section>

        <motion.section
          className={styles.right}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
        >
          <Logo>Daily Journal</Logo>
        </motion.section>
      </motion.div>

      {e && <Error errorMessage={e} />}
    </>
  );
};

export default Start;
