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



