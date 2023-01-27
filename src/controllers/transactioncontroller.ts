
import { Request, Response } from 'express';
import { TransferService } from '../services/transfer.service';
import { AccountService } from '../services/account.service';

export class TransferController {

  private transferService = new TransferService();
  private accountService = new AccountService();
  private userService = new UserService();


  async fundAccount(req: Request, res: Response): Promise<Response> {
    const { userId, amount } = req.body;
    try {
      const { userId, amount } = req.body;
      const account = await this.userService.fundAccount(userId, amount);
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
