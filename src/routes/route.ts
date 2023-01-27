// routes.ts
import express from 'express';
import { UserController } from '../controllers/usercontrollers';
import { TransferController } from '../controllers/transactioncontroller';
import { AccountController } from '../controllers/accountcontrollers';

const router = express.Router();

router.post('/users', UserController.createUser);
router.post('/users/:id/transfer', TransferController.transfer);
router.post('/users/:id/withdraw', TransferController.withdraw);
router.post('/users/:id/fundAccount', TransferController.fundAccount);
router.post('/createaccount', AccountController.createAccount);
