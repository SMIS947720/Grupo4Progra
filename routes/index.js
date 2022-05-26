var express = require('express');
var router = express.Router();


//rutas

const registerR = "../views/pages/register";
const loginR = "../views/pages/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COMPANY PROGRAMMING KHO' });
});

router.get('/register', (req, res) => {
  res.render(registerR);
});


//REGISTER
router.post('/register',async (req, res) => {
  const {fulln, email, password, cp } = req.body;

  try{
    if (password === cp){
      
       //validar si el correo existe
       user = await User.findOne({email: email})
       .then(user => {
         if(user){
           res.render(registerR,{
             message: "El usuario ya esta registrado",
             messageClass: "alert-danger"
           });
         }else{
           const hashedPassword = methods.getHashedPassWord(password);

           const userDB = new User({'fulln': fulln, 'email':email, 'password': hashedPassword})

           userDB.save();

           res.render(loginR,{
            message: "El registro se ha completado",
            messageClass: "alert-success"
          });
         }
       });
   
   
     }else{
       res.render(registerR,{
         message: "El password no coincide",
         messageClass: "alert-danger"
       });
       
     }
  
  }
  catch(error){
    console.log('error', error);
    
  }
});

//LOGIN




//logout
router.get('/logout',(req, res) => {
  res.clearCookie('AuthToken');
  return res.redirect('/');
})
module.exports = router;
