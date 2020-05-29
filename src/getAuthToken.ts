import AWS from 'aws-sdk';
import { login } from 'owlet-client';
import { isAfter, subHours } from 'date-fns';
const s3 = new AWS.S3();
const keyName = 'token.txt';
const bucketName = process.env.S3_BUCKET_NAME;

const persistToken = async (token: string) => {
  await s3
    .putObject({ Bucket: bucketName, Key: keyName, Body: token })
    .promise();
};

const getAuthToken = async (): Promise<string> => {
  // If we are reading from s3 then find the cached token, if it is more than 23 hours old, refresh it
  if (bucketName) {
    try {
      const result = await s3
        .getObject({ Bucket: bucketName, Key: keyName })
        .promise();

      const tokenTime = result.LastModified;

      if (isAfter(tokenTime, subHours(new Date(), 23))) {
        return result.Body.toString();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const token = await login();
  if (bucketName) {
    try {
      await persistToken(token);
    } catch (err) {
      console.log(err);
    }
  }
  return token;
};
export default getAuthToken;
