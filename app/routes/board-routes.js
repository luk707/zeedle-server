var ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  // INDEX Boards
  app.get("/boards", (req, res) => {
    db.collection("boards")
      .find({})
      .toArray(function(err, result) {
        if (err) {
          res.send({ error: "An error occurred" });
        } else {
          res.send(result);
        }
      });
  });

  // CREATE Board
  app.post("/boards", (req, res) => {
    const board = req.body;
    db.collection("boards").insertOne(board, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // READ Task
  app.get("/boards/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("boards").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occured." });
      } else {
        res.send(item);
      }
    });
  });

  // UPDATE Board
  app.patch("/boards/:id", (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    const update = {
      $set: {
        title: req.body.title,
        columnIds: req.body.columnIds
      }
    };
    db.collection("boards").updateOne(query, update, function(err, item) {
      if (err) {
        res.send({ error: "An error has occured." });
      } else {
        res.send({ message: "Board " + id + " updated." });
      }
    });
  });

  // DELETE Board
  app.delete("/boards/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("boards").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error occured" });
      } else {
        res.send({ message: "Board " + id + " deleted!" });
      }
    });
  });
};
