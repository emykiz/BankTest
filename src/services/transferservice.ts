import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/accountentity';
import { Transfer } from '../entities/transferentity';
import { User } from '../entities/transferentity';
import { Connection, Repository } from "typeorm";


@Injectable()
export class TransferService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Transfer)
        private readonly transferRepository: Repository<Transfer>,
    ) { }
    // private accountRepository: Repository<Account>;
    // constructor(connection: Connection) {
    //     this.accountRepository = connection.getRepository(Account);
    // }
    // private transferRepository: Repository<Transfer>;
    // constructor(connection: Connection) {
    //     this.transferRepository = connection.getRepository(Transfer);
    // }
    async transfer(senderId: number, receiverId: number, amount: number): Promise<void> {
        // Check if sender account exists
        const sender = await this.accountRepository.findOne({ where: { id: senderId } });
        if (!sender) {
            throw new Error(`Sender account with id ${senderId} not found`);
        }

        // Check if receiver account exists
        const receiver = await this.accountRepository.findOne({ where: { id: receiverId } });
        if (!receiver) {
            throw new Error(`Receiver account with id ${receiverId} not found`);
        }

        // Check if sender has sufficient balance
        if (sender.balance < amount) {
            throw new Error(`Sender account has insufficient balance`);
        }

        // Create a new transfer record
        const transfer = new Transfer();
        transfer.senderId = senderId;
        transfer.receiverId = receiverId;
        transfer.amount = amount;

        // Update sender and receiver account balances
        sender.balance -= amount;
        receiver.balance += amount;

        // Save transfer and account updates to the database
        await this.transferRepository.save(transfer);
        await this.accountRepository.save(sender);
        await this.accountRepository.save(receiver);
    }
}
