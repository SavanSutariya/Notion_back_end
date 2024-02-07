import { pool } from "./database.js";

export const getTags = async (post_id) => {
  let result = await pool.query(
    "SELECT tags.tag_name FROM tags JOIN notion_tags ON tags.tag_id = notion_tags.tag_id WHERE notion_tags.notion_id = $1",
    [post_id]
  );
  let tags = [];
  for (let row of result.rows) {
    tags.push(row.tag_name);
  }
  return tags;
};

export const createTags = async (tag_name) => {
  let result = await pool.query(
    "INSERT INTO tags (tag_name) VALUES ($1) RETURNING *",
    [tag_name]
  );
  return result.rows;
};

export const deleteTag = async (tag_id) => {
  let result = await pool.query("DELETE FROM tags WHERE tag_id = $1", [tag_id]);
  return result.rows;
};

export const createNotionTag = async (notion_id, tag_id) => {
  let result = await pool.query(
    "INSERT INTO notion_tags (notion_id, tag_id) VALUES ($1, $2) RETURNING *",
    [notion_id, tag_id]
  );
  return result.rows;
};

export const deleteNotionTag = async (notion_id, tag_id) => {
  let result = await pool.query(
    "DELETE FROM notion_tags WHERE notion_id = $1 AND tag_id = $2",
    [notion_id, tag_id]
  );
  return result.rows;
};
