import { Connection, Repository } from "typeorm";
import { Account } from "../entities/accountentity";

export class AccountService {
private accountRepository: Repository<Account>;
constructor(connection: Connection) {
    this.accountRepository = connection.getRepository(Account);
}

async createAccount(userId: number, initialBalance: number): Promise<Account> {
    const account = new Account();
    account.userId = userId;
    account.balance = initialBalance;

    return await this.accountRepository.save(account);
}

async getAccount(userId: number): Promise<Account | undefined> {
    return await this.accountRepository.findOne({ where: { userId } });
}

async updateBalance(userId: number, newBalance: number): Promise<void> {
    await this.accountRepository.update({ userId }, { balance: newBalance });
}
}