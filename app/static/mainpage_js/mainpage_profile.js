import { getNameFromCookie } from "./getCookie.js";

export function setProfile() {
  const $profileName = document.getElementById('profileName');
  $profileName.textContent = getNameFromCookie();
}

export function setUserTitle() {
  const $userTitle = document.querySelector(".userTitle");
  const getTitleFromLocal = localStorage.getItem("USER_TITLE");
  const parseTitle = JSON.parse(getTitleFromLocal);
  $userTitle.textContent = parseTitle;
  if (!parseTitle) {
    $userTitle.textContent = "걷기 데이터가 없습니다";
  }
}

//프로필 사진 넣는 코드