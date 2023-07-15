import { useEventListener } from 'ahooks';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Form, Key, type FormType, type IFormData } from '../../types';

import Button from '../Button/Button';
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

  const onChangeFormTypeButtonClick = (): void => {
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
          onSubmit={handleSubmit(onFormSubmit)}
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

          <Input
            inputType='text'
            labelText='Login'
            className={styles.input}
            aria-label='Login'
            {...register('login', {
              required: true,
              minLength: {
                value: 3,
                message: 'Login must be at least 3 characters long',
              },
            })}
          />
          {errors.login?.type === 'required' && (
            <span className={styles.error}>Login is required.</span>
          )}
          {errors.login && (
            <span className={styles.error}>
              {errors.login.message as string}
            </span>
          )}

          <Input
            inputType='password'
            labelText='Password'
            className={styles.input}
            aria-label='Password'
            {...register('password', {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value,
                  ),
              },
            })}
          />
          {errors.password?.type === 'required' && (
            <span className={styles.error}>Password is required.</span>
          )}
          {errors.password?.type === 'checkLength' && (
            <span className={styles.error}>
              Password should be at-least 6 characters.
            </span>
          )}
          {errors.password?.type === 'matchPattern' && (
            <span className={styles.error}>
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </span>
          )}

          {!isLoginForm && (
            <Input
              inputType='password'
              labelText='Confirm password'
              className={styles.input}
              aria-label='Confirm password'
              {...register('confirmedPassword', {
                required: true,
                validate: (value: string) => {
                  if (watch('password') !== value) {
                    return 'Your passwords do not match';
                  }

                  return true;
                },
              })}
            />
          )}
          {!isLoginForm && errors.confirmedPassword?.type === 'required' && (
            <span className={styles.error}>Password is required.</span>
          )}
          {!isLoginForm && errors.confirmedPassword && (
            <span className={styles.error}>
              {errors.confirmedPassword.message as string}
            </span>
          )}

          {isLoginForm ? (
            <Button
              type='submit'
              className={styles.button}
              disabled={Object.keys(errors).length > 0}
            >
              Login
            </Button>
          ) : (
            <Button
              type='submit'
              className={styles.button}
              disabled={Object.keys(errors).length > 0}
            >
              Register
            </Button>
          )}

          <div className={styles.footer}>
            {isLoginForm ? (
              <span className={styles['footer-text']}>
                Don't have an account?
                <Button
                  className={styles['footer-button']}
                  type='button'
                  buttonAs='text'
                  onClick={onChangeFormTypeButtonClick}
                >
                  Register
                </Button>
              </span>
            ) : (
              <span className={styles['footer-text']}>
                I have an account.
                <Button
                  className={styles['footer-button']}
                  type='button'
                  buttonAs='text'
                  onClick={onChangeFormTypeButtonClick}
                >
                  Login
                </Button>
              </span>
            )}
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

export default AuthenticationForm;
