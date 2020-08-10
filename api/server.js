const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//// GET Requests ////

server.get("/api/accounts", (req, res) => {
  db("accounts")
    .then((accountInfo) => {
      res.status(200).json({ data: accountInfo });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

//// POST Requests ////

server.post("/api/accounts", (req, res) => {
  const post = req.body;
  db("accounts")
    .insert(post)
    .returning("id")
    .then((ids) => {
      res.status(201).json({ inserted: ids });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

//// PUT Requests ////

server.put("/api/accounts/:id", (req, res) => {
  const changes = req.body;
  const postId = req.params.id;

  db("accounts")
    .where({ id: postId })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "Updated Successfully" });
      } else {
        res
          .status(404)
          .json({ message: "The account you requested was not found lol" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

//// DELETE Requests ////

server.delete("/api/accounts/:id", (req, res) => {
  const postId = req.params.id;

  db("accounts")
    .where({ id: postId })
    .del()
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "Removed Successfully" });
      } else {
        res
          .status(404)
          .json({ message: "The account you wanted to remove was not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = server;
