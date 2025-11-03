import { getSession } from '@auth0/nextjs-auth0';
import { join } from 'path';
import { createRequire } from 'module';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
      const modelsPath = join(process.cwd(), 'lib', 'models.js');
      const requireFunc = typeof require !== 'undefined' ? require : createRequire(import.meta.url);
      const models = requireFunc(modelsPath);
      const { User } = models;

      const userData = {
        auth0Id: session.user.sub,
        email: session.user.email || '',
        name: session.user.name || '',
        picture: session.user.picture || ''
      };

      const user = User.findOrCreate(userData);
      
      return Response.json({ 
        user: {
          id: user.id,
          auth0Id: user.auth0_id,
          email: user.email,
          name: user.name,
          picture: user.picture
        }
      });
    } catch (dbError) {
      
      console.error('Database error in /api/auth/me:', dbError);
      return Response.json({ 
        user: {
          auth0Id: session.user.sub,
          email: session.user.email,
          name: session.user.name,
          picture: session.user.picture
        }
      });
    }
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return Response.json({ 
      error: 'Internal server error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
