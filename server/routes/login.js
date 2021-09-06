const express = require('express');

const router = express.Router();

router.use((req, res, next)=>{
  res.locals.user = null;
  next();
})

router.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/login.html'))
});

router.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/join.html'))
});

router.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/find.html'))
});

// router.get('/', (req, res) => {
//   res.sendFile(__dirname + 'static/mainpage_html/profile.html')
// });


//로그인 페이지

module.exports = router;