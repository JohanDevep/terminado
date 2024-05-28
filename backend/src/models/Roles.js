const mongoose = require("mongoose");
const RolSchema = new mongoose.Schema({
  Rol: { type: String, required: true },
});

module.exports = mongoose.model("Roles", RolSchema);
