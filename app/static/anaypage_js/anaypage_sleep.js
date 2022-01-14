// import { setSleepChart, sleepWeekNum, setSleepDataAverage } from './anaypage.js';
// import { groupBySize, L } from '../fx.js';

// //현재 수면 모달
// export function showSleepModal(e) {
//   const $noSleepDiv = document.querySelector(".anaypage__nosleep__current");
//   const sleepModalDiv = document.createElement('div');
//   const sleepTitle = document.createElement('h3');
//   const sleepModalClose = document.createElement('button');
//   const sleepInput = document.createElement('input');
//   const sleepSubmitBtn = document.createElement('button');
//   let currnetSleep;
//   sleepModalDiv.classList.add("sleepModal");
//   sleepTitle.classList.add("weightModalTitle");
//   sleepModalClose.classList.add("sleepModalClose");
//   sleepInput.classList.add("sleepInput");
//   sleepSubmitBtn.classList.add("sleepSubmitBtn");
//   sleepTitle.textContent = "수면 시간";
//   sleepModalClose.textContent = "X";
//   sleepSubmitBtn.textContent = "시간 입력";
//   sleepInput.setAttribute('type','number')
//   sleepInput.setAttribute('placeholder', '7시간30분 = 7.3');

//   sleepModalClose.addEventListener('click', () => {
//     sleepModalDiv.remove()
//   })

//   sleepInput.addEventListener('change', (e) => {
//     currnetSleep = e.target.value;
//   })

//   sleepSubmitBtn.addEventListener('click', () => {
//     const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
//     const parseTotalSleepData = JSON.parse(getTotalSleepData);
//     $noSleepDiv.classList.add("hiddenDiv")
//     parseTotalSleepData[0][0][2] = currnetSleep;
//     localStorage.setItem("CURRENT_SLEEP", JSON.stringify(parseTotalSleepData))
//     sleepModalDiv.remove()
//     rangeSleepData()
//     setCurrentSleep()
//     setSleepChart(sleepWeekNum)
//     setSleepDataAverage(sleepWeekNum)
//     setSleepChartHeight(sleepWeekNum)
//   })

//   sleepModalDiv.append(sleepTitle, sleepModalClose, sleepInput, sleepSubmitBtn)
//   e.target.parentNode.parentNode.parentNode.parentNode.append(sleepModalDiv)
// }

// //현재 수면 설정
// export function setCurrentSleep() {
//   const $noSleepDiv = document.querySelector(".anaypage__nosleep__current");
//   const $currnetSleep = document.querySelector(".currnetSleep");
//   const $sleepDiv = document.querySelector(".anaypage__sleep__current");
//   const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
//   const parseTotalSleepData = JSON.parse(getTotalSleepData);

//   if (parseTotalSleepData) {
//     if (parseTotalSleepData[0][0][2] === "") {
//       $noSleepDiv.classList.remove("hiddenDiv")
//       $sleepDiv.classList.add("hiddenDiv")
//       $noSleepDiv.innerHTML = `<span class="noWeight">수면 시간을 적어주세요</span>`;
//     } else {
//       $sleepDiv.classList.remove("hiddenDiv")
//       $currnetSleep.textContent = `${parseTotalSleepData[0][0][2]}`;
//     }
//   } else {
//     $noSleepDiv.classList.remove("hiddenDiv");
//     $sleepDiv.classList.add("hiddenDiv");
//     $noSleepDiv.innerHTML = `<span class="noWeight">수면시간을 적어주세요</span>`;
//   }
// }

// export function rangeSleepData() {
//   const date = new Date();
//   const thisYear = date.getFullYear();
//   const lastMonth = date.getMonth();
//   const prevLast = new Date(thisYear, lastMonth, 0)
//   const prevLastDate = prevLast.getDate();
//   const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
//   const parseTotalSleepData = JSON.parse(getTotalSleepData);
//   let todayDate = date.getDate();
//   let thisMonth = lastMonth + 1;
//   let monthSleepDataArr = [];

//   _.go(
//     L.range(Infinity),
//     L.map(rangeNum => rangeNum == todayDate ? (thisMonth -= 1, rangeNum) : rangeNum),
//     L.map(rangeNum => rangeNum >= todayDate 
//           ? monthSleepDataArr.push([thisMonth, prevLastDate + todayDate - rangeNum]) 
//           : monthSleepDataArr.push([thisMonth, todayDate - rangeNum])),
//     _.take(28),
//     _.map(rangeNum => monthSleepDataArr[rangeNum-1][2] = ""));

//     monthSleepDataArr = _.go(
//       monthSleepDataArr,
//     _.map(sleepData => sleepData),
//     groupBySize(7),
//     _.values);
    
//   if (parseTotalSleepData && parseTotalSleepData[0][0][1] !== date.getDate()) { //로컬에 데이터가 있다면 오늘 날짜와 다르다면
//     console.log("다음날이 되었다")
//     const monthSleepDataArrFlat = monthSleepDataArr.flat();
//     const parseTotalSleepDataFlat = parseTotalSleepData.flat();

//     _.go(
//       parseTotalSleepDataFlat,
//       _.filter(localSleepData => localSleepData[2] > 0),
//       _.map(localSleepData => _.go(
//         monthSleepDataArrFlat,
//           _.filter(sleeptData => sleeptData[0] === localSleepData[0]),
//           _.filter(sleeptData => sleeptData[1] === localSleepData[1]),
//           _.map(sleeptData => sleeptData[2] = localSleepData[2]))));

//     localStorage.setItem("CURRENT_SLEEP", JSON.stringify(monthSleepDataArr));
//   } else if (!parseTotalSleepData) { //로컬에 데이터 없다면 초기 상태
//     localStorage.setItem("CURRENT_SLEEP", JSON.stringify(monthSleepDataArr));
//   }
// }

// //수면 차트 값 넣어주기
// export function setSleepChartHeight(sleepWeekNum) {
//   const reverseSleepBoxArr = setSleepChart().slice().reverse();
//   const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
//   const parseTotalSleepData = JSON.parse(getTotalSleepData);
//   if (!sleepWeekNum) sleepWeekNum = 0;

//   for (const [sleepData, sleepDiv] of _.zip(parseTotalSleepData[sleepWeekNum], reverseSleepBoxArr)) {
//     sleepData[2] > 0 
//     ? (sleepDiv.children[1].style.height = `${sleepData[2]*10}px`,
//     sleepDiv.children[0].textContent = `${sleepData[2]}`)
//     : (sleepDiv.children[1].style.height = "0px",
//     sleepDiv.children[0].textContent = "");
//   }
// }
