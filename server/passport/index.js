const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  //(4)

  passport.serializeUser((user, done)=>{
    //user id만 뽑아서 done 해준다
    console.log("로그인네번째")
    done(null, user.id); //세션에 user의 id만 저장
    //done이 실행되면 auth로 간다
  });
  //세션에 이렇게 저장된다 {id: 2, 'connect.sid': s%14134242232}
  //connect.sid는 세션 쿠키이다 브라우저로 간다 
  //브라우저에서 요청을 보낼 떄마다 쿠키를 넣어서 보낸다
  passport.deserializeUser((id, done)=>{
    //필요할 때 deserialize에서 사용자 정보를 복구해준다
    User.findOne({where: { id }})
    .then(user => done(null, user))//유저 전체 정보 복구 req.user
    //isAuthenticated()함수는 로그인이 된 상태면 true를 반환한다
    .catch(err => done(err));
  })

  local();
}