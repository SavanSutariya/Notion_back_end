import pkg from "pg";
const { Pool } = pkg;
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notion_db",
  password: "savan",
  port: 5432,
});
