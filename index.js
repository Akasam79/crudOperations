const express = require("express");
const app = express();

// const MongoClient = require("mongodb").MongoClient;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionString = "mongodb://localhost:27017/users";

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("failed");
    } else {
      console.log("database connected successfully");
    }
  }
);

const ClientSchema = new Schema({
  name: String,
  email: String,
  country: String,
});

const Client = mongoose.model("Client", ClientSchema);

app.use(express.json());

app.get("/client", (req, res) => {
  Client.find({}, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server error" });
    } else {
      return res.status(200).json({ message: result });
    }
  });
});

app.post("/", (req, res) => {
  Client.insertMany(
    {
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
    },
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Internal Server error" });
      return res.status(200).json({ message: "New client added successfully" });
    }
  );
});

app.put("/client", (req, res) => {
  var user_id = req.body.id;
  var clientUpdates = {
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
  };
  Client.findByIdAndUpdate(user_id, clientUpdates, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server error" });
    return res.status(200).json({ message: "Data updated sucessfully" });
  });
});

app.delete("/client", (req, res) => {
  var user_id = req.body.id;
  Client.findByIdAndDelete(user_id, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    return res.status(200).json({ message: "Client deleted sucessfully" });
  });
});

app.listen(5500, () => console.log("server is running"));
