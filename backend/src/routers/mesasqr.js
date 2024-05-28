const mesasqr_controller = require("../controllers/Mesasqr_Controller");
module.exports = (app) => {

app.get("/api/v1/mesasqr/getMesa", mesasqr_controller.GetMesasqr);
app.get('/api/v1/mesasqr/getMesaQR/:_id', mesasqr_controller.getMesaById);
app.post('/api/v1/mesasqr/postMesa', mesasqr_controller.postMesasqr);
app.delete('/api/v1/Mesa/delete/:nombre', mesasqr_controller.deleteMesasqr);

}

