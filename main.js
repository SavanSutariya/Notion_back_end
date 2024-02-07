import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send("ok");
});
app.listen(5000, (req, res) => {
  console.log("server running on port 5000");
});
