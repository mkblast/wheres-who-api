const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  level_number: { type: Number, required: true },
  characters: [{
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  }],
});

module.exports = mongoose.model("Level", LevelSchema);
