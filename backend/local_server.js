const express = require ('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const {mongoConnection} = require('./database/mongoose');
const multer = require ('multer');
const io = require('socket.io')(server);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config()
require('./src/system/temporizador')
const Role = require('./src/models/Roles');

const port = process.env.PORT || 3099;


//middlewares
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'JukeBoxUserSession',
    resave: false,
    saveUninitialized: false,
    name: 'secret-name'
}));

//passport midleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser((establecimiento, done) => done(null, {id: establecimiento._id, nombre: establecimiento.nombre}))
passport.deserializeUser(async(establecimiento, done)=>{
    const estableciemientoDB = await Adm.findById(establecimiento.id);
    return done(null, {id: estableciemientoDB._id, nombre: establecimiento.nombre});
})



//Database
mongoConnection()



app.use(cors());
app.disable('x-powered-by');
app.set('port', port);


//Sockets

const upload = multer({
    storage: multer.memoryStorage()
}
);

//rutas
//require('./src/config/passport')(passport);



//rutas de backend
const AdmRoutes = require('./src/routers/admsroutes');
const userRoutes = require('./src/routers/usersroutes');
const Adm = require('./src/models/Adm');
const mesasRoutes = require('./src/routers/mesasqr');

//llamado de las rutas
AdmRoutes(app);
userRoutes(app);
mesasRoutes(app);

server.listen(3099 || 'localhost', function(){
console.log('App iniciada en el puerto ' + port)
});


app.get('/raiz', (req, res) => {
    res.send('Ruta raiz del backend');
}
);

app.use((err, req, res, next)=>{

    console.log(err);
    res.status(err.status || 500).send(err.stack);
}
);