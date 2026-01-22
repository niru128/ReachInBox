import pkg from 'pg';
const { Pool } = pkg;

console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);
const pool = new Pool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT
})



export default pool;