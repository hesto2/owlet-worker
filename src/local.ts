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
  try {
    const config = await getConfig();
    await checkBaseStation(config);
  } catch (err) {
    console.error(err);
  }
};
test();
// (handler as any)(testEvent);
