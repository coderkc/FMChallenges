let boxDOM = document.getElementById("boxes");
let tag;
let ids = "weekly";
let buttons = [...document.querySelectorAll(".btn")];

buttons.forEach((el) => el.addEventListener("click", getData));
buttons.forEach((el) => el.addEventListener("click", switchTag));

function switchTag(e) {
  let cLi = e.target.classList;
  ids = e.target.id;

  if (cLi.contains("active")) {
    buttons.map((el) => el.classList.remove("active"));
    cLi.remove("active");
  } else {
    buttons.map((el) => el.classList.remove("active"));
    cLi.add("active");
  }
}

function getData() { 
  fetch("/data.json")
  .then((response) => response.json())
  .then((data) => createBox(data,ids));
}



function createBox(item,ids) {
  let box = "", timeEx;
    
    ids == "daily"
    ? (timeEx = "Day")
    : ids == "weekly"
    ? (timeEx = "Week")
    : ids == "monthly"
    ? (timeEx = "Month")
    : "";
    
    for (let i = 0; i < item.length; i++) {
      box += `
      <div class="col-12 mt-3 ${i < 3 ? "mt-xl-0" : ""} panel">
        <div class="card overflow-hidden ${item[i].title
          .split(" ")
          .join("-")
          .toLowerCase()} bg-darkBlue">
          <div class="card-header py-3"></div>
          <div class="card-body py-4 bg-darkBlue radius">
            <div class="row py-2">
              <div class="col-9">${item[i].title}</div>
              <div class="col-3 text-end">
               <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="row mt-2 align-items-center">
              <div class="col-6 col-xl-12 fs-1 fw-light">
              ${item[i].timeframes[ids].current}hrs
              </div>
              <div class="col-6 col-xl-12 text-end text-xl-start mt-xl-1 txt-paleBlue">
                Last <span id="when">  ${timeEx}</span> - ${ item[i].timeframes[ids].previous }hrs
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    }

    updateDom(box);
  }

function updateDom(box) {
  boxDOM.innerHTML = box;
}


getData();
