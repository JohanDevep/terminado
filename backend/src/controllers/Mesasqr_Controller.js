const Mesa = require("../models/Mesasqr");
const qrcode = require("qrcode");

module.exports = {
 async  GetMesasqr(req, res) {
  try {
    const tables = await Mesa.find();
    console.log(tables);
    if (tables.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "No hay mesas registradas" });
    }
    return res.status(200).json({
      status: "success",
      data: tables,
      message: "Mesas encontradas",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
},

  getMesaById(req, res) {
    const _id = req.params._id;
  Mesa.findById(_id)
    .then((mesa) => {
      if (!mesa) {
        return res.status(404).json({ msg: "mesa no encontrado" });
      }
      res.status(200).json({ mesa });
    })
    .catch((err) => res.status(500).json({ msg: "Error al buscar la mesa" }));
},

  async postMesasqr(req, res) {
    const { quantity } = req.body;
    const tables = parseInt(quantity);
    try {
      for (let i = 0; i < tables; i++) {
        let qr = await qrcode.toDataURL("http://localhost:3000/mesa/" + i);
        let mesa = new Mesa({ quantity: tables, qr: qr });
        await mesa.save();
      }
      return res
        .status(201)
        .send({ status: "success", message: tables + " mesas registradas" });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  deleteMesasqr(req, res) {
    const { id } = req.params;

    User.findByIdAndDelete(id)
      .then(() => res.status(200).json({ msg: "mesas eliminadas" }))
      .catch((err) =>
        res.status(500).json({ msg: "Error al eliminar las mesas" })
      );
  },
};
