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

const Icon = L.Icon.extend({
  options: {
    iconSize: [35, 30],
  },
});

const matchIcon = new Icon({ iconUrl: "./Image/942051.png" });
console.log(matchIcon);
const playgroundIcon = new Icon({ iconUrl: "./Image/pitch (1).png" });
const academyIcon = new Icon({ iconUrl: "./Image/Academy_icon.png" });

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
    desciption: "Boisko z trawiastą nawierzchnią (niepełnowymiarowe)",
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
    desciption:
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
let MatchesArray = [];
let eventsArray = [];
let academyArray = [];

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
  popup.className = "popup-style";
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

  console.log(position.coords.latitude, position.coords.longitude);

  navigationBtns[0].classList.add("active");

  let map = L.map("map").setView([latidude, longitude], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.on("click", (e) => {
    onMapClick(e, map);
  });

  showPlaygroundsInDOM();

  showMarkers(footballPlaygrounds, playgroundIcon, map);

  playgroundSideOption.addEventListener("click", (e) => {
    moveToPopup(e, footballPlaygrounds, "playground", map);
  });

  eventSideOption.addEventListener("click", (e) => {
    moveToPopup(e, eventsArray, "event", map);
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addPlace(map);
    addEvent(map);
    addMatch();
    addAcademy();
  });
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

console.log(contentBoxes);

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
    !element.value.match(regex)
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
  constructor(lat, lng, name, sort, persons, desciption, dataId) {
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.sort = sort;
    this.persons = persons;
    this.desciption = desciption;
    this.dataId = dataId;
  }

  addEventToArray(element) {
    eventsArray.push(element);
  }

  addEventToDOM() {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.setAttribute("data-id", `${this.dataId}`);
    eventDiv.innerHTML = ` 
    <i class="fas fa-soccer-ball fa-3x"></i>
    <p class="name">${this.name}</p>
    <p class="sort">${this.sort}</p>
    <p class="quantity">Needed: ${this.persons}</p>`;
    eventSideOption.append(eventDiv);
  }
}

class Place {
  constructor(lat, lng, name, desciption, dataId) {
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.desciption = desciption;
    this.dataId = dataId;
  }

  addPlaceToArray(element) {
    footballPlaygrounds.push(element);
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

class Match extends Event {
  constructor(
    name,
    home,
    enemy,
    homeImg,
    opponentImg,
    persons,
    date,
    description
  ) {
    super(name, description, persons);
    this.home = home;
    this.enemy = enemy;
    this.homeImg = homeImg;
    this.opponentImg = opponentImg;
    this.date = date;
  }

  addMatchToArray(element) {
    MatchesArray.push(element);
  }

  addMatchToDOM() {
    const div = document.createElement("div");
    div.classList.add("match");
    div.innerHTML = `  
    <div class="teams">
    <div class="small-logo home">
      <img
        src="${this.homeImg}"
        alt="Home-img"
      />
    </div>
    <p class="versus">VS</p>
    <div class="small-logo opponent">
      <img
        src="${this.opponentImg}"
        alt="Away-img"
      />
    </div>
  </div>
  <p class="name">${this.home} vs ${this.enemy}</p>
  <p class="game-date">${this.date}</p>`;

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

function handleFiles(file, holder) {
  const reader = new FileReader();

  reader.onload = function () {
    const img = new Image();

    img.src = reader.result;

    holder.append(img);
  };

  reader.readAsDataURL(file.files[0]);
}

function addEvent(map) {
  if (selectType.value === "event") {
    showValid(kindOfEventInput);
    showValid(eventNameInput);
    numberValidation(latidudeInput, /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/);
    numberValidation(
      longitudeInput,
      /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/
    );

    alertZero();

    if (
      kindOfEventMsg.classList.contains("bad") ||
      eventNameInputMsg.classList.contains("bad") ||
      personNeededElMsg.classList.contains("bad") ||
      latidudeInputMsg.classList.contains("bad") ||
      longitudeInput.classList.contains("bad")
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
        `event-${eventsArray.length}`
      );

      newEvent.addEventToArray(newEvent);
      newEvent.addEventToDOM();
      quantityOfPlayers = 0;
      personNeededEl.value = "";
      clearEventInputs();
      clearDescription();
      showMarkers(eventsArray, matchIcon, map);
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
    alertZero();

    if (
      eventNameInputMsg.classList.contains("bad") ||
      opponentImgInputMsg.classList.contains("bad") ||
      homeImgInputMsg.classList.contains("bad") ||
      personNeededEl.classList.contains("bad") ||
      homeNameInputMsg.classList.contains("bad") ||
      opponentNameInput.classList.contains("bad") ||
      matchDatePickerMsg.classList.contains("bad")
    ) {
      return;
    } else {
      const newMatch = new Match(
        eventNameInput.value,
        homeNameInput.value,
        opponentNameInput.value,
        homeLogoImg.children[0].src,
        opponentLogoImg.children[0].src,
        +personNeededEl.value,
        matchDatePicker.value,
        description.value
      );

      newMatch.addMatchToArray(newMatch);
      newMatch.addMatchToDOM();

      homeLogoImg.children[0].remove();
      opponentLogoImg.children[0].remove();

      homeImgInput.value = "";
      opponentImgInput.value = ``;

      clearInputs(matchFormFields);
      quantityOfPlayers = 0;
      personNeededEl.value = "";
      clearDescription();
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
      newPlace.addPlaceToDOM();
      showMarkers(footballPlaygrounds, playgroundIcon, map);
      console.log(newPlace);
      clearInputs(placeFormFields);
      clearDescription();
    }
  }
}

function addAcademy() {
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

      academyImgHolder.children[0].remove();

      clearInputs(academyFormFields);
      clearDescription();
      console.log(newAcademy);
    }
  }
}

homeImgInput.addEventListener("change", (e) => {
  e.preventDefault();
  handleFiles(homeImgInput, homeLogoImg);
});

opponentImgInput.addEventListener("change", (e) => {
  e.preventDefault();
  handleFiles(opponentImgInput, opponentLogoImg);
});

academyImgInput.addEventListener("change", (e) => {
  e.preventDefault();
  handleFiles(academyImgInput, academyImgHolder);
});

increaseBtn.addEventListener("click", increasePlayers);
decreaseBtn.addEventListener("click", decreasePlayers);
selectType.addEventListener("change", showSuitableForm);
