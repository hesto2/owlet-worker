import { Context, SNSEvent, ScheduledEvent } from 'aws-lambda';
import checkBaseStation from './checkBaseStation';
import getConfig from './getConfig';
export const handler = async (
  event: ScheduledEvent | SNSEvent,
  _context: Context
) => {
  console.log('event', event);
  const config = await getConfig();
  console.log('config', config);
  await checkBaseStation(config);
};
