import { getCookie } from "./mainpage_profile.js";

const $logoutBtn = document.getElementById("logoutBtn");
const $profilePageName = document.querySelector('.profileName');

$profilePageName.innerText = getCookie();

$logoutBtn.addEventListener('click', ()=>{
  logout();
})

function logout(){
  axios.get('/auth/logout')
  .then(function (res){
    if(res.data.redirect == '/page/login'){
      window.location = '/page/login'
    }
  }).then((res)=>{
    console.log(res);
  }).catch(error =>{
    $joinError.textContent = "입력한 정보가 올바르지 않습니다";
    console.log(error);
  })
}

