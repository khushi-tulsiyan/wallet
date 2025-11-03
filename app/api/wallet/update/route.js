import { join } from 'path';
import { createRequire } from 'module';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const modelsPath = join(process.cwd(), 'lib', 'models.js');
    const dbPath = join(process.cwd(), 'lib', 'database.js');
    const requireFunc = typeof require !== 'undefined' ? require : createRequire(import.meta.url);
    const models = requireFunc(modelsPath);
    const db = requireFunc(dbPath);
    const { User, Wallet, Transaction } = models;

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return Response.json({ error: 'Missing payment parameters' }, { status: 400 });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const transaction = Transaction.findByPaymentId(razorpay_payment_id);
    
    if (!transaction) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    if (transaction.status === 'completed') {
      return Response.json({ error: 'Transaction already processed' }, { status: 400 });
    }

    const updateStmt = db.prepare(`
      UPDATE transactions 
      SET status = ?, razorpay_payment_id = ?
      WHERE id = ?
    `);
    updateStmt.run('completed', razorpay_payment_id, transaction.id);

    Wallet.updateBalance(transaction.user_id, transaction.amount);

    const newBalance = Wallet.getBalance(transaction.user_id);

    return Response.json({
      success: true,
      message: 'Payment successful',
      balance: newBalance
    });
  } catch (error) {
    console.error('Error updating wallet:', error);
    console.error('Error stack:', error.stack);
    return Response.json({ 
      error: 'Internal server error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
