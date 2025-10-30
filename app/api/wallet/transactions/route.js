import { getSession } from '@auth0/nextjs-auth0';
import { User, Transaction } from '../../../lib/models';
import db from '../../../lib/database';

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

    // Get transactions for user
    const stmt = db.prepare(`
      SELECT * FROM transactions 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 50
    `);
    const transactions = stmt.all(user.id);
    
    return Response.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
