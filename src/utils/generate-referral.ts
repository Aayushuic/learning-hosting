import { v4 as uuidv4 } from 'uuid';

export const generateReferralCode = (
  prefix: string = 'REF',
  length: number = 6
): string => {
  const uuid = uuidv4().replace(/-/g, '');
  const randomPart = uuid.slice(0, length).toUpperCase();
  return `${prefix}${randomPart}`;
};
