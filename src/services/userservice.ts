import { User } from '../entities/userentity';
import { Connection, Repository } from 'typeorm';
import { createConnection, getConnection } from '../utils/database';

export class UserService {
    private userRepo: Repository<User>;

    constructor() {
        createConnection().then(() => {
            this.userRepo = getConnection().getRepository(User);
        });
    }

    async createUser(user: User): Promise<User> {
        return this.userRepo.save(user);
    }

    async getUserById(id: number): Promise<User | undefined> {
        return this.userRepo.findOne(id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepo.find();
    }

    async updateUser(id: number, updatedUser: User): Promise<User | undefined> {
        const user = await this.userRepo.findOne(id);
        if (!user) {
            return undefined;
        }
        await this.userRepo.update(id, updatedUser);
        return this.userRepo.findOne(id);
    }

    async deleteUser(id: number): Promise<boolean> {
        const user = await this.userRepo.findOne(id);
        if (!user) {
            return false;
        }
        await this.userRepo.delete(id);
        return true;
    }
}
