import { persistConfig, Config } from './getConfig';
import { addMinutes } from 'date-fns';

const snooze = async (minutesToSnooze: number, config: Config) => {
  console.log(`snoozing for ${minutesToSnooze}`);
  const snoozeExpiration = addMinutes(new Date(), minutesToSnooze).getTime();
  await persistConfig({ ...config, snoozeExpiration });
};
export default snooze;
