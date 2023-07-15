import { ComponentProps } from 'react';
import cn from 'classnames';

import { useUserStore } from '../../store/userStore';

import styles from './UserInfo.module.css';

interface IUserInfoProps extends ComponentProps<'div'> {
  className?: string;
}

const UserInfo = ({ className, ...props }: IUserInfoProps): JSX.Element => {
  const { login } = useUserStore();

  return (
    <span className={cn(styles.root, className)} {...props}>
      Welcome, {login}
    </span>
  );
};

export default UserInfo;
