
const router = require('express').Router();
const jwt = require('jsonwebtoken');


router.get('/register',(req,res)=>{

    res.send('register');

})

router.post('/login',(req,res)=>{


    //Authenticate
    const username = req.body.username;

    const user ={name:username};
    //res.send(AuthHeader);
    const accesstoken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    //res.header('auth-token',accesstoken);
   res.json({accesstoken:accesstoken});

})



//module.exports = AuthenticateUser;
module.exports = router;
