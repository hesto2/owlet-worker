import {
  getDevices,
  getDeviceAsSmartSock,
  setBaseStationOn,
} from 'owlet-client';
import axios from 'axios';
import getAuthToken from './getAuthToken';
const notificationUrl = process.env.NOTIFICATION_URL;

const checkBaseStation = async () => {
  try {
    const token = await getAuthToken();
    const devices = await getDevices(token);
    const sock = await getDeviceAsSmartSock(devices[0].device.dsn, token);
    if (sock.chargeStatus === 0) {
      await setBaseStationOn(true, sock, token);
      await axios.post(notificationUrl, {
        channel: 'mini-teammate',
        message: `Turned on the base station automatically`,
      });
    }
  } catch (err) {
    console.error(err);
    if (notificationUrl) {
      await axios.post(notificationUrl, {
        channel: 'lambda-errors',
        message: `Owlet Worker failed: ${err}`,
      });
    }
  }
};

export default checkBaseStation;
