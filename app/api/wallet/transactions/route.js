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
    const dbPath = join(process.cwd(), 'lib', 'database.js');
    const requireFunc = typeof require !== 'undefined' ? require : createRequire(import.meta.url);
    const models = requireFunc(modelsPath);
    const db = requireFunc(dbPath);
    const { User } = models;

    const user = User.findByAuth0Id(session.user.sub);
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

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
    console.error('Error stack:', error.stack);
    return Response.json({ 
      error: 'Internal server error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
