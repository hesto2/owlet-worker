import { Context } from 'aws-lambda';
import checkBaseStation from './checkBaseStation';
export const handler = async (_event: unknown, _context: Context) => {
  checkBaseStation();
};
