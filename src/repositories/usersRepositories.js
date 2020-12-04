const pool = require("../database/dbconfig");
const bcrypt = require('bcrypt');
async function findEmail(email) {
    const query = await pool.query(`SELECT * FROM "Users" WHERE email = $1`, [email]);
    return query.rows[0];
  }

async function create(userParams) {
    const { email, username } = userParams;
    const password = bcrypt.hashSync(userParams.password,10);
    const insertedUser = await pool.query(`INSERT INTO "Users" (name,email,password) VALUES ($1,$2,$3) RETURNING *`,[username,email,password]);

    return insertedUser.rows[0];
}
async function findById(userId){
  const user = await pool.query(`SELECT * FROM "Users" WHERE "id" = $1`,[userId]);
  return user;
}
module.exports = { findEmail, create };