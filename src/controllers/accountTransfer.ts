// import bcrypt from 'bcrypt';
const httpStatus = require('http-status');
import { Connection, createConnection } from 'mysql2/promise';

interface Account {
    id: number;
    userId: number;
    balance: number;
  }
  
  
  
 export class AccountService {
    private connection: Connection;
  
    constructor() {
      this.connection = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bank',
      });
    }
  
    async create(userId: number): Promise<Account> {
      const [result] = await this.connection.execute('INSERT INTO accounts (userId, balance) VAL [userId, 0]'
      );
  
      return {
        id: result.insertId,
        userId,
        balance: 0,
      };
    }
  
    async findByUserId(userId: number): Promise<Account> {
      const [[account]] = await this.connection.execute('SELECT * FROM accounts WHERE userId = ?', [userId]);
      return {
        id: account.id,
        userId: account.userId,
        balance: account.balance,
      };
    }
  
    async deposit(userId: number, amount: number): Promise<Account> {
      const account = await this.findByUserId(userId);
      const newBalance = account.balance + amount;
      await this.connection.execute('UPDATE accounts SET balance = ? WHERE id = ?', [newBalance, account.id]);
      return {
        ...account,
        balance: newBalance,
      };
    }
  
    async withdraw(userId: number, amount: number): Promise<Account> {
      const account = await this.findByUserId(userId);
      if (account.balance < amount) {
        throw new Error('Insufficient funds');
      }
      const newBalance = account.balance - amount;
      await this.connection.execute('UPDATE accounts SET balance = ? WHERE id = ?',
      [newBalance, account.id]
      );
      return {
        ...account,
        balance: newBalance,
      };
    }
  
    async transfer(fromUserId: number, toUserId: number, amount: number): Promise<void> {
      const fromAccount = await this.withdraw(fromUserId, amount);
      const toAccount = await this.deposit(toUserId, amount);
    }
  }