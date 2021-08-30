const express = require('express');

const router = express.Router();

router.use((req, res, next)=>{
  res.locals.user = null;
  next();
})
//pageRouter 앞에 그냥 /이기 때무에 그냥 / profile 내꺼할 때는 고쳐야함
router.get('/', (req, res) => {
  res.sendFile(__dirname + 'static/mainpage_html/profile.html')
});

router.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/login.html'))
});

router.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/join.html'))
});

router.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'static/login_html/find.html'))
});


//로그인 페이지

module.exports = router;