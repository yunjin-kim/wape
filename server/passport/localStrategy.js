const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  //(2)
  console.log("로그인두번째")
  passport.use(new LocalStrategy({
    usernameField: 'number',  //req,body.number
    passwordField: 'password', //req,body.email
  },async(number, password, done) => {
    try{
      //로그인할 때 그 사람의 번호가 있나 확인
      const exUser = await User.findOne({where : {number}});
      if(exUser){
        //번호가 있다면 비밀번호를 비교한다
        const result = await bcrypt.compare(password, exUser.password);
        //일치하면
        if(result){
          //done함수를 호출하면 아까 auth로 돌아간다
          done(null, exUser);
        //일치하지 않으면
        }else{
          done(null, false, {message: '비밀번호가 일치하지 않습니다'});
        }
      }
      else{
        done(null, false, {message: '가입되지 않은 회원입니다'})
      }
    }catch(error){
      console.error(error);
      done(error);
    }
  }
  ))
}