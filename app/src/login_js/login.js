let loginNum;
const $loginNumInput = document.querySelector(".loginNum");
$loginNumInput.addEventListener('change', (e) => {
  loginNum = e.target.value;
})

let loginPass;
const $loginPassInput = document.querySelector(".loginPass");
$loginPassInput.addEventListener('change', (e) => {
  loginPass = e.target.value;
})

const $loginBtn = document.getElementById("loginBtn");

$loginBtn.addEventListener('click', () => {
  if(loginNum);
  if(loginPass);

  postLoginInfo();
})

const $loginError = document.getElementById('loginError');

function postLoginInfo() {
  axios.post('/auth/login', {number: loginNum, password: loginPass})
    .then(function(res) {
      if(res.data.redirect == '/page/main') {
        window.location = '/page/main'
      }
    })
    .catch(error  => {
    console.log(error);
    $loginError.textContent = "입력한 정보가 올바르지 않습니다";
  })
}