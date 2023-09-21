import mysql from "promise-mysql";
const config={
    user: 'leotoloza',
    password: 'rIYDWw6EFC7JW1Y2yDlSSVU1oekKSCYm',
    server: 'dpg-ck4bc0k2kpls73dh11c0-a',
    database: 'integrador_ytda'
}

export const conn = await mysql.createConnection(config);