import { getSession } from '@auth0/nextjs-auth0';
import { User } from '../../../lib/models';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Find or create user in database
    const userData = {
      auth0Id: session.user.sub,
      email: session.user.email,
      name: session.user.name,
      picture: session.user.picture
    };

    const user = await User.findOrCreate(userData);
    
    return Response.json({ 
      user: {
        id: user.id,
        auth0Id: user.auth0_id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}


