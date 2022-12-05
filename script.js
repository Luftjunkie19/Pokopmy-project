const mapEl = document.querySelector("#map");
const navigationBtns = document.querySelectorAll(".btn.nav");
const optionsBtns = document.querySelectorAll(".btn.option");
const contentBoxes = document.querySelectorAll(".content-box");
const placeFormFields = document.querySelectorAll(".place-data");
const eventFormFields = document.querySelectorAll(".event-data");
const matchFormFields = document.querySelectorAll(".match-data");
const sideOptions = document.querySelectorAll(".side-option");
const selectElements = document.querySelectorAll("select");
const controlFields = document.querySelectorAll(".control-field");
const academyFormFields = document.querySelectorAll(".academy-data");
const mapContainer = document.querySelector(".map-container");
const selectType = document.querySelector("#type");
const personNeededEl = document.querySelector("#persons-needed");
const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");
const description = document.querySelector("textarea");
const submitBtn = document.querySelector(".submit-btn");
const descriptionEl = document.querySelector(".description-data");
//Text-fields
const placeNameInput = document.querySelector("#placename");
const latidudeInput = document.querySelector("#latidude");
const longitudeInput = document.querySelector("#longitude");
const kindOfEventInput = document.querySelector("#kind-event");
const eventNameInput = document.querySelector("#event-name");
const homeImgInput = document.querySelector("#home-team");
const opponentImgInput = document.querySelector("#enemy-team");
const homeNameInput = document.querySelector("#home-name");
const opponentNameInput = document.querySelector("#opponent-name");
const matchDatePicker = document.querySelector("#match-date");
const academyImgInput = document.querySelector("#academy-logo");
const homeLogoImg = document.querySelector(".home-logo");
const opponentLogoImg = document.querySelector(".enemy-logo");
const academyImgHolder = document.querySelector(".academy-img");
//Sidebar Containers
const eventSideOption = document.querySelector(".side-option.events");
const matchSideOption = document.querySelector(".side-option.matches");
const playgroundSideOption = document.querySelector(".side-option.playgrounds");
const academySideOption = document.querySelector(".side-option.academies");
let map;
//Team searcher and creator
const searchTeamInput = document.querySelector("#search-input");
const searchTeamBtn = document.querySelector(".search-btn");
const createNewTeamBtn = document.querySelector(".add-new-team.btn");
//Form popup
const popupForm = document.querySelector(".popup-form");
const closePopupBtn = document.querySelector(".close-btn");
const teamNickInput = document.querySelector("#team-nick");
const foundedDateInput = document.querySelector("#founded-date");
const teamLogoImgInput = document.querySelector("#own-team-logo");
const teamImgHolder = document.querySelector(".logo-team-holder.medium-logo");
const popupSubmitBtn = document.querySelector(".popup-btn");
const resultTeamHolder = document.querySelector(".result-team-holder");
const popupFormFields = document.querySelectorAll(".form-field");
//Description after click Events and Matches
const eventInfoHolder = document.querySelector(".show-info.event-info");
const infoType = document.querySelector(".info-type");
const infoTitle = document.querySelector(".info-title");
const infoDate = document.querySelector(".info-date");
const timeInfo = document.querySelector(".info-time");
const eventDescriptionBox = document.querySelector(
  ".description-box.event-box"
);
//Description after click Academy
const academyInfoHolder = document.querySelector(".show-info.academy-info");
const infoAcademyName = document.querySelector(".academy-name");
const infoAcademyLogo = document.querySelector(".info-img");
const academyDescriptionBox = document.querySelector(
  ".description-box.academy-box"
);
const closeEventInfoBtn = document.querySelector(
  ".close-btn.btn.close-event-info"
);
const closeAcademyInfoBtn = document.querySelector(
  ".close-btn.btn.close-academy-info"
);
const timeInput = document.querySelector("#match-time");

closeEventInfoBtn.addEventListener("click", () => {
  eventInfoHolder.style.opacity = 0;
  eventInfoHolder.style.transform = `translate(0%, 0%)`;
});

closeAcademyInfoBtn.addEventListener("click", () => {
  academyInfoHolder.style.opacity = 0;
  academyInfoHolder.style.transform = `translate(0%, 0%)`;
});


class Team {
  constructor(name, founded, logo) {
    this.name = name;
    this.founded = founded;
    this.logo = logo;
  }

  addTeamToArray(el) {
    teamArray.push(el);
    createdTeams.push(el);
  }

  addToDOM() {
    const div = document.createElement("div");
    div.classList.add("team");
    div.innerHTML = `
    <div class="controll-logo">
<img
  src="${this.logo}"
  alt="Logo klubu"
/>
</div>
<small>Name:</small>
<h2 class="club-name">${this.name}</h2>
<small>Founded in:</small>
<p class="date-club">${this.founded}</p>
<button class="btn show-stats">Statistics</button>`;

    resultTeamHolder.append(div);
  }
}

const Icon = L.Icon.extend({
  options: {
    iconSize: [35, 30],
  },
});

const matchIcon = new Icon({ iconUrl: "./Image/942051.png" });
console.log(matchIcon);
const playgroundIcon = new Icon({ iconUrl: "./Image/pitch (1).png" });
const academyIcon = new Icon({
  iconUrl: "./Image/fa_flat (2).png",
});

let footballPlaygrounds = [
  {
    lat: 53.36905552600669,
    lng: 14.650691305007095,
    name: "Boisko pełnowymiarowe, MORiS Szczecin Prawobrzeże.",
    description: "",
    dataId: "playground-0",
  },
  {
    lat: 53.36846178739087,
    lng: 14.651112644164295,
    name: "Orlik, MORiS Szczecin Prawobrzeże.",
    description: "Orlik ze sztuczną nawierzchnią",
    dataId: "playground-1",
  },
  {
    lat: 53.36320740015133,
    lng: 14.656772988084755,
    name: "Orlik, SP 74 im. Stanisława Grońskiego, Szczecin.",
    description: "Orlik ze sztuczną nawierzchnią",
    dataId: "playground-2",
  },
  {
    lat: 53.3683673645842,
    lng: 14.665738361565003,
    name: "Boisko, za Intermarche, Szczecin.",
    description: "Boisko z trawiastą nawierzchnią (niepełnowymiarowe)",
    dataId: "playground-3",
  },
  {
    lat: 53.3747268330635,
    lng: 14.666672423592805,
    name: "Orlik, SP 37 im. Antoniego Ledóchowskiego, Szczecin.",
    description: "Orlik ze sztuczną nawierzchnią.",
    dataId: "playground-4",
  },
  {
    lat: 53.38065337408911,
    lng: 14.656376928049148,
    name: "Orlik przy CKS, Szczecin Prawobrzeże.",
    description: "Orlik ze sztuczną nawierzchnią.",
    dataId: "playground-5",
  },
  {
    lat: 53.375301282827756,
    lng: 14.690769425627927,
    name: "Boisko Aquilli Szczecin, Szczecin Prawobrzeże.",
    description: "Pełnowymiarowe Boisko Aquilli Szczecin",
    dataId: "playground-6",
  },
  {
    lat: 53.38242605601696,
    lng: 14.638423296454903,
    name: "Orlik przy SP 65, Szczecin Prawobrzeże.",
    description:
      "Orlik ze sztuczną nawierzchnią przy SP 65 im. Antoniego Bolesława Dobrowolskiego",
    dataId: "playground-7",
  },
  {
    lat: 53.394557666577896,
    lng: 14.673681354904422,
    name: "Orlik przy III LO, Szczecin Prawobrzeże.",
    description: "Orlik ze sztuczną nawierzchnią przy III LO",
    dataId: "playground-8",
  },
  {
    lat: 53.40355016657418,
    lng: 14.683832184132953,
    name: "Orlik przy SP 71, Szczecin Prawobrzeże.",
    description:
      "Orlik ze sztuczną nawierzchnią SP 71 im. Bogusława X i Anny Jagielonki",
    dataId: "playground-9",
  },
  {
    lat: 53.364586126592314,
    lng: 14.5958746,
    name: "Orlik przy SP 12, Szczecin Prawobrzeże.",
    description: "Orlik przy SP 12, Szczecin Prawobrzeże.",
    dataId: "playground-10",
  },
  {
    lat: 53.43776572154318,
    lng: 14.745676436553724,
    name: "Boisko OKS Jeziorak, Szczecin Prawobrzeże.",
    description: "Boisko OKS Jeziorak, Szczecin Prawobrzeże.",
    dataId: "playground-11",
  },
  {
    lat: 53.34171384117264,
    lng: 14.76252451756204,
    name: "Boisko Iskierki Szczecin, Szczecin Prawobrzeże.",
    description: "Boisko OKS Jeziorak, Szczecin Prawobrzeże.",
    dataId: "playground-12",
  },
  {
    lat: 53.37339675697874,
    lng: 14.674364563732393,
    name: "Komin Arena, Boisko Kasty Majowe, Szczecin Prawobrzeże.",
    description: "Komin Arena, Boisko Kasty Majowe, Szczecin Prawobrzeże.",
    dataId: "playground-13",
  },
];
let matchesArray = [];
let eventsArray = [];
let academyArray = [];
let teamArray = [];

//Array for created things by you
let createdMatches = [];
let createdEvents = [];
let createdAcademies = [];
let createdTeams = [];
let createdPlaygrounds = [];

function clearSelects() {
  selectElements.forEach((element) => {
    element.value = "";
  });
}
clearSelects();

function hideFirstControls() {
  for (let index = 1; index < controlFields.length; index++) {
    const element = controlFields[index];
    element.style.display = `none`;
  }
}

hideFirstControls();

function moveToPopup(e, array, searchedStuff, map) {
  const searchedEl = e.target.closest(`.${searchedStuff}`);

  const searched = array.find((item) => item.dataId === searchedEl.dataset.id);

  map.setView([searched.lat, searched.lng], 16, {
    animate: true,
    pan: {
      duration: 1.5,
    },
  });
}

function showEventInfo(e, type, array) {
  if (e.target.classList.contains(`${type}`)) {
    let searched = array.find((item) => item.dataId === e.target.dataset.id);

    eventInfoHolder.style.opacity = 1;
    eventInfoHolder.style.transform = `translate(0%, -63%)`;
    infoDate.innerText = `${searched.date.split("-").reverse().join(".")}`;
    infoTitle.innerText = `${searched.name}`;
    infoType.innerText = `${searched.sort}`;
    timeInfo.innerText = `${searched.time}`;
    searched.description === ""
      ? (eventDescriptionBox.innerHTML = `Ten użytkownik nie dodał opisu`)
      : (eventDescriptionBox.innerHTML = `${searched.description}`);
  }
}

function showMatchInfo(e, type, array) {
  if (e.target.classList.contains(`${type}`)) {
    let searched = array.find((item) => item.dataId === e.target.dataset.id);

    eventInfoHolder.style.opacity = 1;
    eventInfoHolder.style.transform = `translate(0%, -63%)`;
    infoDate.innerText = `${searched.date.split("-").reverse().join(".")}`;
    infoTitle.innerText = `${searched.name}`;
    infoType.innerText = `${searched.home} vs ${searched.enemy}`;
    timeInfo.innerText = `${searched.time}`;
    searched.description === ""
      ? (eventDescriptionBox.innerHTML = `Ten użytkownik nie dodał opisu`)
      : (eventDescriptionBox.innerHTML = `${searched.description}`);
  }
}

function showAcademyInfo(e, type, array) {
  if (e.target.classList.contains(`${type}`)) {
    let searched = array.find((item) => item.dataId === e.target.dataset.id);

    console.log(searched);

    academyInfoHolder.style.opacity = 1;
    academyInfoHolder.style.transform = `translate(0%, -50%)`;
    infoAcademyName.innerText = `${searched.name}`;
    infoAcademyLogo.children[0].src = `${searched.academyPicture}`;
    searched.description === ""
      ? (academyDescriptionBox.innerHTML = `Ten użytkownik nie dodał opisu`)
      : (academyDescriptionBox.innerHTML = `${searched.description}`);
  }
}

function showPlaygroundsInDOM() {
  footballPlaygrounds.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add(`playground`);
    div.setAttribute("data-id", `${element.dataId}`);
    div.innerHTML = `
    <div class="small-logo home">
      <img
        src="./Image/pitch (1).png"
        alt="Football-playground"
      />
    </div>
    
    <p class="playground-name">${element.name}</p>

    <div class="coords">
    <small class="coord">Latidude: ${element.lat}</small>
    <small class="coord">Longitude: ${element.lng}</small>
    </div>
    `;
    playgroundSideOption.append(div);
  });
}

const popup = L.popup();
function onMapClick(e, map) {
  popup
    .setLatLng(e.latlng)
    .setContent(
      `Kliknąłeś właśnie w punkt ${e.latlng.toString()}, jeśli to potrzebujesz, skopiuj do formularza.`
    )
    .openOn(map);
}

function success(position) {
  let latidude = position.coords.latitude;
  let longitude = position.coords.longitude;

  navigationBtns[0].classList.add("active");

  let map = L.map("map").setView([latidude, longitude], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 10,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  showPlaygroundsInDOM();

  showMarkers(footballPlaygrounds, playgroundIcon,map);

  map.on("click", (e) => {
    onMapClick(e, map);
  });

  


  playgroundSideOption.addEventListener("click", (e) => {
    moveToPopup(e, footballPlaygrounds, "playground", map);
  });

  eventSideOption.addEventListener("click", (e) => {
    moveToPopup(e, eventsArray, "event", map);
    showEventInfo(e, "event", eventsArray);
  });

  matchSideOption.addEventListener("click", (e) => {
    showMatchInfo(e, "match", matchesArray);
    moveToPopup(e, matchesArray, "match", map);
  });

  academySideOption.addEventListener("click", (e) => {
    showAcademyInfo(e, "academy", academyArray);
    moveToPopup(e, academyArray, "academy", map);
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addPlace(map);
    addEvent(map);
    addMatch();
    addAcademy(map);
  });
  L.control.locate().addTo(map);
}

function showMarkers(array, pinIcon, map) {
  array?.forEach((element) => {
    let marker = L.marker([element.lat, element.lng], { icon: pinIcon }).addTo(
      map
    );

    marker.bindPopup(`${element.name}`);
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
  } else {
    console.log("Oh no, sometthing went wrong");
  }
}
getLocation();

function fail() {
  mapEl.innerHTML = `<h2>Sorry, but</h2>
  <p>You haven't enabled us your Location</p>`;
  mapEl.style.flexDirection = "column";
}

function removeActive(btns) {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function hideOn(boxes) {
  boxes.forEach((box) => {
    box.style.display = "none";
  });
}

function displayFlex(boxes) {
  boxes.forEach((field) => {
    field.style.display = "flex";
  });
}

function clearInputs(boxes) {
  boxes.forEach((box) => {
    const input = box.children[0].children[1];
    input.value = "";
  });
}

function clearDescription() {
  description.value = "";
}

optionsBtns.forEach((btn, i) => {
  hideOn(sideOptions);
  btn.addEventListener("click", () => {
    removeActive(optionsBtns);
    hideOn(sideOptions);
    btn.classList.add("active");
    sideOptions[i].style.display = `block`;
  });
});

navigationBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    removeActive(navigationBtns);
    if (i === 0) {
      mapContainer.style.display = "grid";
      navigationBtns[i].classList.add("active");
      hideOn(contentBoxes);
    } else {
      hideOn(contentBoxes);
      mapContainer.style.display = "none";
      contentBoxes[i - 1].style.display = "flex";
      navigationBtns[i].classList.add("active");
    }
  });
});

function showSuitableForm() {
  descriptionEl.style.display = `flex`;

  if (selectType.value === "event") {
    hideOn(placeFormFields);
    hideOn(matchFormFields);
    hideOn(academyFormFields);
    displayFlex(eventFormFields);
  } else if (selectType.value === "match") {
    hideOn(placeFormFields);
    hideOn(eventFormFields);
    hideOn(academyFormFields);
    displayFlex(matchFormFields);
  } else if (selectType.value === "academy") {
    hideOn(placeFormFields);
    hideOn(eventFormFields);
    hideOn(matchFormFields);
    displayFlex(academyFormFields);
  } else {
    hideOn(academyFormFields);
    hideOn(matchFormFields);
    hideOn(eventFormFields);
    displayFlex(placeFormFields);
  }
}

let quantityOfPlayers = 0;

function increasePlayers(e) {
  e.preventDefault();
  quantityOfPlayers++;
  personNeededEl.value = quantityOfPlayers;
}

function decreasePlayers(e) {
  e.preventDefault();
  if (quantityOfPlayers <= 0) {
    quantityOfPlayers = 0;
  } else {
    quantityOfPlayers--;
    personNeededEl.value = quantityOfPlayers;
  }
}

function showValid(element) {
  const messageField = element.parentElement.nextElementSibling;

  if (element.value.trim("") === "") {
    messageField.classList.add("bad");
    messageField.innerText = `Apologies, but the ${element.id}-input is invalid`;
  } else {
    removeBadClass(element);
  }
}

function clearEventInputs() {
  for (let i = 0; i < 4; i++) {
    const input = eventFormFields[i].children[0].children[1];
    input.value = "";
  }
}

function removeBadClass(element) {
  const messageField = element.parentElement.nextElementSibling;
  console.log(messageField);

  messageField.classList.remove("bad");
  messageField.innerText = ``;
}

function numberValidation(element, regex) {
  const messageField = element.parentElement.nextElementSibling;
  const fieldToNumber = +element.value;

  if (
    isNaN(fieldToNumber) ||
    fieldToNumber === 0 ||
    !element.value.trim("").match(regex)
  ) {
    messageField.classList.add("bad");
    messageField.innerText = `Apologies, but your ${element.id} is not a valid, please change it.`;
  } else {
    removeBadClass(element);
  }
}

function alertZero() {
  if (quantityOfPlayers === 0) {
    const messageField = personNeededEl.parentElement.nextElementSibling;

    messageField.classList.add("bad");
    messageField.innerText = `Increase the quantity of players`;
  } else {
    removeBadClass(personNeededEl);
  }
}

class Event {
  constructor(lat, lng, name, sort, persons, description, dataId, date, time) {
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.sort = sort;
    this.persons = persons;
    this.description = description;
    this.dataId = dataId;
    this.date = date;
    this.time = time;
  }

  addEventToArray(element) {
    eventsArray.push(element);
    createdEvents.push(element);
  }

  addEventToDOM() {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.setAttribute("data-id", `${this.dataId}`);
    eventDiv.innerHTML = ` 
    <i class="fas fa-soccer-ball fa-3x"></i>
    <p class="name">${this.name}</p>
    <p class="sort">${this.sort}</p>
    <p class="quantity">Needed: ${this.persons}</p>
    <p class="game-date">${this.date}, ${this.time}</p>`;
    eventSideOption.append(eventDiv);
  }
}

class Place {
  constructor(lat, lng, name, description, dataId) {
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.description = description;
    this.dataId = dataId;
  }

  addPlaceToArray(element) {
    footballPlaygrounds.push(element);
    createdPlaygrounds.push(element);
  }

  addPlaceToDOM() {
    const div = document.createElement("div");
    div.classList.add(`playground`);
    div.setAttribute("data-id", `${this.dataId}`);
    div.innerHTML = `
    <div class="small-logo home">
      <img
        src="./Image/pitch (1).png"
        alt="Football-playground"
      />
    </div>
    
    <p class="playground-name">${this.name}</p>

    <div class="coords">
    <small class="coord">Latidude: ${this.lat}</small>
    <small class="coord">Longitude: ${this.lng}</small>
    </div>
    `;
    playgroundSideOption.append(div);
  }
}

class Academy extends Place {
  constructor(lat, lng, name, academyPicture, description, dataId) {
    super(lat, lng, name, description, dataId);
    this.academyPicture = academyPicture;
  }

  addAcademyToArray(element) {
    academyArray.push(element);
    createdAcademies.push(element);
  }

  showAcademyInDOM() {
    const div = document.createElement("div");
    div.classList.add("academy");
    div.setAttribute("data-id", `${this.dataId}`);
    div.innerHTML = `
    <div class="small-logo home">
      <img
        src="${this.academyPicture}"
        alt="${this.name}"
      />
    </div>
    
    <p class="playground-name">${this.name}</p>
    `;
    academySideOption.append(div);
  }
}

class Match {
  constructor(
    lat,
    lng,
    name,
    home,
    enemy,
    homeImg,
    opponentImg,
    persons,
    date,
    description,
    dataId,
    time
  ) {
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.description = description;
    this.persons = persons;
    this.dataId = dataId;
    this.date = date;
    this.home = home;
    this.enemy = enemy;
    this.homeImg = homeImg;
    this.opponentImg = opponentImg;
    this.time = time;
  }

  addMatchToArray(element) {
    matchesArray.push(element);
    createdMatches.push(element);
  }

  addMatchToDOM() {
    const div = document.createElement("div");
    div.classList.add("match");
    div.setAttribute("data-id", `${this.dataId}`);
    div.innerHTML = `  
    <div class="teams">
    <div class="controll-logo home">
      <img
        src="${this.homeImg}"
        alt="Home-img"
      />
    </div>
    <p class="versus">VS</p>
    <div class="controll-logo opponent">
      <img
        src="${this.opponentImg}"
        alt="Away-img"
      />
    </div>
  </div>
  <p class="name">${this.home} vs ${this.enemy}</p>
  <p class="game-date">${this.date}, ${this.time}</p>`;

    matchSideOption.append(div);
  }
}

//Input messages
const kindOfEventMsg = kindOfEventInput.parentElement.nextElementSibling;
const eventNameInputMsg = eventNameInput.parentElement.nextElementSibling;
const personNeededElMsg = personNeededEl.parentElement.nextElementSibling;
const latidudeInputMsg = latidudeInput.parentElement.nextElementSibling;
const longitudeInputMsg = longitudeInput.parentElement.nextElementSibling;
const placeNameInputMsg = placeNameInput.parentElement.nextElementSibling;
const homeImgInputMsg = homeImgInput.parentElement.nextElementSibling;
const opponentImgInputMsg = opponentImgInput.parentElement.nextElementSibling;
const homeNameInputMsg = homeNameInput.parentElement.nextElementSibling;
const opponentNameInputMsg = opponentNameInput.parentElement.nextElementSibling;
const matchDatePickerMsg = matchDatePicker.parentElement.nextElementSibling;
const academyImgInputMsg = academyImgInput.parentElement.nextElementSibling;
const teamNickInputMsg = teamNickInput.parentElement.nextElementSibling;
const foundedDateInputMsg = foundedDateInput.parentElement.nextElementSibling;
const teamLogoImgInputMsg = teamLogoImgInput.parentElement.nextElementSibling;
const timeInputMsg = timeInput.parentElement.nextElementSibling;

function removeOtherImages(holder) {
  let allImages = holder.childNodes;

  for (let index = 0; index < allImages.length; index++) {
    const element = allImages[index];
    element.remove();
  }
}

function handleFiles(file, holder) {
  const reader = new FileReader();

  reader.onload = function () {
    const img = new Image();

    img.src = reader.result;

    holder.append(img);
  };

  reader.readAsDataURL(file.files[0]);
}

function addEvent() {
  if (selectType.value === "event") {
    showValid(kindOfEventInput);
    showValid(eventNameInput);
    numberValidation(latidudeInput, /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/);
    numberValidation(
      longitudeInput,
      /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/
    );
    showValid(matchDatePicker);
    showValid(timeInput);
    alertZero();

    if (
      kindOfEventMsg.classList.contains("bad") ||
      eventNameInputMsg.classList.contains("bad") ||
      personNeededElMsg.classList.contains("bad") ||
      latidudeInputMsg.classList.contains("bad") ||
      longitudeInput.classList.contains("bad") ||
      matchDatePickerMsg.classList.contains("bad") ||
      timeInputMsg.classList.contains("bad")
    ) {
      return;
    } else {
      console.log(eventNameInput.value);

      const newEvent = new Event(
        +latidudeInput.value,
        +longitudeInput.value,
        eventNameInput.value,
        kindOfEventInput.value,
        +personNeededEl.value,
        description.value,
        `event-${eventsArray.length}`,
        matchDatePicker.value,
        timeInput.value
      );

      newEvent.addEventToArray(newEvent);
      newEvent.addEventToDOM();
      clearEventInputs();
      timeInput.value = "";
      matchDatePicker.value = "";
      quantityOfPlayers = 0;
      personNeededEl.value = "";
      clearDescription();
    }
  }
}

function addMatch() {
  if (selectType.value === "match") {
    showValid(eventNameInput);
    showValid(opponentImgInput);
    showValid(homeImgInput);
    showValid(homeNameInput);
    showValid(opponentNameInput);
    showValid(matchDatePicker);
    showValid(timeInput);
    numberValidation(latidudeInput, /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/);
    numberValidation(
      longitudeInput,
      /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/
    );
    alertZero();

    if (
      eventNameInputMsg.classList.contains("bad") ||
      opponentImgInputMsg.classList.contains("bad") ||
      homeImgInputMsg.classList.contains("bad") ||
      personNeededEl.classList.contains("bad") ||
      homeNameInputMsg.classList.contains("bad") ||
      opponentNameInput.classList.contains("bad") ||
      matchDatePickerMsg.classList.contains("bad") ||
      timeInputMsg.classList.contains("bad") ||
      latidudeInputMsg.classList.contains("bad") ||
      longitudeInputMsg.classList.contains("bad")
    ) {
      return;
    } else {
      const newMatch = new Match(
        +latidudeInput.value,
        +latidudeInput.value,
        eventNameInput.value,
        homeNameInput.value,
        opponentNameInput.value,
        homeLogoImg.children[homeLogoImg.children.length - 1].src,
        opponentLogoImg.children[opponentLogoImg.children.length - 1].src,
        +personNeededEl.value,
        matchDatePicker.value,
        description.value,
        `match-${matchesArray.length}`,
        timeInput.value
      );

      console.log(newMatch);

      newMatch.addMatchToArray(newMatch);
      newMatch.addMatchToDOM();

      clearDescription();

      homeLogoImg.innerHTML = ``;
      opponentLogoImg.innerHTML = ``;

      timeInput.value = "";
      matchDatePicker.value = "";

      quantityOfPlayers = 0;
      personNeededEl.value = 0;

      homeImgInput.value = "";
      opponentImgInput.value = ``;

      clearInputs(matchFormFields);
    }
  }
}

function addPlace(map) {
  if (selectType.value === "playground") {
    showValid(placeNameInput);
    numberValidation(latidudeInput, /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/);
    numberValidation(
      longitudeInput,
      /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/
    );

    if (
      latidudeInputMsg.classList.contains("bad") ||
      longitudeInputMsg.classList.contains("bad") ||
      placeNameInputMsg.classList.contains("bad")
    ) {
      return;
    } else {
      const newPlace = new Place(
        +latidudeInput.value,
        +longitudeInput.value,
        placeNameInput.value,
        description.value,
        `playground-${footballPlaygrounds.length}`
      );

      newPlace.addPlaceToArray(newPlace);
      setLocalStorage();
      newPlace.addPlaceToDOM();
      showMarkers(footballPlaygrounds, playgroundIcon, map);
      console.log(newPlace);
      clearInputs(placeFormFields);
      clearDescription();
    }
  }
}

function addAcademy(map) {
  if (selectType.value === "academy") {
    showValid(placeNameInput);
    showValid(academyImgInput);
    numberValidation(latidudeInput, /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/);
    numberValidation(
      longitudeInput,
      /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/
    );

    if (
      placeNameInputMsg.classList.contains("bad") ||
      latidudeInputMsg.classList.contains("bad") ||
      longitudeInputMsg.classList.contains("bad") ||
      academyImgInputMsg.classList.contains("bad")
    ) {
      return;
    } else {
      const newAcademy = new Academy(
        +latidudeInput.value,
        +longitudeInput.value,
        placeNameInput.value,
        academyImgHolder.children[0].src,
        description.value,
        `academy-${academyArray.length}`
      );

      newAcademy.addAcademyToArray(newAcademy);
      newAcademy.showAcademyInDOM();

      academyImgHolder.innerHTML = ``;

      clearInputs(academyFormFields);
      clearDescription();
      console.log(newAcademy);
      showMarkers(academyArray, academyIcon, map);
    }
  }
}

function addTeam() {
  showValid(teamNickInput);
  showValid(foundedDateInput);
  showValid(teamLogoImgInput);
  if (
    teamLogoImgInputMsg.classList.contains("bad") ||
    foundedDateInputMsg.classList.contains("bad") ||
    teamLogoImgInput.classList.contains("bad")
  ) {
    return;
  } else {
    const newTeam = new Team(
      teamNickInput.value,
      foundedDateInput.value,
      teamImgHolder.lastChild.src
    );

    newTeam.addTeamToArray(newTeam);
    newTeam.addToDOM();

    clearInputs(popupFormFields);
    teamImgHolder.innerHTML = ``;
    popupForm.style.display = "none";
  }
}


popupSubmitBtn.addEventListener("click", () => {
  addTeam();
});

homeImgInput.addEventListener("change", (e) => {
  e.preventDefault();
  removeOtherImages(homeLogoImg);
  handleFiles(homeImgInput, homeLogoImg);
});

opponentImgInput.addEventListener("change", (e) => {
  e.preventDefault();
  removeOtherImages(opponentLogoImg);
  handleFiles(opponentImgInput, opponentLogoImg);
});

academyImgInput.addEventListener("change", (e) => {
  e.preventDefault();
  removeOtherImages(academyImgHolder);
  handleFiles(academyImgInput, academyImgHolder);
});

increaseBtn.addEventListener("click", increasePlayers);
decreaseBtn.addEventListener("click", decreasePlayers);
selectType.addEventListener("change", showSuitableForm);

createNewTeamBtn.addEventListener("click", () => {
  popupForm.style.display = `flex`;
});

closePopupBtn.addEventListener("click", () => {
  popupForm.style.display = "none";
});

teamLogoImgInput.addEventListener("change", (e) => {
  e.preventDefault();
  removeOtherImages(teamImgHolder);
  handleFiles(teamLogoImgInput, teamImgHolder);
});
