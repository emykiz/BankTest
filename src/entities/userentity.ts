import { Entity, EntityManager } from 'typeorm';
// import { Entity } from './Entities';
import * as bcrypt from 'bcryptjs';

export class User extends Entities {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: any) {
        super();
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    async create() {
        try {
            const hash = await bcrypt.hash(this.password, 10);
            this.password = hash;
            const result = await this.db.query(
                'INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?,?,?,?,?)',
                [this.username, this.email, this.password, this.createdAt, this.updatedAt]
            );
            this.id = result.insertId;
            return this;
        } catch (error) {
            throw error;
        }
    }
}

