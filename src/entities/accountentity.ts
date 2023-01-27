import { Entity, EntityManager } from 'typeorm';
import { Entity } from './Entities';
import * as bcrypt from 'bcryptjs';


@Entities()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    balance: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

// A method to update the account balance
    async updateBalance(amount: number) {
        this.balance += amount;
        await this.save();
    }

    async save() {
        return await getManager().save(this);
    }

}


