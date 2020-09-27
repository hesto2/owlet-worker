import { login } from 'owlet-client';
import { isAfter, subHours } from 'date-fns';
import { Config, persistConfig } from './getConfig';
import * as Sentry from '@sentry/node';

const persistToken = async (token: string, config: Config) => {
  await persistConfig({ ...config, token, tokenDate: new Date().getTime() });
};

const getAuthToken = async (config: Config): Promise<string> => {
  if (config.token && config.tokenDate) {
    try {
      const tokenTime = new Date(config.tokenDate);

      if (isAfter(tokenTime, subHours(new Date(), 23))) {
        return config.token;
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  }

  console.log('logging in');
  const token = await login();
  if (process.env.S3_BUCKET_NAME) {
    try {
      await persistToken(token, config);
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  }
  return token;
};
export default getAuthToken;
