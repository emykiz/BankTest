
import { Request, Response } from 'express';
import { TransferService } from '../services/transferservice';
import { AccountService } from '../services/accountservice';
import { UserService } from '../services/userservice';
import { connection } from 'mongoose';

export class TransferController {

  private transferService = new TransferService(connection,  Promise<Account>);
  private accountService = new AccountService(connection);
  private userService = new UserService();


  async fundAccount(req: Request, res: Response): Promise<Response> {
    const { userId, recieverId, amount } = req.body;
    try {
      const { userId, recieverId, amount } = req.body;
      const account = await this.transferService.transfer(userId, recieverId, amount);
      return res.status(200).json({ data: account });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


  async transfer(req: Request, res: Response) {
    const { fromAccountId, toAccountId, amount } = req.body;
    try {
      const fromAccount = await this.accountService.getAccount(fromAccountId);
      if (fromAccount.balance < amount) {
        throw new Error('Insufficient balance');
      }
      await this.transferService.transfer(fromAccountId, toAccountId, amount);
      res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async withdraw(req: Request, res: Response) {
    const { accountId, amount } = req.body;
    try {
      const account = await this.accountService.getAccount(accountId);
      if (account.balance < amount) {
        throw new Error('Insufficient balance');
      }
      await this.accountService.withdraw(accountId, amount);
      res.status(200).json({ message: 'Withdrawal successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

