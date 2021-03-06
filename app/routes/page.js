const express = require('express');
const path = require('path');
const { isLoggedIn, isNotLoggedIn } = require('./middlewears');

const router = express.Router();

router.use((req, res, next)=>{
  res.locals.user = null;
  next();
})

router.get('/login', isNotLoggedIn, (req, res)=>{
  res.render(path.join(__dirname,'..','/static','/login_html','/login.html'))
});

router.get('/join', isNotLoggedIn, (req, res)=>{
  res.sendFile(path.join(__dirname, '..','/static','/login_html','/join.html'))
});

router.get('/find', isNotLoggedIn, (req, res)=>{
  res.sendFile(path.join(__dirname, '..','/static','/login_html','/find.html'))
});

router.get('/main',isNotLoggedIn, (req, res, next)=>{ 
  res.sendFile(path.join(__dirname, '..','/static','/public','/mainpage.html'))
});

router.get('/bank',isNotLoggedIn, (req, res, next)=>{ 
  res.sendFile(path.join(__dirname, '..','/static','/public','/bankpage.html'))
});

router.get('/map',isNotLoggedIn, (req, res, next)=>{ 
  res.sendFile(path.join(__dirname, '..','/static','/public','/mappage.html'))
});

router.get('/anay',isNotLoggedIn, (req, res, next)=>{ 
  res.sendFile(path.join(__dirname, '..','/static','/public','/anaypage.html'))
});

router.get('/profile',isNotLoggedIn,(req, res, next)=>{
  res.sendFile(path.join(__dirname, '..','/static','/public','/profilepage.html'))
})

router.get('/error',isNotLoggedIn, (req, res, next)=>{ 
  res.sendFile(path.join(__dirname, '..','/static','/error','/errorpage.html'))
});


//로그인 페이지

module.exports = router;