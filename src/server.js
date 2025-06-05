const express = require("express");
const mongoose = require("mongoose");
const Route = require("./routes/route");

const app = express();

app.use(express.json());
app.use("/", Route);

mongoose.connect("mongodb+srv://tanushkamaheshwari98:tlIquO4DpENkEnUI@cluster0.xikzzzv.mongodb.net/userManagement")
    .then(() => console.log("Database connection"))
    .catch(() => console.log("Database not connected"));

// create server
app.get("/", (req, res) => {
    res.send("Hello From express");
})

// create path
let PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server is running at ${PORT}`);

    }
})