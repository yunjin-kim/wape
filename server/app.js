const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev')); //배포시 combined
app.use('', express.static(path.join(__dirname, 'static')));
app.use(cookieParser('password'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session())

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, './static/splash.html'));
});

app.post('/', (req, res)=>{
  res.send('hola');
})

app.get('/onboarding',(req, res)=>{
  res.sendFile(path.join(__dirname, './static/onboarding_html/onboarding_influ.html'));
})

app.get('/login',(req, res)=>{
  res.sendFile(path.join(__dirname, ''));
  if(true){//로그인 성공
    next('route');
  }else{
    next();
  }
},(req, res)=>{
  res.sendFile(path.join(__dirname, '로그인 필요한 서비스 입니다 페이지'))
})


// app.use((req, res, next)=>{
//   res.status(200).send("페이지 주소를 확인해주세요")
// })

app.use((err, req, res, next)=>{
  console.log(err);
  res.status(200).send('에러 발생했습니다 개발자가 고치는 중이니 조금만 기달려주세요')
})

app.listen(app.get('port'), ()=>{
  console.log('익스프레스 서버 실행')
});

//라우터를 스플레쉬,온보딩/ 로그인/ 메인 컨텐츠  에렇게 나누기