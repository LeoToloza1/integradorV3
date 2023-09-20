import mysql from "promise-mysql";
const config={
    user: 'root',
    password: '',
    server: 'localhost',
    database: 'integrador'
}

export const con = await mysql.createConnection(config);