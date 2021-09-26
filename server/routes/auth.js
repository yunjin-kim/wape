const express = require('express');
const passport = require('../passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewears');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req, res, next)=>{
  console.log(req)
  const { number, password, birth, gender } = req.body;
  try{
    const exUser = await User.findOne({where : {number}});
    if(exUser){
      // return res.sendStatus(444);
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      number,
      birth,
      gender,
      password: hash,
    });
    console.log('회원가입 성공')
    return res.redirect('/page/login');
  }catch(error){
    console.error(error);
    return next(error);
  }
});

//프론트에서 로그인요청 보내면 이 라우터에 걸린다
router.post('/login', isNotLoggedIn, (req, res, next)=>{
  console.log("로그인첫번째")
  //(1)passport.authenticate('local',여기까지 실행되면 passport가 localstrategy를 찾는다
  passport.authenticate('local', (authError, user, info)=>{
                                  //(3)

  console.log("로그인세번째")
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      return res.redirect(`/?loginError=${info.message}`);
    }
    //로그인 성공한 경우 passport/index 로 간다
    return req.login(user, (loginError)=> {
      //(5) 최종적으로 로그인에러가 있나 확인한다
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      console.log("로그인다섯번째")
      return res.redirect('/page/main')
      //여기서 세션쿠키를 브라우저로 보내준다
      //그래서 그 다음 요청부터 세션 쿠키가 보내져서 서버가 요청을 누가 보냈는지 알 수 있게(로그인 상태)
      //로그인 성공
      
    })
  })(req, res, next);//미들웨어 확장
})

router.get('/logout', isLoggedIn, (req, res)=>{
  //로그아웃하면 서버에서 세션쿠키를 지운다
  req.logout();
  req.session.destroy();
  // res.redirect('/');
})

module.exports = router;