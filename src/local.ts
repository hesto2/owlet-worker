require('dotenv').config();
import { handler } from './index';
import getConfig from './getConfig';
import checkBaseStation from './checkBaseStation';
const testEvent = {
  source: 'aws.events',
  Records: [
    {
      Sns: {
        MessageAttributes: {
          receiver: { Value: 'owlet-worker' },
          action: { Value: 'snooze' },
          value: { Value: '60' },
        },
      },
    },
  ],
};

const test = async () => {
  const config = await getConfig();
  await checkBaseStation(config);
};
test();
// (handler as any)(testEvent);
