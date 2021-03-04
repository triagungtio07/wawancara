const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://triagungtio:agung123@binarproject.toi8d.mongodb.net/wawancara?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const placeSchema = new mongoose.Schema({
  name: String,
  country: String,
  temperature: Number,
});

const placeModel = mongoose.model("place", placeSchema);

app.post("/place", async (req, res) => {
  try {
    const data = req.body;
    const place = await placeModel.create(data);

    res.status(200).json({ message: "succes insert data", place });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get("/place", async (req, res) => {
  try {
    const place = await placeModel.find();
    res.status(200).json({ message: "succes get data", place });
  } catch (error) {}
});

app.put("/place/:_id", async (req, res) => {
  try {
    const data = req.body;
    const placeId = req.params;

    const place = await placeModel.findByIdAndUpdate(placeId, data);
    res.status(200).json({ message: "succes update data", place });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.delete("/place/:_id", async (req, res) => {
  try {
    const placeId = req.params;

    const place = await placeModel.findByIdAndDelete(placeId);
    res.status(200).json({ message: "succes delete data", place });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.listen(3000, console.log("app running on port 3000"));
