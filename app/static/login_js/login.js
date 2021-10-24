let loginNum;
function loginNumber(){
  loginNum = document.getElementById('loginNum').value;
  console.log(loginNum);
}

let loginPass;
function loginPassword(){
  loginPass = document.getElementById('loginPass').value;
  console.log(loginPass)
}

const $loginBtn = document.getElementById("loginBtn");

$loginBtn.addEventListener('click', ()=>{
  console.log("로그인111")
  if(loginNum);
  if(loginPass);

  postLoginInfo();
})

const $loginError = document.getElementById('loginError');

function postLoginInfo(){
  axios.post('/auth/login', {number: loginNum,password: loginPass})
    .then(function(res){
      if(res.data.redirect == '/page/main'){
        window.location = '/page/main'
      }
    }).then(()=>{
  }).catch(error =>{
    console.log(error);
    $loginError.textContent = "입력한 정보가 올바르지 않습니다";
  })
}