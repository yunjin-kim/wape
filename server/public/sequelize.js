//!!!!!시퀄라이즈랑 join.html이랑 연결하기
// // 사용자 로딩
// async function getUser() {
//   try {
//     console.log('AAA')
//     const res = await axios.get('/users');
//     const users = res.data;
//     console.log(users);
//     const tbody = document.querySelector('#user-list tbody');
//     tbody.innerHTML = '';
//     users.map(function (user) {
//       console.log(user)
//       const row = document.createElement('tr');
//       row.addEventListener('click', () => {
//         getComment(user.id);
//       });
//       // 로우 셀 추가
//       let td = document.createElement('td');
//       td.textContent = user.id;
//       row.appendChild(td);
//       td = document.createElement('td');
//       td.textContent = user.number;
//       row.appendChild(td);
//       td = document.createElement('td');
//       td.textContent = user.password;
//       row.appendChild(td);
//       td = document.createElement('td');
//       td.textContent = user.birth;
//       row.appendChild(td);
//       td = document.createElement('td');
//       td.textContent = user.gender ? '남자' : '여자';
//       row.appendChild(td);
//       tbody.appendChild(row);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }
// 사용자 등록 시


function printNum(){
  const number = document.getElementById('number').value;
  console.log(number)
}

function printPass(){
  const password = document.getElementById('password').value;
  console.log(password)
}

function printBirth(){
  const birth = document.getElementById('birth').value;
  console.log(birth)
}

let gender;
const $genderFrom = document.querySelector('.join__main__gender__form');
$genderFrom.addEventListener('click', (event)=>{
  console.log(event.target.id)
  if(event.target.classList.contain('.women')){
    gender = "women";
  }
  else if(event.target.classList.contain('.men')){
    gender =  "men";
  }
  console.log(gender)
})


document.getElementById('userJoinButton').addEventListener('click', async () => {
  if (!number) {
    return alert('번호을 입력하세요');
  }
  if (!password) {
    return alert('비밀번호를 입력하세요');
  }
  if (!birth) {
    return alert('생년월일를 입력하세요');
  }
  if(!gender){
    return alert('성별을 선택하세요')
  }
  try {
    console.log('BBB')
    await axios.post('/users', { number, password, birth, gender });
    getUser();
  } catch (err) {
    console.error(err);
  }
  // e.target.number.value = '';
  // e.target.password.value = '';
  // e.target.birth.value = '';
  // e.target.gender.checked = false;
});