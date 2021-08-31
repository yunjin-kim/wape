let userPass;
const sameOrDiff = document.getElementById('sameOrDiff');

function printNum(){
  let userNum = document.getElementById('number').value;
  console.log(userNum);
}

function printPass(){
  userPass = document.getElementById('password').value;
  console.log(userPass);
}

function printSamePass(){
  let userSamePass = document.getElementById('samePassword').value;
  console.log(userSamePass);
  if(userPass === userSamePass){
    sameOrDiff.innerText = "비밀번호가 동일해"
  }
  else if(userPass !== userSamePass){
    sameOrDiff.innerText = "비밀번호가 동일하지 않아"
  }
}

function printBirth(){
  let userBirth = document.getElementById('birth').value;
  console.log(userBirth);
}

function printGender(event){
  let userGender = event.target.id;
  console.log(userGender)
}

//체크 상태면 null이 아니다
console.log(fristCheckResult)
let $fristCheck = document.getElementById('fristCheck')
let fristCheckResult = $fristCheck.getAttribute("checked");

let $secondCheck = document.getElementById('secondCheck')
let secondCheckResult = $secondCheck.getAttribute("checked");

let $thirdCheck = document.getElementById('thirdCheck')
let thirdCheckResult = $thirdCheck.getAttribute("checked");

const $loginComplete = document.getElementById("userJoinButton");

$loginComplete.addEventListener('click',()=>{
  if(sameOrDiff.innerText = "비밀번호가 동일해")
  if(userBirth)
  if(userGender)
  if(fristCheckResult !== null)
  if(secondCheckResult !== null)
  if(thirdCheckResult !== null)
  console.log("AAAAA")
})