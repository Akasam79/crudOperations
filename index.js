const express = require("express");
const app = express();

// const MongoClient = require("mongodb").MongoClient;

const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "process.env.postgres://aezyhjljwrzmzp:167359ae9373233e094b4735fed7bbe0d0df339e733a4d1f001d4ea04bcf0ac1@ec2-18-215-111-67.compute-1.amazonaws.com:5432/d2vk90m4ddtrd1",
  ssl: {
    rejectUnauthorized: false,
  },
});

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const connectionString = "mongodb://localhost:27017/users";

// mongoose.connect(
//   connectionString,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.log("failed");
//     } else {
//       console.log("database connected successfully");
//     }
//   }
// );

// const ClientSchema = new Schema({
//   name: String,
//   email: String,
//   country: String,
// });

// const Client = mongoose.model("Client", ClientSchema);

app.use(express.json());
app.set("view engine", "ejs");

app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    if (result) {
      const results = { results: result ? result.rows : null };
      console.log(results);
      res.send(results);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// app.get("/client", (req, res) => {
//   Client.find({}, (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Internal Server error" });
//     } else {
//       return res.status(200).json({ message: result });
//     }
//   });
// });

// app.post("/", (req, res) => {
//   Client.insertMany(
//     {
//       name: req.body.name,
//       email: req.body.email,
//       country: req.body.country,
//     },
//     (err, result) => {
//       if (err)
//         return res.status(500).json({ message: "Internal Server error" });
//       return res.status(200).json({ message: "New client added successfully" });
//     }
//   );
// });

// app.put("/client", (req, res) => {
//   var user_id = req.body.id;
//   var clientUpdates = {
//     name: req.body.name,
//     email: req.body.email,
//     country: req.body.country,
//   };
//   Client.findByIdAndUpdate(user_id, clientUpdates, (err, result) => {
//     if (err) return res.status(500).json({ message: "Internal Server error" });
//     return res.status(200).json({ message: "Data updated sucessfully" });
//   });
// });

// app.delete("/client", (req, res) => {
//   var user_id = req.body.id;
//   Client.findByIdAndDelete(user_id, (err, result) => {
//     if (err) return res.status(500).json({ message: "Internal server error" });
//     return res.status(200).json({ message: "Client deleted sucessfully" });
//   });
// });

app.listen(process.env.PORT || 5500);
console.log("server is running");
