import { Request, Response } from 'express';
import {
  loginService,
  WpLoginService,
} from '../../services/auth/login.service';
import { loginOtpVerificationService } from '../../services/auth/login-otp-verification.service';
import { Purpose } from '../../entities/otps.entity';

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;
  const data = await loginService({ email, password });

  res.status(200).json({ message: 'Login successful', data, success: true });
  return;
};

export const WpLoginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  const redirectUrl = await WpLoginService({ email, password });

  return res
    .status(200)
    .json({ message: 'otp send successfully', success: true, redirectUrl });
};

export const wpLoginVerficationController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, code } = req.body;

  const data = await loginOtpVerificationService({
    purpose: Purpose.LOGIN_VERIFICATION,
    email: email,
    code: code,
  });

  return res
    .status(200)
    .json({ success: true, message: 'login successfully', data });
};
