const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models')
const passportConfig = require('./passport');

const app = express();
app.set('port', process.env.PORT || 8880);
//table 바꿀려면 force: true 데이터는 날아간다
sequelize.sync({force: false})
  .then(()=>{
    console.log('데이터베이스 연결 성공');
  })
  .catch((err)=>{
    console.error(err);
  });

passportConfig();


app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
//passport.session의 역할은 브라우저에서 세션쿠키를 보내주면 
//그것으로 id를 알아낸다 id를 deserializeUser 넘겨준다
//로그인 후 그 다음요청부터 passport.session이 실행될때 deserializeUser가 실행된다
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);

// app.use('/wrongpage?error',(req, res)=>{
//   res.sendFile(path.join(__dirname, 'static/error/errorpage.html'))
// })

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  // res.redirect('/wrongpage?error');
  res.sendFile(path.join(__dirname, 'static/error/errorpage.html'))
});

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트에서 대기 중');
})