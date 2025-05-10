import express from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { LoginDto } from '../dtos/auth/login.dto';
import {
  loginController,
  WpLoginController,
  wpLoginVerficationController,
} from '../controllers/auth/login.controller';
import { wrapAsync } from '../utils/wrap-async';
import {
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
} from '../controllers/auth';
import { ForgotPasswordDto } from '../dtos/auth/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/auth/reset-password.dto';
import isAuthenticated from '../middlewares/authenticate';
import { ChangePasswordDto } from '../dtos/auth/change-password.dto';
import { RegisterDto } from '../dtos/auth/register.dto';
import { wpRegisterController } from '../controllers/auth/register.controller';
import { OTPVerifyDto } from '../dtos/auth/otp-verify.dto';
import { ResendOtp } from '../dtos/auth/resend-otp.dto';
import { resendOtpController } from '../controllers/auth/resend-otp.controller';
const router = express.Router();

router.post('/login', validateRequest(LoginDto), wrapAsync(loginController));
router.post(
  '/wp-login',
  validateRequest(LoginDto),
  wrapAsync(WpLoginController)
);

router.post(
  '/otp/verify-login',
  validateRequest(OTPVerifyDto),
  wrapAsync(wpLoginVerficationController)
);

router.post(
  '/otp/resend',
  validateRequest(ResendOtp),
  wrapAsync(resendOtpController)
);

router.post(
  '/register',
  validateRequest(RegisterDto),
  wrapAsync(wpRegisterController)
);

router.post(
  '/reset-password',
  validateRequest(ResetPasswordDto),
  wrapAsync(resetPasswordController)
);

router.post(
  '/forgot-password',
  validateRequest(ForgotPasswordDto),
  wrapAsync(forgotPasswordController)
);

router.post(
  '/change-password',
  isAuthenticated,
  validateRequest(ChangePasswordDto),
  wrapAsync(changePasswordController)
);

export default router;
