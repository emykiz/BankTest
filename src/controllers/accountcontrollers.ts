import { Request, Response } from 'express';
import { Account } from '../entities/Account';

export class AccountController {
  static async createAccount(req: Request, res: Response) {
    try {
      // validate the request body
      const { userId, balance } = req.body;
      if (!userId || !balance) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      // create a new Account object
      const account = new Account();
      account.userId = userId;
      account.balance = balance;

      // save the account to the database
      await account.save();

      // return the created account
      return res.status(201).json({ account });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
