import mysql from "promise-mysql";
const config={
    host: 'mysql-leotoloza.alwaysdata.net',
    user: 'leotoloza',
    password: 'LeonelSantiagoToloza113346',
    database: 'leotoloza_web'
};
try {
    const conn = await mysql.createConnection(config);
    console.log('Conexión a la base de datos exitosa');
    await conn.end();
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}
export const conn = await mysql.createConnection(config);