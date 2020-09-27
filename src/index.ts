import { Context, SNSEvent, ScheduledEvent } from 'aws-lambda';
import checkBaseStation from './checkBaseStation';
import getConfig from './getConfig';
import { SNSMessageAttributes, Actions } from './types';
import snooze from './snooze';
import { isAfter } from 'date-fns';
import * as Sentry from '@sentry/node';

export const handler = async (
  event: ScheduledEvent | SNSEvent,
  _context: Context
) => {
  Sentry.init({
    dsn:
      'https://590bd1773d764983b2be6bfbd92faedf@o453466.ingest.sentry.io/5442814',
  });
  const config = await getConfig();
  console.log('config', config);
  if ((event as ScheduledEvent)?.source === 'aws.events') {
    if (
      config?.snoozeExpiration
        ? isAfter(new Date(), new Date(config.snoozeExpiration))
        : true
    ) {
      await checkBaseStation(config);
    } else {
      console.log('snoozing');
    }
  } else {
    console.log((event as SNSEvent).Records?.[0].Sns);

    const messageAttributes: SNSMessageAttributes = (event as SNSEvent)
      .Records[0].Sns.MessageAttributes as any;
    if (messageAttributes.action.Value === Actions.SNOOZE) {
      await snooze(parseInt(messageAttributes.value.Value), config);
    }
  }
};
