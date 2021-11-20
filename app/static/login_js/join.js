let userNum;
const $joinNumInput = document.querySelector(".joinNum");
$joinNumInput.addEventListener('change', (e) => {
  userNum = e.target.value;
})

let userPass;
let userPassTP = false;
const $noticeWrongPass = document.querySelector('.noticeWrongPass');
const $joinPassInput = document.querySelector(".joinPass");
$joinPassInput.addEventListener('change', (e) => {
  userPass = e.target.value;

  if(userPass.length < 8) {
    $noticeWrongPass.innerText = "비밀번호 8자리 이상 입력해주세요";
  }
  else{
    $noticeWrongPass.innerText = "";
  }
  userPassTP = true;
});


let userSamePass
let userSamePassTF = false;
const $noticeNotSamePass = document.querySelector(".noticeNotSamePass");
const $joinPassSameInput = document.querySelector(".joinPassSame");
$joinPassSameInput.addEventListener('click', (e) => {
  userSamePass = e.target.value;

  if(userPass === userSamePass) {
    $noticeNotSamePass.innerText = "비밀번호가 동일합니다";
    userSamePassTF = true;
  }
  else if(userPass !== userSamePass) {
    $noticeNotSamePass.innerText = "비밀번호가 동일하지 않습니다";
    userSamePassTF = false;
  }
})

//생년월일 한번 틀리면 다시 입력해도 틀리게 출력
let userBirth;
const $noticeWrongBirth = document.querySelector('.noticeWrongBirth');
const $joinBirthInput = document.querySelector(".joinBirth");
$joinBirthInput.addEventListener('change', (e) => {
  userBirth = e.target.value;

  if(userBirth.length !== 8) {
    $noticeWrongBirth.innerText = "생년월일 8자를 입력해주세요";
  }
  else if(userBirth.length === 8) {
    $noticeWrongBirth.innerText = "";
  }
})

let userGender 
const $joinGenderFrom = document.querySelector(".join__main__gender__form");
$joinGenderFrom.addEventListener('click', (e) => {
  userGender = e.target.id;
})

let userNick;
const $joinNickInput = document.querySelector(".joinNick");
$joinNickInput.addEventListener('change', (e) => {
  userNick = e.target.value;
})

let fristCheck;
const $fristCheck = document.querySelector(".fristCheck");
$fristCheck.addEventListener('click',(e) => {
  fristCheck = e.path[0].checked;
})

let secondCheck;
const $secondCheck = document.querySelector(".secondCheck");
$secondCheck.addEventListener('click',(e) => {
  secondCheck = e.path[0].checked;
})

let thirdCheck;
const $thirdCheck = document.querySelector(".thirdCheck");
$thirdCheck.addEventListener('click',(e) => {
  thirdCheck = e.path[0].checked;
})

const $loginComplete = document.querySelector(".userJoinButton");
$loginComplete.addEventListener('click',() => {
  if(userPassTP && userSamePassTF && userBirth && userGender && userNick && fristCheck && secondCheck &&thirdCheck)
  postUserInfo();
})

const $joinError = document.querySelector(".joinError");

function postUserInfo() {
  axios.post('/auth/join',{number: userNum, password: userPass, birth: userBirth, gender: userGender, nick: userNick })
    .then(function (res) {
      if(res.data.redirect == '/page/login') {
        window.location = '/page/login'
      }
    })
    .catch(error => {
      console.log(error);
      $joinError.textContent = "입력한 정보가 올바르지 않습니다";
    });
}
