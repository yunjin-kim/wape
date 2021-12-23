// import { setStepHistory, showStepHistory } from './bankpage_history.js';
// import { getBankStepData, titleModal } from './bankpage_total.js';
import BankController from './controller/BankController.js';
import BankTotalModel from './model/BankModel.js';
import BankHistoryView from './views/BankHistoryView.js';
import BankTotalView from './views/BankTotalView.js';

document.addEventListener("DOMContentLoaded", bankMain);

function bankMain() {
  console.log("bankMain")
  const bankTotalModel = new BankTotalModel();

  const views = {
    bankTotalView: new BankTotalView(),
    bankHistoryView: new BankHistoryView()
  }

  new BankController(bankTotalModel, views)

}


// (function hasStepData() {
//   const getStepDate = localStorage.getItem("STEP_DATA");
//   const parseGetStepDate= JSON.parse(getStepDate);

//   if(parseGetStepDate) {
//     enterBankPage();
//   }
//   else{
//     stepDataErrorModal();
//   }
// })()

function stepDataErrorModal() {
  const $bankTitle = document.querySelector(".bankpage__asset");
  const stepErrorModalDiv = document.createElement('div');
  stepErrorModalDiv.classList.add("stepErrorModal")

  const stepErrorModalText = document.createElement('p');
  stepErrorModalText.classList.add("stepErrorModalText");
  stepErrorModalText.innerHTML = "걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";

  stepErrorModalDiv.append(stepErrorModalText);
  $bankTitle.append(stepErrorModalDiv);
}

function enterBankPage() {
  setWalkData();
  getBankStepData();
  showAllTitle()
  // setStepHistory();
}

//이제까지 걸은 데이터 
function setWalkData() {
  const $stepHistory = document.querySelector(".bankpage__reposit");
  $stepHistory.innerHTML = setStepHistory().join('');
}

//총 걷기 데이터
export function setBankTotalData(totalStepData) {
  const $bankTotalStep = document.querySelector(".bankTotalStep");
  const $bankTotalDistance = document.querySelector(".bankTotalDistance");
  const $bankEarth = document.querySelector(".bankEarth");
  const $bankMaraton = document.querySelector(".bankMaraton");
  const $bankSeoulToBusan = document.querySelector(".bankSeoulToBusan");

  let totalDistance = totalStepData*70/100000;

  $bankTotalStep.textContent = totalStepData;
  $bankTotalDistance.textContent = totalDistance.toFixed(3);
  $bankEarth.textContent = (totalDistance/400000).toFixed(5);
  $bankMaraton.textContent = (totalDistance/42).toFixed(1);
  $bankSeoulToBusan.textContent = (totalDistance/325).toFixed(2);
}

//총 자산 그래프
export function setBankMoneyGraph(bankTotalPrice, bankMoneyGraghMax, bankMoneyGraghMin) {
  const $bankTotalMoney = document.querySelector(".bankTotalMoney");
  const $bankMoneyGraghMin = document.querySelector(".bankMoneyGraghMin");
  const $bankMoneyGraghMax = document.querySelector(".bankMoneyGraghMax");
  const $bankMyMoneyGraph = document.querySelector(".bankpage__asset__graph__my");

  $bankMoneyGraghMax.textContent = bankMoneyGraghMax;
  $bankMoneyGraghMin.textContent = bankMoneyGraghMin;
  $bankMyMoneyGraph.style = `width: ${bankTotalPrice/bankMoneyGraghMax*230}px`;
  $bankTotalMoney.textContent = bankTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function setTitle(currentTitleNum, allTitles) {
  const $currentTitle = document.querySelector(".currentTitle");
  const $nextTitle = document.querySelector(".nextTitle");

  $currentTitle.textContent = allTitles[currentTitleNum-1];
  $nextTitle.textContent = allTitles[currentTitleNum];
}

//모든 칭호 보기
function showAllTitle() {
  const $showAllTitle = document.querySelector(".bankpage__asset__all");
  $showAllTitle.addEventListener('click', (e) => {
    titleModal(e);
  })
}


//1걸음 = 70cm 한걸음 = 5원
function setStepHistory() {
  console.log("setStepHistory")
  const getStepData = localStorage.getItem("STEP_DATA");
  const parseGetStepData = JSON.parse(getStepData);

  const stepValue = _.go(
    parseGetStepData.steps_count,
    _.map(data => data.value)
  );
  const daysValue = _.go(
    parseGetStepData.steps_count,
    _.map(data => (data.endTime[0]+data.endTime[1]))
  );
  let myGoal = localStorage.getItem("STEP_GOAL");


  // showStepHistory(stepValue, daysValue, myGoal)
  const showHistoryArr = [];
  for (const [day, step] of _.zip(daysValue, stepValue)) {
    let myStepGragh = step / myGoal * 262; 
    if (myStepGragh > 262) {
      myStepGragh = 262;    
    }
    const showHistory = `
      <div class="bankpage__reposit__wrap">
        <div class="bankpage__reposit__title">
            <div class="bankpage__reposit__flex">
                <div class="circle"></div>
                <div class="bankpage__reposit__day">
                    <span>${day}</span>일
                </div>
            </div>
            <div class="bankpage__reposit__value">
                <h3>
                    <span>${(step * 0.0007).toFixed(1)}</span>km 걷고<br>
                    <span>${step * 5}</span>원 벌었어요
                </h3>
            </div>
        </div>
        <div class="bankpage__reposit__walk">
            <div class="bankpage__reposit__walk__flex">
                <h4><b>걸음 수 </b><span>${step}</span> 걸음</h4>
                <p><span>${myGoal}</span>걸음</p>
            </div>
            <div class="bankpage__reposit__walk__graph">
                <div class="bankpage__reposit__walk__total"></div>
                <div class="bankpage__reposit__walk__my" style="width: ${myStepGragh}px"></div>
            </div>
        </div>
        <div class="bankpage__reposit__money">
            <div class="bankpage__reposit__money__flex">
                <h4><b>금액 </b><span>${step * 5}</span> 원</h4>
                <p><span>${myGoal*5}</span>원</p>
            </div>
            <div class="bankpage__reposit__money__graph">
                <div class="bankpage__reposit__money__total"></div>
                <div class="bankpage__reposit__money__my" style="width: ${myStepGragh}px"></div>
            </div>
        </div>
      </div>
    `;
    showHistoryArr.unshift(showHistory)
  }

  return showHistoryArr;
}

//은행 걷기 데이터
function getBankStepData() {
  const getTotalStepData = localStorage.getItem("STEP_DATA");
  const parseTotalStepData = JSON.parse(getTotalStepData);
  let totalStepData = _.go(
    parseTotalStepData.steps_count,
    _.map(data => data.value),
    _.reduce(_.add)
  );

  setBankTotalData(totalStepData)
  setBankData(totalStepData)
}

//은행 돈 그래프 
function setBankData(totalStepData) {
  const allTitles = ["방구석에 콕", "걷기 비기너", "걷기 주니어", "걷기 프로", "마라톤 선수", ""];
  let currentTitleNum;
  let bankTotalPrice = totalStepData*5;
  let bankMoneyGraghMax;
  let bankMoneyGraghMin;
  if(bankTotalPrice >= 0 &&  bankTotalPrice <= 100000) {
    bankMoneyGraghMax = 100000;
    bankMoneyGraghMin = 0;
    currentTitleNum = 0;
  } else if(bankTotalPrice > 100000 &&  bankTotalPrice <= 500000) {
    bankMoneyGraghMax = 500000;
    bankMoneyGraghMin = 100000;
    currentTitleNum = 1;
  } else if(bankTotalPrice > 500000 &&  bankTotalPrice <= 1000000) {
    bankMoneyGraghMax = 1000000;
    bankMoneyGraghMin = 500000;
    currentTitleNum = 2;
  } else if(bankTotalPrice > 1000000 &&  bankTotalPrice <= 3000000) {
    bankMoneyGraghMax = 3000000;
    bankMoneyGraghMin = 1000000;
    currentTitleNum = 3;
  } else if(bankTotalPrice > 3000000 &&  bankTotalPrice <= 10000000) {
    bankMoneyGraghMax= 10000000;
    bankMoneyGraghMin = 3000000;
    currentTitleNum = 4;
  }
  
  localStorage.setItem("USER_TITLE", JSON.stringify(allTitles[currentTitleNum - 1]))
  setBankMoneyGraph(bankTotalPrice, bankMoneyGraghMax, bankMoneyGraghMin)
  setTitle(currentTitleNum, allTitles)
}

//칭모 모달 생성
function titleModal(e) {
  const allTitles = ["방구석에 콕", "걷기 비기너", "걷기 주니어", "걷기 프로", "마라톤 선수", ""];
  const titleModaleBox = document.createElement('div');
  const titleModalTitle = document.createElement("h2");
  const titleModalClose = document.createElement('button');
  titleModalTitle.textContent = "모든 칭호";
  titleModalClose.textContent = "X";
  titleModalClose.classList.add("titleModalClose");
  titleModaleBox.classList.add("titleModal");
  titleModalTitle.classList.add("titleModalTitle");
  titleModalClose.addEventListener('click', () => {
    titleModaleBox.remove()
  })
  titleModaleBox.append(titleModalClose)
  titleModaleBox.append(titleModalTitle)
  _.map(title => {
    const titles = document.createElement('p');
    titles.classList.add("titles")
    titles.textContent = title;
    titleModaleBox.append(titles);
  }, allTitles)

  e.target.parentNode.parentNode.parentNode.parentNode.append(titleModaleBox);
}

// function showStepHistory(stepValue, daysValue, myGoal) {
//   console.log("showStepHistory")
//   const showHistoryArr = [];
//   for (const [day, step] of _.zip(daysValue, stepValue)) {
//     let myStepGragh = step / myGoal * 262; 
//     if (myStepGragh > 262) {
//       myStepGragh = 262;    
//     }
//     const showHistory = `
//       <div class="bankpage__reposit__wrap">
//         <div class="bankpage__reposit__title">
//             <div class="bankpage__reposit__flex">
//                 <div class="circle"></div>
//                 <div class="bankpage__reposit__day">
//                     <span>${day}</span>일
//                 </div>
//             </div>
//             <div class="bankpage__reposit__value">
//                 <h3>
//                     <span>${(step * 0.0007).toFixed(1)}</span>km 걷고<br>
//                     <span>${step * 5}</span>원 벌었어요
//                 </h3>
//             </div>
//         </div>
//         <div class="bankpage__reposit__walk">
//             <div class="bankpage__reposit__walk__flex">
//                 <h4><b>걸음 수 </b><span>${step}</span> 걸음</h4>
//                 <p><span>${myGoal}</span>걸음</p>
//             </div>
//             <div class="bankpage__reposit__walk__graph">
//                 <div class="bankpage__reposit__walk__total"></div>
//                 <div class="bankpage__reposit__walk__my" style="width: ${myStepGragh}px"></div>
//             </div>
//         </div>
//         <div class="bankpage__reposit__money">
//             <div class="bankpage__reposit__money__flex">
//                 <h4><b>금액 </b><span>${step * 5}</span> 원</h4>
//                 <p><span>${myGoal*5}</span>원</p>
//             </div>
//             <div class="bankpage__reposit__money__graph">
//                 <div class="bankpage__reposit__money__total"></div>
//                 <div class="bankpage__reposit__money__my" style="width: ${myStepGragh}px"></div>
//             </div>
//         </div>
//       </div>
//     `;
//     showHistoryArr.unshift(showHistory)
//   }

//   return showHistoryArr;
// }