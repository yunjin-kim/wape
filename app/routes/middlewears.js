exports.isLoggedIn = (req, res, next) => {
  //req.isAuthenticated()이 true이면 로그인 되어있는 상태
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.status(403).send('로그인이 필요한 서비스입니다');
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    next();
  }
  else{
    const message = encodeURIComponent('이미 로그인한 상태입니다');
    res.redirect(`/?error=${message}`);
  }
}