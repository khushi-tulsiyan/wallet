import { handleAuth, handleLogin, handleCallback, handleLogout, handleProfile } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      prompt: 'login',
    },
  }),
  logout: handleLogout({
    returnTo: '/',
  }),
  callback: handleCallback({
    afterCallback: async (req, res, session) => {
      // This will be called after successful authentication
      return session;
    },
  }),
  profile: handleProfile(),
});


