import { pool } from "./database.js";
export const getUser = async (user_id = null) => {
  if (user_id) {
    let result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    return result.rows;
  }
  let result = await pool.query("SELECT * FROM users");
  return result.rows;
};
export const createUser = async (username, email, password) => {
  let result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows;
};
export const updateUser = async (user_id, username, email, password) => {
  let result = await pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *",
    [username, email, password, user_id]
  );
  return result.rows;
};
export const deleteUser = async (user_id) => {
  let result = await pool.query("DELETE FROM users WHERE user_id = $1", [
    user_id,
  ]);
  return result.rows;
};
