const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewears');

const router = express.Router();

router.use((req, res, next)=>{
  res.locals.user = null;
  next();
})

router.get('/login', isNotLoggedIn, (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/login.html'))
});

router.get('/join', isNotLoggedIn, (req, res)=>{
  res.sendFile(path.join('static/login_html/join.html'))
});

router.get('/find', isNotLoggedIn, (req, res)=>{
  res.sendFile(path.join('static/login_html/find.html'))
});


router.get('/done',isLoggedIn, (req, res, next)=>{ 
  res.sendFile(path.join('static/mainpage_html/mainpage.html'))
  
})

// router.get('/', (req, res) => {
//   res.sendFile(__dirname, 'static/mainpage_html/profile.html')
// });


//로그인 페이지

module.exports = router;