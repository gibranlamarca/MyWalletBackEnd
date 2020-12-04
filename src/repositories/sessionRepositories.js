const uuid = require('uuid');
const pool = require("../database/dbconfig");
async function createSession(UserId){
    const token = uuid.v4();
    console.log(UserId)
    console.log(token);
    const session = await pool.query(`INSERT INTO "Sessions" ("UserId","Token") VALUES ($1,$2) RETURNING *`,[UserId,token]);
    console.log(session.rows)
    return session.rows[0];
}
async function findByToken(token){
    const session = await pool.query(`SELECT * FROM "Sessions" WHERE "Token" = $1 `,[token]);
    return session.rows[0];
}

module.exports = { createSession, findByToken };