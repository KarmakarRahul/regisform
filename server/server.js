const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test");

// Define a User schema
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  checkInDate: String,
  checkOutDate: String,
});

const User = mongoose.model("User", userSchema);

// Serve the static files from the 'public' directory
app.use(express.static("public"));

// app.post("/register", (req, res) => {
//   const {first_name, last_name, email, phone, checkInDate, checkOutDate} = req.body;
//   User.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         res.json("Already registered");
//       } else {
//         User.create({first_name, last_name, email, phone, checkInDate, checkOutDate})
//           .then((result) => res.json(result))
//           .catch((err) => res.json(err));
//       }
//     })
//     .catch((err) => res.json);
// });

app.post("/register", (req, res) => {
    const { first_name, last_name, email, phone, checkInDate, checkOutDate } = req.body;
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          res.status(400).json({ message: "Already registered" });
        } else {
          User.create({ first_name, last_name, email, phone, checkInDate, checkOutDate })
            .then((result) => {
              console.log("Registration successfull:", result);
              res.status(201).json(result);
            })
            .catch((err) => {
              console.error("Error creating user:", err);
              res.status(500).json({ message: "Internal server error" });
            });
        }
      })
      .catch((err) => {
        console.error("Error finding user:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
