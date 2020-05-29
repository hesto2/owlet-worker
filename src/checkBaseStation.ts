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
    console.log('getting token');
    const token = await getAuthToken();
    const devices = await getDevices(token);
    const sock = await getDeviceAsSmartSock(devices[0].device.dsn, token);
    console.log('got sock');
    if (sock.chargeStatus === 0 && (sock.baseStationOn as any) !== 1) {
      console.log('turning on base station');
      await setBaseStationOn(true, sock, token);
      await axios.post(notificationUrl, {
        channel: 'mini-teammate',
        message: `Turned on the base station automatically`,
      });
    }
    console.log('done');
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
