import AWS from 'aws-sdk';
import * as Sentry from '@sentry/node';
const s3 = new AWS.S3();

export interface Config {
  token?: string;
  tokenDate?: number;
  snoozeExpiration?: number;
}

const keyName = 'config.json';
const bucketName = process.env.S3_BUCKET_NAME;

export const persistConfig = async (config: Config) => {
  await s3
    .putObject({
      Bucket: bucketName,
      Key: keyName,
      Body: JSON.stringify(config),
    })
    .promise();
};

const getConfig = async (): Promise<Config> => {
  if (bucketName) {
    try {
      const result = await s3
        .getObject({ Bucket: bucketName, Key: keyName })
        .promise();

      const config = JSON.parse(result.Body.toString());
      return config;
    } catch (err) {
      Sentry.captureException(err);
      console.log('failed to get config');
      console.log(err);
    }
  }
  return {};
};
export default getConfig;
