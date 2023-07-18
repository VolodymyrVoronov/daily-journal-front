import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { NOTIFICATION_MESSAGE_TIMEOUT } from '../../constants';

import styles from './Notification.module.css';

interface INotificationProps {
  message: string;
  type: 'error' | 'info';

  className?: string;
}

const notificationPortal = document.getElementById(
  'notification-portal',
) as HTMLElement;

const Notification = ({
  message,
  type,

  className,
}: INotificationProps): JSX.Element => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setNotification(message);

    const timeoutId = setTimeout(() => {
      setNotification('');

      clearTimeout(timeoutId);
    }, NOTIFICATION_MESSAGE_TIMEOUT);
  }, [message]);

  return (
    <>
      {createPortal(
        <AnimatePresence mode='wait'>
          {notification && (
            <motion.span
              initial={{ opacity: 0, translateY: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, translateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, translateY: 25, filter: 'blur(5px)' }}
              className={cn(
                styles.root,
                {
                  [styles['root-error']]: type === 'error',
                  [styles['root-info']]: type === 'info',
                },
                className,
              )}
            >
              {notification}
            </motion.span>
          )}
        </AnimatePresence>,
        notificationPortal,
      )}
    </>
  );
};

export default Notification;
