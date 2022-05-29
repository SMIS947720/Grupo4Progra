var express = require('express');
var router = express.Router();
const methods = require('../methods');
const User = require('../models/user');

//Rutas
const registerR = "../views/pages/register";
const loginR = "../views/pages/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COMPANY PROGRAMMING KHO' });
});

router.get ('/home', function(req, res){
  if (req.user) {
    res.render('home', {title1: "Welcome to our Website"});
  } else {
    res.render(loginR, {
      message: "Por favor, inicie sesión para continuar",
      messageClass: "alert-danger"
    });
  }
});

//Metodos GET de las paginas Login y Register
//LOGIN
router.get('/login', (req, res) => {
  res.render(loginR);
});

//REGISTER
router.get('/register', (req, res) => {
  res.render(registerR);
});

//Metodos POST de las paginas Login y Register
//LOGIN
router.post ('/login', async (req, res) => {
  const {email, password } = req.body;
  const hashedPassword = methods.getHashedPassword(password);

  user = await User.findOne({ email: email, password: hashedPassword })

  .then (user => {
     if(user){
    const authToken = methods.generateAuthToken();
    //almacenar el token de autenticacion
    methods.authTokens[authToken] = user;
    res.cookie('AuthToken', authToken); // setting token
    res.redirect("/home"); // redireccionar
    } else {
      res.render(loginR, {
        message: "Usuario y password invalidos",
        messageClass: "alert-danger"
      });
    }
  })
});

//REGISTER
router.post('/register', async (req, res) => {
  const {fulln, email, password, cp } = req.body;
  
  try {
    //verificar si el password coincide
    if (password === cp) {
    //validar si el correo existe
    user = await User.findOne({ email: email })
      .then(user => {
        if(user){
          res.render(registerR, {
            message: "El usuario ya esta registrado",
            messageClass: "alert-danger"
        });
      } else {
        //encriptamos el password
        const hashedPassword = methods.getHashedPassword(password);
        //creamos un nuevo objeto a partir del modelo User
        const userDB = new User({
          'fulln': fulln,
          'email': email,
          'password': hashedPassword
        })
        //guardar los datos
        userDB.save();

        res.render(loginR, {
          message: "El registro se ha completado",
          messageClass: "alert-success"
        });
      }
    })

  } else {
    res.render(registerR, {
      message: "El password no coincide",
      messageClass: "alert-danger"
    });
  }
  } catch(error) {
    console.log('error', error);
  }

});

//LOGOUT
router.get('/logout',(req, res) => {
  res.clearCookie('AuthToken');
  return res.redirect('/');
})

module.exports = router;
