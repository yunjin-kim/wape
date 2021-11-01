let userNum;
function printNum(){
  userNum = document.getElementById('number').value;
  console.log(userNum);
}

const $noticeWrongPass = document.querySelector('.noticeWrongPass');
let userPass;
let userPassTP = false;
function printPass(){
  userPass = document.getElementById('password').value;
  if(userPass.length < 8){
    $noticeWrongPass.innerText = "비밀번호 8자리 이상 입력해주세요";
  }
  else{
    $noticeWrongPass.innerText = "";
  }
  userPassTP = true;
  console.log(userPass);
}

let userSamePass
let userSamePassTF = false;
const $noticeNotSamePass = document.querySelector('.noticeNotSamePass');
function printSamePass(){
  userSamePass = document.getElementById('samePassword').value;
  console.log(userSamePass);
  if(userPass === userSamePass){
    $noticeNotSamePass.innerText = "비밀번호가 동일합니다"
    userPassTF = true;
  }
  else if(userPass !== userSamePass){
    $noticeNotSamePass.innerText = "비밀번호가 동일하지 않습니다"
    userPassTF = false;
  }
}
//생년월일 한번 틀리면 다시 입력해도 틀리게 출력
const $noticeWrongBirth = document.querySelector('.noticeWrongBirth');
let userBirth;
function printBirth(){
  userBirth = document.getElementById('birth').value;
  if(userBirth.length !== 8){
    $noticeWrongBirth.innerText = "생년월일 8자를 입력해주세요"
  }
  console.log(userBirth);
}

let userGender 
function printGender(event){
  userGender = event.target.id;
  console.log(userGender)
}

let userNick;
function printNick(){
  userNick = document.getElementById('nickName').value;
  console.log(userNick);
}

let $fristCheck = document.getElementById('fristCheck')
let fristCheck;
$fristCheck.addEventListener('click',(e)=>{
  fristCheck = e.path[0].checked;
  console.log(fristCheck)
})

let $secondCheck = document.getElementById('secondCheck')
let secondCheck;
$secondCheck.addEventListener('click',(e)=>{
  secondCheck = e.path[0].checked;
  console.log(secondCheck)
})

let $thirdCheck = document.getElementById('thirdCheck')
let thirdCheck;
$thirdCheck.addEventListener('click',(e)=>{
  thirdCheck = e.path[0].checked;
  console.log(thirdCheck)
})


const $loginComplete = document.getElementById("userJoinButton");

$loginComplete.addEventListener('click',()=>{
  if(userPassTP && userSamePassTF && userBirth && userGender && userNick && fristCheck && secondCheck &&thirdCheck)
  console.log("회원가입")
  postUserInfo();
})

const $joinError = document.querySelector('.joinError');

function postUserInfo(){
  axios.post('/auth/join',{number: userNum, password: userPass, birth: userBirth, gender: userGender, nick: userNick })
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