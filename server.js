const http = require('http');
const fs = require('fs').promises;

const server = http.createServer( async(req, res)=>{
  try{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const data = await fs.readFile('./mainpage_html/mappage.html');
    res.end(data);
  }catch (err){
    console.error(error);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(err.message)
  }
    
})
  .listen(80);
server.on('listening', ()=>{
  console.log('80포트에서 서버 대기중')
});
server.on('error', (error)=>{
  console.error(error);
})