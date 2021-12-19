import { getResreveDate } from "./mainpage.js";

export function renderCalendar() {
  const daysArray = [];
  const date = new Date();
  const prevMonth = date.getMonth();
  const thisYear = date.getFullYear();
  const thisDay = date.getDate();
  const thisLast = new Date(thisYear, prevMonth+1, 0);
  const prevLast = new Date(thisYear, prevMonth, 0);
  const today = new Date();
  const todayMonth = today.getMonth()+1;
  for (let i = prevLast.getDate() -  prevLast.getDay();  i <= prevLast.getDate(); i++) {
    daysArray.push(i);
  }  
  for (let i = 1; i <= thisLast.getDate(); i++) {
    daysArray.push(i)
  }
  for (let i = 1; i <= 6 - thisLast.getDay(); i++) {
    daysArray.push(i);
  }

  daysArray.forEach((date, i) => {
    if(i >= 0 && i <=  prevLast.getDay() || i >= daysArray.length - (6 - thisLast.getDay())) {
      daysArray[i] = `<div class="NotThisMonth">${date}</div>`
    } else if(i === thisDay +  prevLast.getDay() && prevMonth+1 === todayMonth ) {
      daysArray[i] = `<div class="today thisMonth">${date}</div>`;
    } else{
      daysArray[i] = `<div class="thisMonth">${date}</div>`;
    }
  })

  return daysArray;
}

//달력 걷기 이미지 클릭
export function clickReserveDate(reserveIconClickEvent) {
  const getReserveDate = localStorage.getItem("RESERVE_DATE")
  const parseGetReserveDate = JSON.parse(getReserveDate);
  const walkingArr = [];
  
  parseGetReserveDate.map((reserveDate) => {
    if (reserveDate.date === reserveIconClickEvent.target.textContent) {
      walkingArr.push(reserveDate);
    }
  })
  showReserveModal(walkingArr, reserveIconClickEvent);
}

//예약한 모달
function showReserveModal(walkingArr, reserveIconClickEvent) {
  const getReserveDate = localStorage.getItem("RESERVE_DATE")
  const parseGetReserveDate = JSON.parse(getReserveDate);
  const modalDiv = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalClose = document.createElement('button');
  const modalDate = document.createElement('h3');
  const modalTimeDiv = document.createElement('div');
  modalDiv.classList.add("reserveModal");
  modalTitle.classList.add("reserveModalTitle");
  modalClose.classList.add("reserveModalClose");
  modalDate.classList.add("reserveModalDate");
  modalTimeDiv.classList.add("modalTimeDiv");
  modalTitle.textContent = "걷기 예약";
  modalClose.textContent = "X";

  modalDate.textContent = (`${walkingArr[0].date}일`);
  modalClose.addEventListener('click', () => {
    modalDiv.remove();
  })
  modalDiv.append(modalTitle);
  modalDiv.append(modalClose);
  modalDiv.append(modalDate);

  for (const reserveTime of walkingArr) {
    let modalTime = document.createElement('p');
    let modalTimeDelete = document.createElement('button');
    modalTime.textContent = (`${reserveTime.hour}시 ${reserveTime.minute}분`);
    modalTimeDelete.textContent = "X";
    modalTime.classList.add("reserveModalTime");
    modalTimeDelete.classList.add("reserveDelete");

    modalTimeDelete.addEventListener('click', (e) => {
      for (let i = 0; i < parseGetReserveDate.length; i++) {
        parseGetReserveDate[i].date === e.target.parentNode.previousSibling.textContent.match(/[^일,시,분, ]/gm).join('') &&
        (parseGetReserveDate[i].hour + parseGetReserveDate[i].minute) === e.target.previousSibling.textContent.match(/[^일,시,분, ]/gm).join('') &&
        parseGetReserveDate.splice(i, 1);
      }
      localStorage.setItem("RESERVE_DATE", JSON.stringify(parseGetReserveDate));
      modalDiv.remove();
      getResreveDate();
    })

    modalTimeDiv.append(modalTime);
    modalTimeDiv.append(modalTimeDelete);
  }
  modalDiv.append(modalTimeDiv);
  reserveIconClickEvent.target.parentNode.parentNode.parentNode.parentNode.append(modalDiv)
}