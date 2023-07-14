import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logIn, register } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { Form, RouterPath, type FormType, type IFormData } from '../../types';

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
        type === Form.Register ? await register(data) : await logIn(data);

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
    if (!isLoggedIn()) {
      navigate(RouterPath.Start);
    }

    if (isLoggedIn()) {
      navigate(RouterPath.Journal);
    }
  }, [aT, rT]);

  return (
    <>
      <motion.div
        className={styles.root}
        initial={{ y: -window.innerHeight, opacity: 0 }}
        exit={{ y: window.innerHeight, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <section className={styles.left}>Left</section>

        <motion.section
          className={styles.right}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
        >
          <Logo>Daily Journal</Logo>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Start;
