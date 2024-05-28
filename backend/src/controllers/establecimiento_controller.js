const Adm = require("../models/Adm");
const Mesa = require("../models/Mesasqr");
const qrcode = require("qrcode");
const bcrypt = require("bcryptjs");
const Clientes = require("../models/User");
const { validationResult } = require("express-validator");
const { signTokenEstablecimiento } = require("./Authentication");

module.exports = {
  async getMesasEstablecimiento(req, res) {
    const { id } = req.params;
    try {
      const establecimiento = await Adm.findById(id).populate("mesas");
      if (!establecimiento) {
        return res.status(404).json({ msg: "Establecimiento no encontrado" });
      }
      const mesas = establecimiento.mesas;
      res.status(200).json({ mesas });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Hubo un error al consultar", error: error.message });
    }
  },
  async getEstablecimiento(req, res) {
    try {
      const adms = await Adm.find().populate("mesas");
      const admsWithMesasCount = adms.map((adm) => ({
        ...adm.toObject(),
        cantidadMesas: adm.mesas.length,
      }));
      res.status(200).json({ adms: admsWithMesasCount });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Hubo un error al consultar", error: error.message });
    }
  },
  async postEstablecimiento(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors);

    const {
      nombre,
      tipo,
      email,
      contraseña,
      ubicacion,
      descripcion,
      nit,
      cantidadMesas,
    } = req.body;

    try {
      let establecimiento = await Adm.findOne({ email, nit });
      if (establecimiento) throw new Error("Ya existe el establecimiento");

      establecimiento = new Adm({
        nombre,
        tipo,
        email,
        contraseña,
        ubicacion,
        descripcion,
        nit,
      });

      const mesas = [];
      for (let i = 1; i <= cantidadMesas; i++) {
        const qrMesa = `QR de la mesa ${i}`;
        const mesa = new Mesa({
          qr: qrMesa,
          numero: i,
          establecimiento: establecimiento._id,
          capacidad: 4,
          disponible: true,
        });
        mesas.push(mesa);
      }
      await Mesa.insertMany(mesas);

      establecimiento.mesas = mesas.map((mesa) => mesa._id);

      const QRurl = `http://localhost:3099/api/v1/establecimiento/getByEstablecimiento`;
      establecimiento.qr_empresa = await qrcode.toDataURL(QRurl);

      await establecimiento.save();

      res
        .status(201)
        .send({ status: "success", message: "Establecimiento registrado" });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  async putEstablecimiento(req, res) {
    const { id } = req.params;
    const { cantidadMesas } = req.body;

    try {
      const establecimiento = await Adm.findById(id).populate("mesas");
      if (!establecimiento)
        return res.status(404).json({ msg: "Establecimiento no encontrado" });

      const mesasCount = establecimiento.mesas.length;
      if (cantidadMesas > mesasCount) {
        // Add new mesas
        const newMesas = [];
        for (let i = mesasCount + 1; i <= cantidadMesas; i++) {
          const qrMesa = `QR de la mesa ${i}`;
          const mesa = new Mesa({
            qr: qrMesa,
            numero: i,
            establecimiento: establecimiento._id,
            capacidad: 4,
            disponible: true,
          });
          newMesas.push(mesa);
        }
        await Mesa.insertMany(newMesas);
        establecimiento.mesas.push(...newMesas.map((mesa) => mesa._id));
      } else if (cantidadMesas < mesasCount) {
        // Remove excess mesas
        const mesasToRemove = establecimiento.mesas.slice(cantidadMesas);
        await Mesa.deleteMany({ _id: { $in: mesasToRemove } });
        establecimiento.mesas = establecimiento.mesas.slice(0, cantidadMesas);
      }

      await establecimiento.save();

      res.status(200).json({
        status: "success",
        message: "Número de mesas actualizado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al actualizar el número de mesas",
        error: error.message,
      });
    }
  },
  async deleteEstablecimiento(req, res) {
    const { id } = req.params;
    try {
      await Adm.findByIdAndDelete(id);
      res.status(200).json({ msg: "Establecimiento eliminado" });
    } catch (error) {
      res.status(500).json({ msg: "error al eliminar el establecimiento" });
    }
  },
  async putEstablecimientomesa(req, res) {
    const { id } = req.params;
    const { cantidadMesas } = req.body;

    try {
      const establecimiento = await Adm.findById(id).populate("mesas");
      if (!establecimiento) {
        return res.status(404).json({ msg: "Establecimiento no encontrado" });
      }

      const currentMesasCount = establecimiento.mesas.length;
      const newMesasCount = parseInt(cantidadMesas);

      if (newMesasCount < currentMesasCount) {
        const mesasToRemove = currentMesasCount - newMesasCount;
        const mesasIdsToRemove = establecimiento.mesas
          .slice(-mesasToRemove)
          .map((mesa) => mesa._id);

        await Mesa.deleteMany({ _id: { $in: mesasIdsToRemove } });
      } else if (newMesasCount > currentMesasCount) {
        for (let i = currentMesasCount + 1; i <= newMesasCount; i++) {
          const qrMesa = `QR de la mesa ${i}`;
          const mesa = new Mesa({
            qr: qrMesa,
            numero: i,
            establecimiento: establecimiento._id,
            capacidad: 4,
            disponible: true,
          });
          await mesa.save();
          establecimiento.mesas.push(mesa._id);
        }
      }

      await establecimiento.save();

      return res.status(200).json({
        status: "success",
        message: "Número de mesas actualizado correctamente",
        establecimiento,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Error al actualizar el número de mesas",
        error: error.message,
      });
    }
  },
  async getEstablecimientoById(req, res) {
    const { id } = req.params;
    try {
      const establecimiento = await Adm.findById(id).populate("mesas");
      if (!establecimiento)
        return res.status(404).json({ msg: "establecimiento no encontrado" });
      res.status(200).json({ establecimiento });
    } catch (error) {
      res.status(500).json({ msg: "error al buscar el establecimiento" });
    }
  },
  async LoginEstablecimiento(req, res) {
    const { email, contraseña } = req.body;
    try {
      const establecimiento = await Adm.findOne({ email });
      if (!establecimiento) {
        throw new Error(
          "No se encontró ningún establecimiento con este correo electrónico."
        );
      }

      const isMatch = await bcrypt.compare(
        contraseña,
        establecimiento.contraseña
      );
      if (!isMatch) {
        throw new Error("La contraseña proporcionada es incorrecta.");
      }

      const token = signTokenEstablecimiento(email, establecimiento._id);
      res.status(200).json({
        token,
        establecimientoId: establecimiento._id,
        establecimientoEncontrado: true,
      });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.message, establecimientoEncontrado: false });
    }
  },
  async getEstablecimientolistar(req, res) {
    try {
      const adms = await Adm.find().populate("mesas");
      const admsWithMesasCount = adms.map((adm) => ({
        _id: adm._id,
        nombre: adm.nombre,
        tipo: adm.tipo,
      }));
      res.status(200).json({ adms: admsWithMesasCount });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Hubo un error al consultar", error: error.message });
    }
  },
 
  async eliminarcliente (req, res) {
    try {
      const { id } = req.params;
      await Clientes.findByIdAndDelete(id);
      res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      res.status(500).json({ message: 'Error al eliminar cliente' });
    }
  },
  
  async EstablecimientoSele(req, res) {
    const { establecimientoId, usuario } = req.body;

    console.log("Usuario:", usuario);
    console.log("Establecimiento ID:", establecimientoId);

    try {
      const cliente = await Clientes.findOne({ usuario });
      if (!cliente) throw new Error("Usuario no encontrado");

      console.log("Cliente encontrado:", cliente);

      cliente.establecimientoSeleccionado = establecimientoId;
      cliente.mesaSeleccionada = null; // Eliminar la asignación de mesaSeleccionada
      await cliente.save();

      // Devolver solo el ID del establecimiento en la respuesta
      res.status(200).json({ establecimientoId });
    } catch (error) {
      console.error("Error al seleccionar establecimiento:", error);
      res.status(500).send("Error al seleccionar establecimiento");
    }
},

  

  async getClientesByEstablecimiento(req, res) {
    const { id } = req.params;
    try {
      const establecimiento = await Adm.findById(id);
      if (!establecimiento) {
        return res.status(404).json({ msg: "Establecimiento no encontrado" });
      }

      const clientes = await Clientes.find({ establecimientoSeleccionado: id });
      res.status(200).json({ clientes });
    } catch (error) {
      res.status(500).json({ msg: "Error al consultar", error: error.message });
    }
  },

  
};
