require('dotenv').config();
import { handler } from './index';
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

(handler as any)(testEvent);
