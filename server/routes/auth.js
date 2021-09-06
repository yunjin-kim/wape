const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('../passport');

const router = express.Router();

router.post('/join', async(req, res, next)=>{
  const { number, password, birth, gender } = req.body;
  try{
    const exUser = await User.findOne({where : {number}});
    if(exUser){
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      number,
      password: hash,
      birth,
      gender,
    });
    return res.redirect('/');
  }catch(error){
    console.error(error);
    return next(error);
  }
});
//프론트에서 로그인요청 보내면 이 라우터에 걸린다
router.post('/login', (req, res, next)=>{
  passport.authenticate('local', (authError, user, info)=>{
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      return res.redirect(`/>loginError=${info.message}`);
    }
    return req.login(user, (loginError)=> {
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    })
  })(req, res, next);
})

module.exports = router;