exports.isLoggedIn = (req, res, next) => {
  //req.isAuthenticated()이 true이면 로그인 되어있는 상태
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.status(403).send('로그인필요');
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    next();
  }
  else{
    const message = encodeURIComponent('로그인한 상태여');
    res.redirect(`/?error=${message}`);
  }
}