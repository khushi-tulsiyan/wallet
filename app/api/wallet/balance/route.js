import { getSession } from '@auth0/nextjs-auth0';
import { User, Wallet } from '../../../lib/models';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Find user in database
    const user = User.findByAuth0Id(session.user.sub);
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Get wallet balance
    const balance = Wallet.getBalance(user.id);
    
    return Response.json({ balance });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}



