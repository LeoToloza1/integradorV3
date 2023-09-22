import mysql from "promise-mysql";
const config={
    host: 'mysql-leotoloza.alwaysdata.net',
    port: 3306,
    user: 'leotoloza',
    password: 'LeonelSantiagoToloza113346',
    database: 'leotoloza_web'
};

export const conn = await mysql.createConnection(config);