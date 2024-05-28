const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const admschema = new Schema(
  {
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, unique: true, index: { unique: true } },
    roles: { type: String, default: "establecimiento" },
    qr_empresa: { type: String, required: true },
    contraseña: { type: String, required: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String, required: true },
    nit: { type: Number, required: true },
    mesas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mesa' }]
  },
  { timestamps: true }
);

admschema.pre("save", async function (next) {
  const establecimiento = this;
  if (!establecimiento.isModified("contraseña")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(establecimiento.contraseña, salt);
    establecimiento.contraseña = hash;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

admschema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.contraseña);
};

module.exports = mongoose.model("Establecimiento", admschema);
