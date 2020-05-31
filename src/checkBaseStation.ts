import {
  getDevices,
  getDeviceAsSmartSock,
  setBaseStationOn,
} from 'owlet-client';
import axios from 'axios';
import getAuthToken from './getAuthToken';
import { Config } from './getConfig';
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
      const messageResult = await axios.post(notificationUrl, {
        channel: 'mini-teammate',
        message: `Turned on the base station automatically`,
        actions: {
          senderId: 'owlet-worker',
          actionId: 'snooze',
          actions: [
            { value: '60', displayValue: '1 Hour' },
            { value: '120', displayValue: '2 Hours' },
            { value: '180', displayValue: '3 Hours' },
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
