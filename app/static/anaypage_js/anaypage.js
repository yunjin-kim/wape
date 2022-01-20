import AnayModal from './model/AnayModel.js';
import AnaySleepView from './views/AnaySleepView.js';
import AnayController from './controller/AnayController.js';
import AnayWeightView from './views/AnayWeightView.js';
import AnayGoalView from './views/AnayGoalView.js';
import AnayStepView from './views/AnayStepView.js';

document.addEventListener("DOMContentLoaded", anayMain);

function anayMain() {
  const anayModal = new AnayModal();

  const views = {
    anayStepView: new AnayStepView(),
    anaySleepView: new AnaySleepView(),
    anayWeightView: new AnayWeightView(),
    anayGoalView: new AnayGoalView(),
  };

  new AnayController(anayModal, views);
}

function setUsername() {
  const $anayUsername = document.querySelector(".anayUsername");
  // $anayUsername.textContent = getNameFromCookie();
}

function stepDataErrorModal() {
  const $stepTitle = document.querySelector(".anaypage__walk__title");
  const stepErrorModalDiv = document.createElement("div");
  const stepErrorModalText = document.createElement("p");
  stepErrorModalDiv.classList.add("stepErrorModal");
  stepErrorModalText.classList.add("stepErrorModalText");
  stepErrorModalText.innerHTML =
    "걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";
  stepErrorModalDiv.append(stepErrorModalText);
  $stepTitle.append(stepErrorModalDiv);
}

function showBeforeLunchModal() {
  const $anaypageWalkTitle = document.querySelector(".anaypage__walk__title");
  const updateDataModalDiv = document.createElement("div");
  const updateDataModalClose = document.createElement("button");
  const updateDataTitle = document.createElement("h3");
  updateDataModalDiv.classList.add("updateDataModal");
  updateDataModalClose.classList.add("updateDataModalClose");
  updateDataTitle.classList.add("updateDataModalTitle");
  updateDataModalClose.textContent = "X";
  updateDataModalDiv.addEventListener("click", () => {
    updateDataModalDiv.remove();
  });
  updateDataTitle.innerHTML =
    "<p>당일 걸음 데이터 <br/>12시 이후에 <br/>확인할 수 있습니다</p>";
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataTitle);
  $anaypageWalkTitle.append(updateDataModalDiv);
}

//걸음 데이터가 동기화 되지 않음에 대한 모달
function showUpdateDataModal() {
  const $anaypageWalkTitle = document.querySelector(".anaypage__walk__title");
  const updateDataModalDiv = document.createElement("div");
  const updateDataModalClose = document.createElement("button");
  const updateDataTitle = document.createElement("h3");
  updateDataModalDiv.classList.add("updateDataModal");
  updateDataModalClose.classList.add("updateDataModalClose");
  updateDataTitle.classList.add("updateDataModalTitle");
  updateDataModalClose.textContent = "X";
  updateDataModalDiv.addEventListener("click", () => {
    updateDataModalDiv.remove();
  });
  updateDataTitle.innerHTML =
    "<p>걸음 데이터가 <br/>동기화 되지 않았습니다</p><br/><p>구글 피트니스 앱에서<br/>동기화 해주세요</p>";
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataTitle);
  $anaypageWalkTitle.append(updateDataModalDiv);
}


