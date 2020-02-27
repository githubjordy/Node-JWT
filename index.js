//import { AuthenticateUser } from './routes/auth';
require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
const posts = [

    {
        username:'Jordy',
        title:'post1'
    },
    {
        username:'test',
        title:'post2'
    }


]
//import routes
const Authroute = require('./routes/auth');

// route middleware
app.use('/api/user',Authroute);

app.get('/users',AuthenticateUser,(req,res)=>{

  res.json(posts.filter(post=> post.username===req.user.name));
  //res.send(posts[0].username)
  //res.send(req.user);
  //res.json(posts);

})

function AuthenticateUser(req,res, next){
    const AuthHeader = req.headers['authorization'];  
    //const token = req.header('auth-token');
    const token = AuthHeader && AuthHeader.split(' ')[1];
    //res.send(token);
    if(token==null) return res.sendStatus(401);
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user= user;
        console.log(req.user);
        next();
    })
  /*  try{
    const verified = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    res.send(verified);
    req.user=verified;
    
    }

    catch(err){
        res.send(400).send('invalid token');

    }

    next();*/
    }

app.listen(3000,()=>console.log('server werkt'));
