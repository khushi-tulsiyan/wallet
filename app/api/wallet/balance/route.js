import { getSession } from '@auth0/nextjs-auth0';
import { join } from 'path';
import { createRequire } from 'module';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const modelsPath = join(process.cwd(), 'lib', 'models.js');
    const requireFunc = typeof require !== 'undefined' ? require : createRequire(import.meta.url);
    const models = requireFunc(modelsPath);
    const { User, Wallet } = models;

    const user = User.findByAuth0Id(session.user.sub);
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const balance = Wallet.getBalance(user.id);
    
    return Response.json({ balance });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    console.error('Error stack:', error.stack);
    return Response.json({ 
      error: 'Internal server error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
