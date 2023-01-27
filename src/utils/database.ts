import * as mysql from 'mysql2/promise';

export class Database {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'mydb',
    });
  }

  async query(sql: string, params?: any[]) {
    try {
      const [rows] = await this.connection.query(sql, params);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async close() {
    await this.connection.end();
  }
}
