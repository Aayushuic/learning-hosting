import { OTPConfig } from './types';

export const generateOTPService = (config: {
  digits: number;
  expiresInMinutes: number;
}): { code: string; expiresAt: Date } => {
  const min = Math.pow(10, config.digits - 1);
  const max = Math.pow(10, config.digits) - 1;
  return {
    code: Math.floor(min + Math.random() * (max - min)).toString(),
    expiresAt: new Date(Date.now() + config.expiresInMinutes * 60 * 1000),
  };
};

export const verifyOTPService = (
  userOTP: string,
  storedOTP: string,
  expiresAt: Date
): boolean => {
  return userOTP === storedOTP && new Date() < expiresAt;
};
