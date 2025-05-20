// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());

app.get("/api/item/:id", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const data = await response.json();
  res.json(data);
});

app.listen(4000, () => console.log("Proxy server running on http://localhost:4000"));
