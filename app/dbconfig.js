import mysql from "promise-mysql";
const config={
    user: 'root',
    password: '',
    server: 'localhost',
    database: 'integrador'
}

export const conn = await mysql.createConnection(config);