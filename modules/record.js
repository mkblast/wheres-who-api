const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  name: { type: String, require: true },
  recored: { type: Number, require: true },
});

module.exports = mongoose.model("Record", RecordSchema)
