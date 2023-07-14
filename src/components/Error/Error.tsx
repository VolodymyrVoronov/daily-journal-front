import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ERROR_MESSAGE_TIMEOUT } from '../../constants';

import styles from './Error.module.css';

interface IErrorProps {
  errorMessage: string;
  className?: string;
}

const errorPortal = document.getElementById('error-portal') as HTMLElement;

const Error = ({ errorMessage, className }: IErrorProps): JSX.Element => {
  const [error, setError] = useState('');

  useEffect(() => {
    setError(errorMessage);

    const timeoutId = setTimeout(() => {
      setError('');

      clearTimeout(timeoutId);
    }, ERROR_MESSAGE_TIMEOUT);
  }, [errorMessage]);

  return (
    <>
      {createPortal(
        <AnimatePresence mode='wait'>
          {error && (
            <motion.span
              initial={{ opacity: 0, translateY: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, translateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, translateY: 25, filter: 'blur(5px)' }}
              className={cn(styles.root, className)}
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>,
        errorPortal,
      )}
    </>
  );
};

export default Error;
