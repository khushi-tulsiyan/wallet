import { User, Wallet, Transaction } from '../../../lib/models';
import db from '../../../lib/database';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return Response.json({ error: 'Missing payment parameters' }, { status: 400 });
    }

    // Verify the signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Find transaction by payment ID
    const transaction = Transaction.findByPaymentId(razorpay_payment_id);
    
    if (!transaction) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    if (transaction.status === 'completed') {
      return Response.json({ error: 'Transaction already processed' }, { status: 400 });
    }

    // Update transaction status and add payment ID
    const updateStmt = db.prepare(`
      UPDATE transactions 
      SET status = ?, razorpay_payment_id = ?
      WHERE id = ?
    `);
    updateStmt.run('completed', razorpay_payment_id, transaction.id);

    // Update wallet balance
    Wallet.updateBalance(transaction.user_id, transaction.amount);

    // Get updated balance
    const newBalance = Wallet.getBalance(transaction.user_id);

    return Response.json({
      success: true,
      message: 'Payment successful',
      balance: newBalance
    });
  } catch (error) {
    console.error('Error updating wallet:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
