import { security } from '../../securitykeys';

export const common = {
  loginPath: 'login',
  registerPath: 'register-user',
  resetPasswordInit: 'reset-password/init',
  resetPasswordFinish: 'reset-password/finish',
  ...security,
};
