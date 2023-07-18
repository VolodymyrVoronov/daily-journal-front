import type { AxiosRequestConfig } from 'axios';

import { IAuthentication, IJournal, IRes, IUser } from './../types';
import client from './axios-client';

export const register = ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<IAuthentication> => {
  return client.post('auth/register', { login, password }, {
    authorization: false,
  } as AxiosRequestConfig);
};

export const logIn = ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<IAuthentication> => {
  return client.post('auth/login', { login, password }, {
    authorization: false,
  } as AxiosRequestConfig);
};

export const getProfile = (): Promise<IUser> => {
  return client.get('/users/profile');
};

export const getAllJournals = (
  year: number,
  month: number,
  day: number,
): Promise<IRes> => {
  return client.get('/journals/all', {
    id: 'all-journals',
    params: {
      year,
      month,
      day,
    },
    cache: {
      update: {
        'all-journals': 'delete',
      },
    },
  });
};

export const createJournal = ({
  title,
  text,
  favorite,
  year,
  month,
  day,
}: {
  title: string;
  text: string;
  favorite: boolean;
  year: number;
  month: number;
  day: number;
}) => {
  return client.post(
    '/journals/create',
    {
      title,
      text,
      favorite,
      year,
      month,
      day,
    },
    {
      cache: {
        update: {
          'all-journals': 'delete',
        },
      },
    },
  );
};

export const deleteJournal = (journalId: string) => {
  return client.delete(`/journals/delete/${journalId}`, {
    cache: {
      update: {
        'all-journals': 'delete',
      },
    },
  });
};

export const addToFavorite = (journalId: string) => {
  return client.patch(
    `/journals/favorite/${journalId}`,
    { journalId },
    {
      cache: {
        update: {
          'all-journals': 'delete',
        },
      },
    },
  );
};

export const updateJournal = (data: IJournal) => {
  return client.patch(`/journals/update/${data.id}`, data, {
    cache: {
      update: {
        'all-journals': 'delete',
      },
    },
  });
};
