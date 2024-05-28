const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true
  },
  establecimientoSeleccionado: { type: mongoose.Schema.Types.ObjectId, ref: 'Establecimiento' } 
});

module.exports = mongoose.model("Clientes", userSchema);
