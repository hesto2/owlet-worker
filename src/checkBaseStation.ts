import {
  getDevices,
  getDeviceAsSmartSock,
  setBaseStationOn,
} from 'owlet-client';
import axios from 'axios';
import getAuthToken from './getAuthToken';
import { Config } from './getConfig';
import snooze from './snooze';
const notificationUrl = process.env.NOTIFICATION_URL;

const checkBaseStation = async (config: Config) => {
  console.log('checking base station');
  try {
    const token = await getAuthToken(config);
    const devices = await getDevices(token);
    const sock = await getDeviceAsSmartSock(devices[0].device.dsn, token);
    if (
      (sock.chargeStatus === 0 && (sock.baseStationOn as any) !== 1) ||
      true
    ) {
      await setBaseStationOn(true, sock, token);
      await snooze(180, config);
      const messageResult = await axios.post(notificationUrl, {
        channel: 'mini-teammate',
        message: `Turned on the base station automatically`,
        actions: {
          senderId: 'owlet-worker',
          actionId: 'snooze',
          actions: [
            { value: '610', displayValue: '6 Hours' },
            { value: '1220', displayValue: '12 Hours' },
            { value: '1440', displayValue: '24 Hours' },
          ],
        },
      });
      console.log(messageResult);
    }
  } catch (err) {
    console.error(err?.response?.data?.data || err);
    if (notificationUrl) {
      await axios.post(notificationUrl, {
        channel: 'lambda-errors',
        message: `Owlet Worker failed: ${err?.data || err}`,
      });
    }
  }
};

export default checkBaseStation;
