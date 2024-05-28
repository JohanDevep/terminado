const cron = require('node-cron');
const Cliente = require('../models/User');

cron.schedule('0 8 * * *', async () => {
  try {
    await Cliente.deleteMany();
    console.log('Se han borrado todos los registros de la colección Clientes');
  } catch (err) {
    console.error('Error al borrar los registros de la colección Clientes:', err);
  }
});