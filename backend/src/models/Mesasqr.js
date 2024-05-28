const mongoose = require("mongoose");

const MesaSchema = new mongoose.Schema({
  qr: { type: String, required: true },
  numero: { type: Number, required: true },
  establecimiento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Establecimiento',
    required: true
  },
  capacidad: {
    type: Number,
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Mesa", MesaSchema);
