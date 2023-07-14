import { AXIOS_TIMEOUT, BASE_URL, REFRESH_TOKEN_URL } from '../constants';
import { useAuthStore } from '../store/authStore';
import createAxiosClient from './create-axios-client';

const getCurrentAccessToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

const getCurrentRefreshToken = (): string | null => {
  return useAuthStore.getState().refreshToken;
};

const setRefreshTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}): void => {
  const { login } = useAuthStore.getState();

  login(tokens);
};

const logOut = async () => {
  const { logout } = useAuthStore.getState();

  logout();
};

const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: AXIOS_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  logOut,
  setRefreshTokens,
});

export default client;
