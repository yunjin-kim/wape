import { getCookie } from "./mainpage_profile.js";
const $profileHeightText = document.querySelector(".profile__bodywrap__heighttext");

(function enterProfilePage() {
  setHeight();
})();

const $profilePageName = document.querySelector(".profileName");
$profilePageName.textContent = getCookie();

const $profileBackBtn = document.querySelector(".profile__backbtn");
$profileBackBtn.addEventListener('click', () => {
  history.back();
})

function setHeight() {
  const userHeight = localStorage.getItem("USER_HEIGHT");
  const parseUserHeight = JSON.parse(userHeight);
  $profileHeightText.textContent = `${parseUserHeight} cm`;
}

const $profileHeightFixBtn = document.querySelector(".profileHeightFixBtn");
$profileHeightFixBtn.addEventListener('click', (e) => {
  showHeightModal(e);
})

function showHeightModal(e) {
  const hightModalDiv = document.createElement('div');
  hightModalDiv.classList.add("heightModal");

  const heightTitle = document.createElement('h3');
  heightTitle.classList.add("heightModalTitle");
  heightTitle.textContent = "신장을 입력해주세요";
  hightModalDiv.append(heightTitle);

  const heightModalClose = document.createElement('button');
  heightModalClose.textContent = "X";
  heightModalClose.classList.add("heightModalClose");
  hightModalDiv.append(heightModalClose);
  heightModalClose.addEventListener('click', () => {
    hightModalDiv.remove();
  })

  let height;
  const heightInput = document.createElement('input');
  heightInput.classList.add("heightInput");
  heightInput.setAttribute('type','number');
  hightModalDiv.append(heightInput);
  heightInput.addEventListener('change', (e) => {
    height = e.target.value;
  })

  const heightSubmitBtn = document.createElement('button');
  heightSubmitBtn.classList.add("heightSubmitBtn");
  heightSubmitBtn.textContent = "키 입력";
  heightSubmitBtn.addEventListener('click', () => {
    $profileHeightText.textContent = `${height} cm`;
    localStorage.setItem("USER_HEIGHT", height);
    hightModalDiv.remove();
  });
  hightModalDiv.append(heightSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(hightModalDiv);
}




const $logoutBtn = document.getElementById("logoutBtn");
$logoutBtn.addEventListener('click', () => {
  logout();
})

function logout() {
  axios.get('/auth/logout')
  .then(function (res) {
    if(res.data.redirect == '/page/login') {
      window.location = '/page/login'
    }
  })
  .then((res) => {
    console.log(res);
  })
  .catch(error => {
    $joinError.textContent = "입력한 정보가 올바르지 않습니다";
    console.log(error);
  })
}

