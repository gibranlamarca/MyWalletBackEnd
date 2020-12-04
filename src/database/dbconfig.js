const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'MyWallet',
    password: '79513585',
})

module.exports = pool;