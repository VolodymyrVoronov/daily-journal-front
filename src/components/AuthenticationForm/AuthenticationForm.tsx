import { useEventListener } from 'ahooks';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Form, Key, type FormType, type IFormData } from '../../types';

import Input from '../Input/Input';

import styles from './AuthenticationForm.module.css';

interface IAuthenticationFormProps extends ComponentProps<'div'> {
  onSubmitButtonClick: (data: IFormData, type: FormType) => void;

  className?: string;
}

const AuthenticationForm = ({
  onSubmitButtonClick,
  className,
  ...props
}: IAuthenticationFormProps): JSX.Element => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const onFormSubmit = (data: IFormData | FieldValues): void => {
    onSubmitButtonClick(
      data as IFormData,
      isLoginForm ? Form.Login : Form.Register,
    );

    reset();
  };

  const onChangeFormButtonClick = (): void => {
    setIsLoginForm(!isLoginForm);
    reset();

    const timeoutId = setTimeout(() => {
      setFocus('login');

      clearTimeout(timeoutId);
    }, 1000);
  };

  useEventListener('keydown', (e) => {
    if (e.key === Key.Escape) {
      reset();
    }
  });

  useEffect(() => {
    setFocus('login');
  }, []);

  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence mode='wait'>
        <motion.form
          className={styles.form}
          key={String(isLoginForm)}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
          exit={{
            scale: 0.9,
            opacity: 0,
            filter: 'blur(2.5px)',
            transition: {
              duration: 0.5,
            },
          }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
              duration: 0.5,
            },
          }}
        >
          {isLoginForm ? (
            <span className={styles.header}>Welcome back!</span>
          ) : (
            <span className={styles.header}>Create an account</span>
          )}

          <Input inputType='text' labelText='Login' className={styles.input} />

          <Input
            inputType='password'
            labelText='Password'
            className={styles.input}
          />

          {!isLoginForm && (
            <Input
              inputType='password'
              labelText='Confirm password'
              className={styles.input}
            />
          )}
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

export default AuthenticationForm;
