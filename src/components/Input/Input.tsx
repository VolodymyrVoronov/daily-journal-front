import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import {
  forwardRef,
  useId,
  useState,
  type ComponentProps,
  type Ref,
} from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

import styles from './Input.module.css';

type InputType = 'text' | 'password';

interface IInputProps extends ComponentProps<'input'> {
  inputType: InputType;
  labelText: string;
  className?: string;
}

const Input = forwardRef(
  (
    {
      inputType,
      labelText,
      className,

      ...props
    }: IInputProps,
    ref?: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const id = useId();

    const [showPassword, setShowPassword] = useState(false);

    const onShowPasswordClick = (): void => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={cn(styles.root, className)}>
        <label htmlFor={id} className={styles.label}>
          {labelText}
        </label>
        <input
          ref={ref}
          className={cn(styles.input, {
            [styles.password]: inputType === 'password',
          })}
          id={id}
          type={showPassword ? 'text' : inputType}
          {...props}
        />

        {inputType === 'password' && (
          <AnimatePresence mode='wait'>
            <motion.button
              key={String(showPassword)}
              className={styles.button}
              type='button'
              onClick={onShowPasswordClick}
              initial={{ opacity: 0, scale: 0.9 }}
              exit={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className={styles.icon}>
                {showPassword ? <BiHide /> : <BiShow />}
              </span>
            </motion.button>
          </AnimatePresence>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
