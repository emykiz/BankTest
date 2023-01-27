
import { Connection, createConnection } from 'mysql2/promise';

// interface User {
//     id: number;
//     username: string;
//     password: string;
//   }
  export class User {
    id: number;
    username: string;
    password: string;
  
    constructor(id: number, username: string, password: string) {
      this.id = id;
      this.username = username;
      this.password = password;
    }
  
    static async create(username: string, password: string) {
      // Insert a new user into the 'users' table
      const result = await connection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password]
      );
  
      return new User(result.insertId, username, password);
    }
}

  

  export class UserService {
    private connection: Connection;
  
    constructor() {
      this.connection = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bank',
      });
    }
  
    async create(username: string, plaintextPassword: string): Promise<User> {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
      const [result] = await this.connection.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
  
      return {
        id: result.insertId,
        username,
      };
    }
  
    async findByUsername(username: string): Promise<User> {
      const [[user]] = await this.connection.execute('SELECT * FROM users WHERE username = ?', [username]);
      return {
        id: user.id,
        username: user.username,
        password: user.password,
      };
    }
  
    async login(username: string, plaintextPassword: string): Promise<User> {
      const user = await this.findByUsername(username);
      const isValid = await bcrypt.compare(plaintextPassword, user.password);
  
      if (!isValid) {
        throw new Error('Invalid username or password');
      }
  
      return user;
    }
  }