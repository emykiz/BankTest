import { Entity, EntityManager } from 'typeorm';
import { Entity } from './Entities';
import * as bcrypt from 'bcryptjs';

@Entities()
export class Transfer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fromAccountId: number;

    @Column()
    toAccountId: number;

    @Column()
    amount: number;

    @Column()
    createdAt: Date;

// A method to perform a transfer
    async performTransfer(fromAccountId: number, toAccountId: number, amount: number) {
        const fromAccount = await getManager().findOne(Account, { id: fromAccountId });
        const toAccount = await getManager().findOne(Account, { id: toAccountId });
        if (!fromAccount || !toAccount) {
            throw new Error("Invalid account ID");
        }
        if (fromAccount.balance < amount) {
            throw new Error("Insufficient balance");
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        await fromAccount.save();
        await toAccount.save();
        const transfer = new Transfer();
        transfer.fromAccountId = fromAccountId;
        transfer.toAccountId = toAccountId;
        transfer.amount = amount;
        transfer.createdAt = new Date();
        await transfer.save();
    }

    async save() {
        return await getManager().save(this);
    }
}