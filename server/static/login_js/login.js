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

function postLoginInfo(){
  console.log("로그인가즈아")
  axios({
    url: "http://localhost:8880/auth/login/",
    method: "POST",
    data: ({
      number: loginNum,
      password: loginPass,
    }),
  }).then((res)=>{
    console.log(res);
  }).catch(error =>{
    $joinError.textContent = "입력한 정보가 올바르지 않습니다";
    console.log(error);
  })
}