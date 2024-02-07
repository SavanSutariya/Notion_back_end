import { pool } from "./database.js";
import { getUser } from "./user.js";
import { getTags, createNotionTag } from "./tags.js";

const attachUserToNotions = async (notions) => {
  await Promise.all(
    notions.map(async (notion) => {
      try {
        const user = await getUser(notion.user_id);
        notion.user = user[0];
      } catch (error) {
        console.error(
          `Error attaching user to notion ${notion.notion_id}:`,
          error
        );
        notion.user = null;
      }
    })
  );
};
const attachTagsToNotions = async (notions) => {
  await Promise.all(
    notions.map(async (notion) => {
      try {
        const tags = await getTags(notion.notion_id);
        notion.tags = tags;
      } catch (error) {
        console.error(
          `Error attaching tags to notion ${notion.notion_id}:`,
          error
        );
        notion.tags = [];
      }
    })
  );
};

export const getNotion = async (notion_id = null) => {
  let query, queryParams;

  if (notion_id) {
    query = "SELECT * FROM notions WHERE notion_id = $1";
    queryParams = [notion_id];
  } else {
    query = "SELECT * FROM notions";
    queryParams = [];
  }

  try {
    const { rows } = await pool.query(query, queryParams);
    await attachUserToNotions(rows);
    await attachTagsToNotions(rows);
    return rows;
  } catch (error) {
    console.error("Error fetching notions:", error);
    throw error;
  }
};

export const createNotion = async (title, content, category, user_id, tags) => {
  const query =
    "INSERT INTO notions (title, content, category, created_by) VALUES ($1, $2, $3, $4) RETURNING *";
  const queryParams = [title, content, category, user_id];
  try {
    const { rows } = await pool.query(query, queryParams);
    const notion = rows[0];
    // tag is an array of tag ids
    if (tags) {
      await Promise.all(
        tags.map(async (tag_id) => {
          try {
            await createNotionTag(notion.notion_id, tag_id);
          } catch (error) {
            console.error(
              `Error attaching tag ${tag_id} to notion ${notion.notion_id}:`,
              error
            );
          }
        })
      );
    }
    return rows;
  } catch (error) {
    console.error("Error creating notion:", error);
    throw error;
  }
};

export const updateNotion = async (notion_id, title, content, category) => {
  const query =
    "UPDATE notions SET title = $1, content = $2, category = $3 WHERE notion_id = $4 RETURNING *";
  const queryParams = [title, content, category, notion_id];

  try {
    const { rows } = await pool.query(query, queryParams);
    return rows;
  } catch (error) {
    console.error("Error updating notion:", error);
    throw error;
  }
};

export const deleteNotion = async (notion_id) => {
  const query = "DELETE FROM notions WHERE notion_id = $1 RETURNING *";
  const queryParams = [notion_id];

  try {
    const { rows } = await pool.query(query, queryParams);
    return rows;
  } catch (error) {
    console.error("Error deleting notion:", error);
    throw error;
  }
};
