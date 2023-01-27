import mysql from 'mysql2/promise';

export const connection = mysql.createConnection({
  host: 'YOUR_HOSTNAME',
  user: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  database: 'YOUR_DATABASE_NAME'
});
