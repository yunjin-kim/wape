const express = require('express');

const router = express.Router();

router.use((req, res, next)=>{
  res.locals.user = null;
  next();
})
//pageRouter 앞에 그냥 /이기 때무에 그냥 / profile 내꺼할 때는 고쳐야함
router.get('static/mainpage_html/profile.html', (req, res) => {
  res.render('profile', {title: '내정보'});
});

router.get('static/login_html/join.html', (req, res) => {
  res.render('join', {title: '회원가입'});
});

router.get('static/login_html/find.html', (req, res) => {
  res.render('find', '계정찾기')
})

//로그인 페이지
router.get('static/login_html/login.html', (req, res, next) => {
  res.render('main', {
    title: 'Wape',
  });
})

module.exports = router;