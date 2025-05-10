import { LoginDto } from '../../dtos/auth/login.dto';
import { UserRespository } from '../../repositiries/user.repositry';
import { ApiError } from '../../utils/api-error';
import bcrypt from 'bcryptjs';
import { getPanelVariablesService } from '../forsta/forsta.service';
import { generateOTPService } from '../otp/otp.service';
import { sendEmail } from '../email/email.service';
import { User } from '../../entities/user.entity';
import { FORSTA_PANELLIST } from '../forsta/constants';
import { getJWTToken } from '../../utils/get-jwt-token';
import { OTPRepository } from '../../repositiries/otp.repositry';
import { Purpose } from '../../entities/otps.entity';
import { getOTPEmailContent } from '../../templates/otp-email-content.template';
import { SITE_URL } from '../../constants/common.constants';

const JWT_SECRET = process.env.JWT_LOGIN_SECRET;
const JWT_Expires_In: string = process.env.JWT_LOGIN_EXPIRES_IN || '604800';
const OTP_CONFIG = {
  expiresInMinutes: parseInt(process.env.OTP_EXPIRES || '30', 10),
  digits: parseInt(process.env.OTP_DIGIT || '6', 10),
};

export const loginService = async (loginDto: LoginDto) => {
  if (!JWT_SECRET) {
    throw new Error('JWT Secret required');
  }
  const { email, password } = loginDto;

  const user = await UserRespository.findOne({
    where: { email },
    relations: ['roles', 'roles.permissions', 'permissions'],
  });

  if (!user) {
    throw new ApiError(401, 'invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, 'invalid credentials');
  }

  const isAdmin = user.roles.some((role) => role.name === 'admin');

  if (!isAdmin) {
    throw new ApiError(404, 'User not found');
  }

  // const directPermissions = user.permissions.map(
  //   (permission) => permission.slug
  // );

  // const rolePermissions = user.roles.flatMap((role) =>
  //   role.permissions.map((permission) => permission.slug)
  // );

  // const allPermissions = [...directPermissions, ...rolePermissions];

  // const uniquePermissions = Array.from(new Set(allPermissions));

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    isActive: user.isActive,
    roles: user.roles.map((role) => role.name),
  };

  const token = getJWTToken(user);

  return { token, userInfo: payload };
};

export const WpLoginService = async (loginDto: LoginDto) => {
  if (!JWT_SECRET) throw new Error('JWT Secret required');

  const { email, password } = loginDto;
  const user = await UserRespository.findOne({
    where: { email },
    relations: ['roles', 'roles.permissions', 'permissions'],
  });

  if (!user) throw new ApiError(401, 'Invalid email or password');
  if (!user.isActive)
    throw new ApiError(
      403,
      'Account blocked - too many attempts, Please reset your password to retrieve your account.'
    );

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    user.loginAttempts++;
    const remainingAttempts = 6 - user.loginAttempts;
    await UserRespository.save(user);
    if (user.loginAttempts >= 6) {
      user.isActive = false;
      await UserRespository.save(user);
      throw new ApiError(
        403,
        'Account blocked - too many attempts, Please reset your password to retrieve your account.'
      );
    }
    throw new ApiError(
      401,
      `Invalid credentials, ${remainingAttempts} attempts remaining`
    );
  }

  const isAdmin = user.roles.some((role) => role.name === 'admin');

  if (isAdmin) {
    if (!user.isVerified) {
      user.isVerified = true;
      UserRespository.save(user);
    }
    const token = getJWTToken(user);
    return token;
  }

  await handlePanelistValidation(user);

  const { code, expiresAt } = generateOTPService(OTP_CONFIG);

  let otp = await OTPRepository.findOne({
    where: { email: user.email, purpose: Purpose.LOGIN_VERIFICATION },
  });
  if (otp) {
    (otp.code = code), (otp.expiresAt = expiresAt);
  } else {
    otp = OTPRepository.create({
      code,
      email: user.email,
      purpose: Purpose.LOGIN_VERIFICATION,
      expiresAt,
    });
  }

  await OTPRepository.save(otp);

  const content = getOTPEmailContent({
    title: 'HappyDot.sg Login One-time PIN',
    otpCode: code,
    siteUrl: SITE_URL,
  });
  await sendEmail(user.email, 'HappyDot.sg Login One-time PIN', content);

  const pageUrl = process.env.OTP_VERIFY_PAGE || 'emailotp';
  const redirectUrl = `${pageUrl}?email=${user.email}`;
  return redirectUrl;
};

const handlePanelistValidation = async (user: User) => {
  if (!user.forstaPanelistId) throw new ApiError(400, 'Panelist ID missing');

  const panelStatus = await getPanelVariablesService({
    panelProjectId: process.env.FORSTA_PANEL_ID!,
    userId: Number(user.forstaPanelistId),
    fieldNames: {
      string: [
        FORSTA_PANELLIST.EMAIL,
        FORSTA_PANELLIST.MEMBERSHIP_STATUS,
        FORSTA_PANELLIST.LIFESTYLE_SURVEY_UPDATE_FLAG,
      ],
    },
  });

  const panelVars = panelStatus?.GetPanelVariablesResult?.string;
  if (!panelVars) throw new ApiError(500, 'Invalid panel status response');

  const [_, memberStatus, lifestyleStatus] = panelVars;
  if (memberStatus === '999') {
    await UserRespository.delete(user.id);
    throw new ApiError(400, 'User does not exist');
  }

  user.forstaMemberStatus = memberStatus;
  user.forstaLifestyleStatus = lifestyleStatus;
  await UserRespository.save(user);
};

//   const permissions = [
//     ...new Set([
//       ...user.permissions.map((p) => p.slug),
//       ...user.roles.flatMap((r) => r.permissions.map((p) => p.slug)),
//     ]),
//   ];

//   const payload = {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     isActive: user.isActive,
//     roles: user.roles.map((r) => r.name),
//     permissions,
//   };

//   const token = jwt.sign(
//     { userId: user.id, email: user.email },
//     JWT_SECRET || '',
//     { expiresIn: parseInt(JWT_Expires_In) }
//   );

//   return { token, userInfo: payload };
// };
