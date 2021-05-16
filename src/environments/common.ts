import { security } from '../../securitykeys';

export const common = {
  loginPath: 'login',
  registerPath: 'register-user',
  resetPasswordInit: 'reset-password/init',
  mail:'chollohookaenterprise@gmail.com',
  resetPasswordFinish: 'reset-password/finish',
  ...security,
};
