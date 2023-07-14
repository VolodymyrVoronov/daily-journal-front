import { ComponentProps, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Logo.module.css';

interface ILogoProps extends ComponentProps<'span'> {
  children: ReactNode;
  className?: string;
}

const Logo = ({ className, children, ...props }: ILogoProps): JSX.Element => {
  return (
    <span className={cn(styles.root, className)} {...props}>
      {children}
    </span>
  );
};

export default Logo;
