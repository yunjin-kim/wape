const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 4000);
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res)=>{
  res.send('hola');
})

app.get('/about',(req, res)=>{
  res.sendFile(path.join(__dirname, '../onboarding_html/onboarding_influ.html'));
})

app.listen(app.get('port'), ()=>{
  console.log('익스프레스 서버 실행')
});

