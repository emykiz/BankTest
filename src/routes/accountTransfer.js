// Account routes
const router = require("express").Router();
const app = express();
import {AccountService} from '../controllers/accountTransfer'
import {userService} from '../controllers/user'

app.post('/account', async (req, res) => {
    try {
      const { userId } = req.body;
      const account = await AccountService.create(userId);
      res.status(201).json(account);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.post('/account/deposit', async (req, res) => {
    try {
      const { userId, amount } = req.body;
      const account = await AccountService.deposit(userId, amount);
      res.status(200).json(account);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.post('/account/withdraw', async (req, res) => {
    try {
      const { userId, amount } = req.body;
      const account = await AccountService.withdraw(userId, amount);
      res.status(200).json(account);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.post('/account/transfer', async (req, res) => {
    try {
      const { fromUserId, toUserId, amount } = req.body;
      await AccountService.transfer(fromUserId, toUserId, amount);
      res.sendStatus(200);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = app;
