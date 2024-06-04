const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  record: { type: Number, required: true },
});

module.exports = mongoose.model("Record", RecordSchema)
