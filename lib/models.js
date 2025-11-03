const db = require('./database');

const Wallet = {
  findByUserId: (userId) => {
    const stmt = db.prepare('SELECT * FROM wallets WHERE user_id = ?');
    return stmt.get(userId);
  },

  create: (userId) => {
    const stmt = db.prepare('INSERT INTO wallets (user_id, balance) VALUES (?, 0.00)');
    return stmt.run(userId);
  },

  updateBalance: (userId, amount) => {
    const stmt = db.prepare(`
      UPDATE wallets 
      SET balance = balance + ?, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `);
    return stmt.run(amount, userId);
  },

  getBalance: (userId) => {
    const stmt = db.prepare('SELECT balance FROM wallets WHERE user_id = ?');
    const result = stmt.get(userId);
    return result ? result.balance : 0;
  }
};

const User = {
  findByAuth0Id: (auth0Id) => {
    const stmt = db.prepare('SELECT * FROM users WHERE auth0_id = ?');
    return stmt.get(auth0Id);
  },

  create: (userData) => {
    const stmt = db.prepare(`
      INSERT INTO users (auth0_id, email, name, picture)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(userData.auth0Id, userData.email, userData.name, userData.picture);
    return result.lastInsertRowid;
  },

  update: (auth0Id, userData) => {
    const stmt = db.prepare(`
      UPDATE users 
      SET email = ?, name = ?, picture = ?, updated_at = CURRENT_TIMESTAMP
      WHERE auth0_id = ?
    `);
    return stmt.run(userData.email, userData.name, userData.picture, auth0Id);
  },

  findOrCreate: (userData) => {
    let user = User.findByAuth0Id(userData.auth0Id);
    
    if (!user) {
      const userId = User.create(userData);
      
      Wallet.create(userId);
      
      user = User.findByAuth0Id(userData.auth0Id);
    } else {
      User.update(userData.auth0Id, userData);
      
      user = User.findByAuth0Id(userData.auth0Id);
    }
    
    return user;
  }
};


const Transaction = {
  create: (transactionData) => {
    const stmt = db.prepare(`
      INSERT INTO transactions (user_id, wallet_id, amount, type, description, razorpay_payment_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      transactionData.userId,
      transactionData.walletId,
      transactionData.amount,
      transactionData.type,
      transactionData.description,
      transactionData.razorpayPaymentId,
      transactionData.status
    );
  },

  updateStatus: (paymentId, status) => {
    const stmt = db.prepare('UPDATE transactions SET status = ? WHERE razorpay_payment_id = ?');
    return stmt.run(status, paymentId);
  },

  findByPaymentId: (paymentId) => {
    const stmt = db.prepare('SELECT * FROM transactions WHERE razorpay_payment_id = ?');
    return stmt.get(paymentId);
  }
};

module.exports = { User, Wallet, Transaction };


