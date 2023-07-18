import { AxiosError } from 'axios';
import cn from 'classnames';
import { useState } from 'react';

import {
  addToFavorite,
  createJournal,
  deleteJournal,
  updateJournal,
} from '../../services/services';
import { useJournalStore } from '../../store/journalStore';
import { IJournal } from '../../types';

import Notification from '../../components/Notification/Notification';
import JournalItem from '../JournalItem/JournalItem';

import styles from './JournalItems.module.css';

interface IJournalItemsProps {
  className?: string;
}

const JournalItems = ({ className }: IJournalItemsProps): JSX.Element => {
  const { setRefetchEventHappened, journals, year, month, day, showFavorite } =
    useJournalStore();

  const [resError, setResError] = useState('');
  const [resInfo, setResInfo] = useState('');

  const onSaveClick = (title: string, text: string): void => {
    setResError('');
    setResInfo('');

    createJournal({
      title,
      text,
      favorite: false,
      year,
      month,
      day,
    })
      .then(({ data }) => {
        if (data.status === 200) {
          setRefetchEventHappened();
          setResInfo(data.message);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);
        }
      });
  };

  const onUpdateClick = (data: IJournal) => {
    setResError('');
    setResInfo('');

    updateJournal(data)
      .then(({ data }) => {
        if (data.status === 200) {
          setRefetchEventHappened();
          setResInfo(data.message);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);
        }
      });
  };

  const onDeleteClick = (journalId: string): void => {
    setResError('');
    setResInfo('');

    deleteJournal(journalId)
      .then(({ data }) => {
        if (data.status === 200) {
          setRefetchEventHappened();
          setResInfo(data.message);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);
        }
      });
  };

  const onFavoriteClick = (journalId: string): void => {
    setResError('');
    setResInfo('');

    addToFavorite(journalId)
      .then(({ data }) => {
        if (data.status === 200) {
          setRefetchEventHappened();
          setResInfo(data.message);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);
        }
      });
  };

  const favoriteJournals = showFavorite
    ? journals.filter((journal) => journal.favorite)
    : journals;

  return (
    <div className={cn(styles.root, className)}>
      {favoriteJournals.map((journal) => (
        <JournalItem
          onSaveClick={onSaveClick}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
          onFavoriteClick={onFavoriteClick}
          key={journal.id}
          journal={journal}
        />
      ))}

      <JournalItem
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
        onFavoriteClick={onFavoriteClick}
      />

      {resError && <Notification message={resError} type='error' />}
      {resInfo && <Notification message={resInfo} type='info' />}
    </div>
  );
};

export default JournalItems;
