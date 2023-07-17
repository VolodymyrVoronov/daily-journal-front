import type { AxiosRequestConfig } from 'axios';

import client from './axios-client';

export const register = ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
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
}) => {
  return client.post('auth/login', { login, password }, {
    authorization: false,
  } as AxiosRequestConfig);
};

export const getProfile = () => {
  return client.get('/users/profile');
};

export const getAllJournals = (year: number, month: number, day: number) => {
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
