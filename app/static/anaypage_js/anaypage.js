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

function showBeforeLunchModal() {
  updateDataModalDiv.addEventListener("click", () => {
    updateDataModalDiv.remove();
  });
}

//걸음 데이터가 동기화 되지 않음에 대한 모달
function showUpdateDataModal() {
  updateDataModalDiv.addEventListener("click", () => {
    updateDataModalDiv.remove();
  });

}


