import { onToday, lastMonthDate } from '../mainpage_js/mainpage_reserve.js';
import { setWeightChart, weightWeekNum } from './anaypage.js';

//목표 체중 모달
const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");

export function showGoalWeihgtModal(e){
  const goalWeightModalDiv = document.createElement('div');
  goalWeightModalDiv.classList.add("goalWeightModal")

  const goalWeightTitle = document.createElement('h3');
  goalWeightTitle.classList.add("goalWeightModalTitle");
  goalWeightTitle.textContent = "목표 체중"
  goalWeightModalDiv.append(goalWeightTitle);

  const goalWeightModalClose = document.createElement('button');
  goalWeightModalClose.textContent = "X";
  goalWeightModalClose.classList.add("goalWeightModalClose")
  goalWeightModalDiv.append(goalWeightModalClose);
  goalWeightModalClose.addEventListener('click',()=>{
    goalWeightModalDiv.remove();
  })

  let goalWeight;
  const goalWeightInput = document.createElement('input');
  goalWeightInput.classList.add("goalWeightInput");
  goalWeightInput.setAttribute('type','number');
  goalWeightModalDiv.append(goalWeightInput);
  goalWeightInput.addEventListener('change', (e)=>{
    goalWeight = e.target.value;
  })

  const goalWeightSubmitBtn = document.createElement('button');
  goalWeightSubmitBtn.classList.add("goalWeightSubmitBtn");
  goalWeightSubmitBtn.textContent = "목표 설정";
  goalWeightSubmitBtn.addEventListener('click', ()=>{
    localStorage.setItem("GOAL_WEIGHT", goalWeight);
    goalWeightModalDiv.remove();
    $noWeightGoalDiv.classList.add("hiddenDiv");
    setGoalWeight();
  });
  goalWeightModalDiv.append(goalWeightSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(goalWeightModalDiv);
}

//목표 체중 설정
export function setGoalWeight(){
  const $goalWeight = document.querySelector(".goalWeight");
  const $goalWeihgtDiv = document.querySelector(".anaypage__weight__accure");
  let getGoalWeight = localStorage.getItem("GOAL_WEIGHT");
  let parseGoalWeight = JSON.parse(getGoalWeight);

  if(parseGoalWeight){
    $goalWeihgtDiv.classList.remove("hiddenDiv");
    $goalWeight.textContent = `${parseGoalWeight}kg`;
  }
  else{
    $noWeightGoalDiv.classList.remove("hiddenDiv");
    $goalWeihgtDiv.classList.add("hiddenDiv");
    $noWeightGoalDiv.innerHTML = `<span class="noWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}

//현재 체중 모달
const $noWeightDiv = document.querySelector(".anaypage__noweight__current");
export function showWeihgtModal(e){
  const measureDay = new Date().getDate();

  const weightModalDiv = document.createElement('div');
  weightModalDiv.classList.add("weightModal")

  const weightTitle = document.createElement('h3');
  weightTitle.classList.add("weightModalTitle");
  weightTitle.textContent = "현재 체중"
  weightModalDiv.append(weightTitle);

  const weightModalClose = document.createElement('button');
  weightModalClose.textContent = "X";
  weightModalClose.classList.add("weightModalClose")
  weightModalDiv.append(weightModalClose);
  weightModalClose.addEventListener('click',()=>{
    weightModalDiv.remove();
  })

  let currnetWeight
  const weightInput = document.createElement('input');
  weightInput.classList.add("weightInput");
  weightInput.setAttribute('type','number');
  weightModalDiv.append(weightInput);
  weightInput.addEventListener('change', (e)=>{
    currnetWeight = e.target.value;
  })

  const weightSubmitBtn = document.createElement('button');
  weightSubmitBtn.classList.add("weightSubmitBtn");
  weightSubmitBtn.textContent = "체중 입력";

  weightSubmitBtn.addEventListener('click', ()=>{
    let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
    let parseTotalWeightData = JSON.parse(getTotalWeightData);

  if(parseTotalWeightData){
    if(parseTotalWeightData[parseTotalWeightData.length - 2] === measureDay){
      console.log(parseTotalWeightData)
      parseTotalWeightData.pop();
      parseTotalWeightData.pop();
      console.log(parseTotalWeightData)
      console.log(parseTotalWeightData.concat([measureDay, currnetWeight]))
      localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData.concat([measureDay, currnetWeight])));
    }
  }
  else{
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify([measureDay, currnetWeight]));
  }
  weightModalDiv.remove();
  $noWeightDiv.classList.add("hiddenDiv");

  rangeWeightData();
  setCurrentWeight();
  setWeightChart(weightWeekNum);
  });
  
  weightModalDiv.append(weightSubmitBtn);
  e.target.parentNode.parentNode.parentNode.parentNode.append(weightModalDiv);
}

//현재 체중 설정
export function setCurrentWeight(){
  const $currnetWeight = document.querySelector(".currnetWeight");
  const $weightDiv = document.querySelector(".anaypage__weight__current");
  let getWeight = localStorage.getItem("CURRENT_WEIGHT");
  let parseWeight = JSON.parse(getWeight);

  if(parseWeight){
    if(parseWeight[parseWeight.length - 1] === ""){
      $noWeightDiv.classList.remove("hiddenDiv");
      $weightDiv.classList.add("hiddenDiv");
      $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
    }
    else{
      $weightDiv.classList.remove("hiddenDiv");
      $currnetWeight.textContent = `${parseWeight[parseWeight.length-1]}kg`;
    }

  }
  else{
    $noWeightDiv.classList.remove("hiddenDiv");
    $weightDiv.classList.add("hiddenDiv");
    $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
  }
}

export function setuntilGoalWeight(){
  let getWeight = localStorage.getItem("GOAL_WEIGHT");
  let parseWeight = JSON.parse(getWeight);
  let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  return parseTotalWeightData[parseTotalWeightData.length-1]-parseWeight;
}

export let weightDataArr = [[], [], [], []];
// 들어왔는데 체중을 입력하지 않으면 그래프에서 해당 날짜가 밀리기 때문에 입력하지 않으면 빈값으로 넣어주기
//그러나 앱 자체를 들어오지 않는다면?
// 오랜만에 들어온다? -> 로컬에 있는 데이터 로칼 길이 -2 값을 찾는다 -> 찾은 값 +1 부터 오늘 날짜까지 -> 날짜,"" 이렇게 넣어준다
//근데 만약에 안 들어온 날짜가 29일이고 다시 들어온 날짜가 2일 이라면 -> 로컬 -2 데이터가 오늘 날짜 보다 크다면 -> 로컬 -2에서 저번달 마지막 날짜까지하고 1일부터 오늘 날짜까지 넣어준다
export function rangeWeightData(){
  let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  if(!parseTotalWeightData ){
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify([onToday, ""]));
  }

  if(parseTotalWeightData){
    let isWeightToday = parseTotalWeightData.find((date)=> date === onToday)

    if(!isWeightToday){
      localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData.concat([onToday, ""])));
    }
    let reverseWeightData = parseTotalWeightData.reverse();
    
    let weightDataArrNum = 0;
    weightDataArr = [[], [], [], []];
    for(let i = 0; i < 56; i++){
      if(!reverseWeightData[i]) reverseWeightData[i] = "";
        weightDataArr[weightDataArrNum].push(reverseWeightData[i]);
        if(weightDataArr[weightDataArrNum].length > 13) weightDataArrNum++;
        if(weightDataArrNum === 4) break;
    }
  }
  else{
    console.log("데이터 없다")
  }
}

//체중 날짜 세팅 
export function setWeightDate(weightBoxArr, weightWeekNum){
  
  let oneMonthDateArr = [];
  let todayDate = onToday;
  todayDate -= weightWeekNum*7;
  for(let i = 0; i <= 29; i++){
    let date = todayDate - i;
    if(date === 0){
      for(let j = 0; j <= 30 - oneMonthDateArr.length; j++){
        oneMonthDateArr.push(lastMonthDate - j);
      }
      break;
    } 
    oneMonthDateArr.push(date);
  }

  for(let i = 0; i < 7; i++){
    weightBoxArr[6-i].id = oneMonthDateArr[i];
  }
}

//체중 차트 값 넣어주기
export function setWeightChartHeight(weightBoxArr ,weightWeekNum){
  let reverseWeightBoxArr = weightBoxArr.slice().reverse()
  let divPoint = 0;
  let dataPoint = 0;
  
  if(weightDataArr[0].length > 0){

    while(divPoint !== reverseWeightBoxArr.length){
      if(Number(reverseWeightBoxArr[divPoint].id) === (weightDataArr[weightWeekNum][dataPoint])){
        reverseWeightBoxArr[divPoint].children[1].style.height = `${weightDataArr[weightWeekNum][dataPoint-1]}px`;
        reverseWeightBoxArr[divPoint].children[0].textContent = weightDataArr[weightWeekNum][dataPoint-1];
        divPoint++;
        dataPoint++;
      }
      else{
        reverseWeightBoxArr[divPoint].children[1].style.height = `7px`;
        reverseWeightBoxArr[divPoint].children[0].textContent = "";

        if(weightDataArr[weightWeekNum][dataPoint] === ""){
          if(weightDataArr[weightWeekNum][dataPoint-1] === ""){//날짜값도 ""고 체중값도 ""라면 초기에 데이터 없을 때
            divPoint++;
          }
          else{
            dataPoint++;
          }
        }
        else if(weightDataArr[weightWeekNum][dataPoint] < 32 && weightDataArr[weightWeekNum][dataPoint] === "string"){
          console.log(typeof(weightDataArr[weightWeekNum][dataPoint]))
            divPoint++
        }
        else{
          dataPoint++
        }
      }
      if(divPoint > 30 || dataPoint > 30){
        break;
      }
    }
  }
  else{
    console.log("데이터 없다")
  }
}