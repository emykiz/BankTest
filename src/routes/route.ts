// routes.ts
import express from 'express';
import { UserController } from '../controllers/usercontrollers';
import { transactionController } from '../controllers/transactioncontroller';
import { accountController } from '../controllers/accountcontrollers';

const router = express.Router();

router.post('/users', UserController.createUser);
router.post('/users/:id/transfer', transactionController.transfer);
router.post('/users/:id/withdraw', transactionController.withdraw);
router.post('/users/:id/fundAccount', transactionController.fundAccount);
router.post('/createaccount', accountController.createAccount);
