import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import {
  BiEditAlt,
  BiPlus,
  BiSave,
  BiSolidStar,
  BiStar,
  BiTrash,
  BiX,
} from 'react-icons/bi';

import { IJournal } from '../../types';

import { COLORS } from '../../constants';
import styles from './JournalItem.module.css';

interface IJournalItemProps {
  journal?: IJournal;

  onSaveClick: (title: string, text: string) => void;
  onUpdateClick?: (data: IJournal) => void;
  onDeleteClick: (journalId: string) => void;
  onFavoriteClick: (journalId: string) => void;

  className?: string;
}

const JournalItem = ({
  journal,

  onSaveClick,
  onUpdateClick,
  onDeleteClick,
  onFavoriteClick,

  className,
}: IJournalItemProps): JSX.Element => {
  const [journalData, setJournalData] = useState({
    title: journal?.title || '',
    text: journal?.text || '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const onEditButtonClick = (): void => {
    setIsEditing(true);
  };

  const onCreateButtonClick = (): void => {
    setIsCreating(true);
  };

  const onCloseButtonClick = (): void => {
    if (isCreating) {
      setIsCreating(false);
      setJournalData({
        title: '',
        text: '',
      });
    }

    if (isEditing) {
      setIsEditing(false);
    }
  };

  const onDeleteButtonClick = (): void => {
    if (journal) {
      onDeleteClick(journal?.id);
    }
  };

  const onSaveButtonClick = (): void => {
    if (!journal) {
      onSaveClick(journalData.title, journalData.text);
      setJournalData({
        title: '',
        text: '',
      });

      setIsCreating(false);
    }

    if (journal) {
      if (!onUpdateClick) {
        return;
      }

      onUpdateClick({
        ...journal,
        ...journalData,
      });

      setJournalData({
        title: journal.title,
        text: journal.text,
      });

      setIsEditing(false);
    }
  };

  const onFavoriteButtonClick = (): void => {
    if (journal) {
      onFavoriteClick(journal?.id);
    }
  };

  const onInputsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;

    setJournalData({
      ...journalData,
      [name]: value,
    });
  };

  if (!journal) {
    return (
      <div className={cn(styles.root, className)}>
        <AnimatePresence mode='wait'>
          {isCreating ? (
            <motion.section
              className={styles.create}
              key={String(isCreating)}
              initial={{ opacity: 0 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.25,
                },
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.25,
                },
              }}
            >
              <span className={styles.inputs}>
                <input
                  onChange={onInputsChange}
                  value={journalData.title}
                  name='title'
                  type='text'
                  className={styles.input}
                  placeholder='Title...'
                />
                <textarea
                  onChange={onInputsChange}
                  value={journalData.text}
                  name='text'
                  className={styles.textarea}
                  placeholder='Text...'
                />
              </span>

              <span className={styles.buttons}>
                <button
                  className={styles.button}
                  type='button'
                  onClick={onSaveButtonClick}
                  disabled={
                    (isCreating && !journalData.title) || !journalData.text
                  }
                >
                  <BiSave />
                </button>
                <button
                  className={styles.button}
                  type='button'
                  onClick={onCloseButtonClick}
                >
                  <BiX />
                </button>
              </span>
            </motion.section>
          ) : (
            <motion.button
              className={styles['create-button']}
              type='button'
              onClick={onCreateButtonClick}
              key={String(isCreating)}
              initial={{ opacity: 0 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.25,
                },
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.25,
                },
              }}
            >
              <BiPlus />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const { title, text, favorite } = journal;

  return (
    <div className={cn(styles.root, className)}>
      <AnimatePresence mode='wait'>
        {isEditing ? (
          <motion.section
            className={styles.update}
            key={String(isEditing)}
            initial={{ opacity: 0 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.25,
              },
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <span className={styles.inputs}>
              <input
                onChange={onInputsChange}
                value={journalData.title}
                name='title'
                type='text'
                className={styles.input}
                placeholder='Title...'
              />
              <textarea
                onChange={onInputsChange}
                value={journalData.text}
                name='text'
                className={styles.textarea}
                placeholder='Text...'
              />
            </span>

            <span className={styles.buttons}>
              <button
                className={styles.button}
                type='button'
                onClick={onFavoriteButtonClick}
              >
                {favorite ? <BiSolidStar color={COLORS.GOLD} /> : <BiStar />}
              </button>

              {isEditing ? (
                <button
                  className={styles.button}
                  type='button'
                  onClick={onSaveButtonClick}
                  disabled={
                    (isEditing && !journalData.title) || !journalData.text
                  }
                >
                  <BiSave />
                </button>
              ) : (
                <button
                  className={styles.button}
                  type='button'
                  onClick={onEditButtonClick}
                >
                  <BiEditAlt />
                </button>
              )}

              <button
                className={styles.button}
                type='button'
                onClick={onCloseButtonClick}
              >
                <BiX />
              </button>
            </span>
          </motion.section>
        ) : (
          <motion.section
            className={styles.journal}
            key={String(isEditing)}
            initial={{ opacity: 0 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.25,
              },
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <span className={styles.body}>
              <span className={styles.title}>{title}</span>
              <span className={styles.text}>{text}</span>
            </span>

            <span
              className={cn(styles.buttons, {
                [styles['buttons-hidden']]: !isEditing,
              })}
            >
              <button
                className={styles.button}
                type='button'
                onClick={onFavoriteButtonClick}
              >
                {favorite ? <BiSolidStar color={COLORS.GOLD} /> : <BiStar />}
              </button>

              {isEditing ? (
                <button
                  className={styles.button}
                  type='button'
                  onClick={onSaveButtonClick}
                  disabled={
                    (isEditing && !journalData.title) || !journalData.text
                  }
                >
                  <BiSave />
                </button>
              ) : (
                <button
                  className={styles.button}
                  type='button'
                  onClick={onEditButtonClick}
                >
                  <BiEditAlt />
                </button>
              )}

              <button
                className={styles.button}
                type='button'
                onClick={onDeleteButtonClick}
              >
                <BiTrash />
              </button>
            </span>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JournalItem;
