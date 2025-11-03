import { handleAuth, handleLogin, handleCallback, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      prompt: 'login',
    },
    returnTo: '/dashboard',
  }),
  logout: handleLogout({
    returnTo: '/',
  }),
  callback: handleCallback({
    afterCallback: async (req, res, session) => {
      if (session?.user) {
        try {
          const { createRequire } = await import('module');
          const { join } = await import('path');
          const require = createRequire(import.meta.url);
          const { User } = require(join(process.cwd(), 'lib', 'models.js'));
          
          const userData = {
            auth0Id: session.user.sub,
            email: session.user.email || '',
            name: session.user.name || '',
            picture: session.user.picture || ''
          };
          
          User.findOrCreate(userData);
        } catch (error) {
          console.error('Error syncing user to database:', error);
        }
      }
      return session;
    },
  }),
});


