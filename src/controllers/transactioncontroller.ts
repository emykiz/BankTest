import { Request, Response } from "express";
import { getConnection } from "typeorm";
const { userService, feedService } = require('../services');
import { AccountService } from "../services/accountservice";
import { TransferService } from "../services/transferservice";



//funding of account
export async function fundAccount(req: Request, res: Response) {
    // Get the account to fund
    const account = await getConnection().getRepository(Account).findOne({
        where: { id: req.params.id },
    });

    if (!account) {
        return res.status(404).send("Account not found");
    }

    // Validate the request
    if (!req.body.amount || isNaN(req.body.amount)) {
        return res.status(400).send("Invalid amount");
    }

    // Fund the account
    account.balance += parseFloat(req.body.amount);
    await getConnection().getRepository(Account).save(account);

    return res.send("Account funded successfully");
}


//Transfering money


export async function transferFunds(req: Request, res: Response) {
    // Get the sender and receiver accounts
    const sender = await getConnection().getRepository(Account).findOne({
        where: { id: req.body.senderId },
    });
    const receiver = await getConnection().getRepository(Account).findOne({
        where: { id: req.body.receiverId },
    });

    if (!sender || !receiver) {
        return res.status(404).send("Account not found");
    }

    // Validate the request
    if (!req.body.amount || isNaN(req.body.amount)) {
        return res.status(400).send("Invalid amount");
    }

    if (sender.balance < req.body.amount) {
        return res.status(400).send("Insufficient funds");
    }

    // Transfer the funds
    sender.balance -= req.body.amount;
    receiver.balance += req.body.amount;
    await getConnection().getRepository(Account).save(sender);
    await getConnection().getRepository(Account).save(receiver);

    return res.send("Funds transferred successfully");
}


//withdrawing money



export async function withdrawMoney(req: Request, res: Response) {
    // Get the account
    const account = await getConnection().getRepository(Account).findOne({
        where: { id: req.params.id },
    });

    if (!account) {
        return res.status(404).send("Account not found");
    }

    // Validate the request
    if (!req.body.amount || isNaN(req.body.amount)) {
        return res.status(400).json
    }
}