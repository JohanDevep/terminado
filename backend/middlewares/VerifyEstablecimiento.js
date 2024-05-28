module.exports = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next()
    }
    res.json('Vuelva a iniciar sesion');

};