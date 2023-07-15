import cn from 'classnames';
import type { ComponentProps, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import styles from './Button.module.css';

interface IButtonProps extends ComponentProps<'button'> {
  buttonAs?: 'text' | 'button';

  children: ReactNode;
  className?: string;
}

const Button = forwardRef(
  (
    { buttonAs = 'button', className, children, ...props }: IButtonProps,
    ref?: Ref<HTMLButtonElement>,
  ): JSX.Element => {
    if (buttonAs === 'text') {
      return (
        <button
          ref={ref}
          className={cn(styles['root-text'], className)}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(styles['root-button'], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;
