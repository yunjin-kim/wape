import { getResreveDate } from "./mainpage.js";

export const date = new Date();

export let daysArray = [];
const thisYear = date.getFullYear();
const prevMonth = date.getMonth();
const prevLast = new Date(thisYear, prevMonth, 0)

export function renderCalendar() {
  const thisDay = date.getDate();
  const thisLast = new Date(thisYear, prevMonth+1, 0)
  for(let i = prevLast.getDate() -  prevLast.getDay();  i <= prevLast.getDate(); i++ ) {
    daysArray.push(i);
  }

  //이번달이 달력에 들아가는 수
  for(let i = 1; i <= thisLast.getDate(); i++ ) {
    daysArray.push(i);
  }

  //다음달이 달력에 들어가는 수 
  for(let i = 1; i <= 6 - thisLast.getDay(); i++) {
    daysArray.push(i);
  }
  
  const today = new Date();
  const todayMonth = today.getMonth()+1;

  daysArray.forEach((date, i) => {
    if(i >= 0 && i <=  prevLast.getDay() || i >= daysArray.length - (6 - thisLast.getDay())) {
      daysArray[i] = `<div class="NotThisMonth">${date}</div>`
    }
    else if(i === thisDay +  prevLast.getDay() && prevMonth+1 === todayMonth ) {
      daysArray[i] = `<div class="today thisMonth">${date}</div>`;
    }
    else{
      daysArray[i] = `<div class="thisMonth">${date}</div>`;
    }
  })
}

//달력 걷기 이미지 클릭
export function clickReserveDate(reserveIconClickEvent) {
  const getReserveDate = localStorage.getItem("RESERVE_DATE")
  const parseGetReserveDate = JSON.parse(getReserveDate);
  const walkingArr = [];
  
  parseGetReserveDate.map((reserveDate) => {
    if(reserveDate.date === reserveIconClickEvent.target.textContent) {
      walkingArr.push(reserveDate);
    }
  })
  showReserveModal(walkingArr, reserveIconClickEvent)
}

//예약한 모달
function showReserveModal(walkingArr, reserveIconClickEvent) {
  const getReserveDate = localStorage.getItem("RESERVE_DATE")
  const parseGetReserveDate = JSON.parse(getReserveDate);

  const modalDiv = document.createElement('div');
  modalDiv.classList.add("reserveModal")

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add("reserveModalTitle")
  modalTitle.textContent = "걷기 예약"
  modalDiv.append(modalTitle);

  const modalClose = document.createElement('button');
  modalClose.textContent = "X";
  modalClose.classList.add("reserveModalClose")
  modalDiv.append(modalClose);
  modalClose.addEventListener('click', () => {
  modalDiv.remove();
  })

  const modalDate = document.createElement('h3');
  modalDate.textContent = (`${walkingArr[0].date}일`);
  modalDate.classList.add("reserveModalDate")
  modalDiv.append(modalDate);

  const modalTimeDiv = document.createElement('div');
  modalTimeDiv.classList.add("modalTimeDiv")

  for(let reserveTime of walkingArr) {
    let modalTime = document.createElement('p');
    modalTime.textContent = (`${reserveTime.hour}시 ${reserveTime.minute}분`);
    modalTime.classList.add("reserveModalTime")
    modalTimeDiv.append(modalTime);

    let modalTimeDelete = document.createElement('button');
    modalTimeDelete.textContent = "X";
    modalTimeDelete.classList.add("reserveDelete");
    modalTimeDelete.addEventListener('click', (e) => {
      for(let i = 0; i < parseGetReserveDate.length; i++) {
        if(parseGetReserveDate[i].date === e.target.parentNode.previousSibling.textContent.match(/[^일,시,분, ]/gm).join(''))
        if((parseGetReserveDate[i].hour + parseGetReserveDate[i].minute) === e.target.previousSibling.textContent.match(/[^일,시,분, ]/gm).join(''))
        parseGetReserveDate.splice(i, 1);
      }
      localStorage.setItem("RESERVE_DATE", JSON.stringify(parseGetReserveDate));
      modalDiv.remove();
      getResreveDate();
    })
    modalTimeDiv.append(modalTimeDelete);
  }
  modalDiv.append(modalTimeDiv);
  
  reserveIconClickEvent.target.parentNode.parentNode.parentNode.parentNode.append(modalDiv)
}