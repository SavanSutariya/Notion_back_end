import express from "express";
import bodyParser from "body-parser";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./database/user.js";
import {
  getNotion,
  createNotion,
  updateNotion,
  deleteNotion,
} from "./database/notion.js";
const app = express();
app.use(bodyParser.json());
app.get("/user", async (req, res) => {
  try {
    let users = await getUser();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    let user = await getUser(req.params.id);
    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/user", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let user = await createUser(username, email, password);
    res.json(user[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/user/:id", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let user = await updateUser(req.params.id, username, email, password);
    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/user/:id", async (req, res) => {
  try {
    let user = await deleteUser(req.params.id);
    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/notion", async (req, res) => {
  try {
    let notions = await getNotion();
    res.json(notions);
  } catch (error) {
    console.error("Error fetching notions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/notion/:id", async (req, res) => {
  try {
    let notion = await getNotion(req.params.id);
    if (notion.length === 0) {
      res.status(404).json({ error: "Notion not found" });
    } else {
      res.json(notion[0]);
    }
  } catch (error) {
    console.error("Error fetching notion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/notion", async (req, res) => {
  try {
    let { title, content, category, user_id } = req.body;
    let notion = await createNotion(title, content, category, user_id);
    res.json(notion[0]);
  } catch (error) {
    console.error("Error creating notion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/notion/:id", async (req, res) => {
  try {
    let { title, content, category } = req.body;
    let notion = await updateNotion(req.params.id, title, content, category);
    if (notion.length === 0) {
      res.status(404).json({ error: "Notion not found" });
    } else {
      res.json(notion[0]);
    }
  } catch (error) {
    console.error("Error updating notion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/notion/:id", async (req, res) => {
  try {
    let notion = await deleteNotion(req.params.id);
    if (notion.length === 0) {
      res.status(404).json({ error: "Notion not found" });
    } else {
      res.json(notion[0]);
    }
  } catch (error) {
    console.error("Error deleting notion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(4000, () => {
  console.log("server running on port 4000");
});
