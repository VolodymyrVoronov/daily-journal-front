import { ComponentProps } from 'react';
import cn from 'classnames';
import { BiPlus, BiSave, BiTrash } from 'react-icons/bi';

import styles from './NewJournal.module.css';

interface INewJournalProps extends ComponentProps<'div'> {
  className?: string;
}

const NewJournal = ({ className, ...props }: INewJournalProps): JSX.Element => {

  return (
    <div className={cn(styles.root, className)} {...props}>
      NewJournal
    </div>
  );
};

export default NewJournal;
