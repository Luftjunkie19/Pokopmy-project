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
const homeTeamInput = document.querySelector("#home-team");
const opponentTeamInput = document.querySelector("#enemy-team");
//Sidebar Containers
const eventSideOption = document.querySelector(".side-option.events");
let footballPlaygrounds = [
  {
    lat: 53.36905552600669,
    lng: 14.650691305007095,
    popup: "Boisko pełnowymiarowe, MORiS Szczecin Prawobrzeże.",
  },
  {
    lat: 53.36846178739087,
    lng: 14.651112644164295,
    popup: "Orlik ze sztuczną nawierzchnią, MORiS Szczecin Prawobrzeże.",
  },
  {
    lat: 53.36320740015133,
    lng: 14.656772988084755,
    popup:
      "Orlik ze sztuczną nawierzchnią, SP 74 im. Stanisława Grońskiego, Szczecinie.",
  },
  {
    lat: 53.3683673645842,
    lng: 14.665738361565003,
    popup:
      "Boisko z trawiastą nawierzchnią (niepełnowymiarowe), za Intermarche, Szczecin.",
  },
  {
    lat: 53.3747268330635,
    lng: 14.666672423592805,
    popup:
      "Orlik ze sztuczną nawierzchnią, SP 37 im. Antoniego Ledóchowskiego, Szczecin.",
  },
  {
    lat: 53.38065337408911,
    lng: 14.656376928049148,
    popup: "Orlik ze sztuczną nawierzchnią przy CKS, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.375301282827756,
    lng: 14.690769425627927,
    popup: "Pełnowymiarowe Boisko Aquilli Szczecin, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.38242605601696,
    lng: 14.638423296454903,
    popup:
      "Orlik ze sztuczną nawierzchnią przy SP 65 im. Antoniego Bolesława Dobrowolskiego, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.394557666577896,
    lng: 14.673681354904422,
    popup: "Orlik ze sztuczną nawierzchnią przy III LO, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.40355016657418,
    lng: 14.683832184132953,
    popup:
      "Orlik ze sztuczną nawierzchnią SP 71 im. Bogusława X i Anny Jagielonki, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.364586126592314,
    lng: 14.5958746,
    popup: "Orlik przy SP 12, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.43776572154318,
    lng: 14.745676436553724,
    popup: "Boisko OKS Jeziorak, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.34171384117264,
    lng: 14.76252451756204,
    popup: "Boisko Iskierki Szczecin, Szczecin Prawobrzeże.",
  },
  {
    lat: 53.37339675697874,
    lng: 14.674364563732393,
    popup: "Komin Arena, Boisko Kasty Majowe, Szczecin Prawobrzeże.",
  },
];
let MatchesArray = [];
let EventsArray = [];
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

function success(position) {
  let latidude = position.coords.latitude;
  let longitude = position.coords.longitude;

  console.log(position.coords.latitude, position.coords.longitude);

  showMap(latidude, longitude);
}

function showMarkers(ground, map) {
  let marker = L.marker([ground.lat, ground.lng]).addTo(map);

  marker.bindPopup(`${ground.popup}`);
}

function showMap(lat, lng) {
  let map = L.map("map").setView([lat, lng], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  navigationBtns[0].classList.add("active");

  footballPlaygrounds.forEach((ground) => {
    showMarkers(ground, map);
  });

  map.on("click", (e) => {
    console.log(e.latlng);
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
    displayFlex(eventFormFields);
  } else if (selectType.value === "match") {
    hideOn(placeFormFields);
    displayFlex(eventFormFields);
    displayFlex(matchFormFields);
  } else {
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

function showEmpty(element) {
  const messageField = element.parentElement.nextElementSibling;

  messageField.classList.add("bad");
  messageField.innerText = `Apologies, but the ${element.id}-input is invalid`;
}

function clearEventInputs() {
  for (let i = 0; i < 2; i++) {
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

function alertZero() {
  const messageField = personNeededEl.parentElement.nextElementSibling;

  messageField.classList.add("bad");
  messageField.innerText = `Increase the quantity of players`;
}

class Event {
  constructor(name, sort, persons, desciption) {
    this.name = name;
    this.sort = sort;
    this.persons = persons;
    this.desciption = desciption;
  }

  addToDOM() {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.innerHTML = ` 
    <i class="fas fa-soccer-ball fa-3x"></i>
    <p class="name">${this.name}</p>
    <p class="sort">${this.sort}</p>
    <p class="quantity">Needed: ${this.persons}</p>`;
    eventSideOption.append(eventDiv);
  }
}

class Place {
  constructor(latidude, longitude, name, desciption) {
    this.latidude = latidude;
    this.longitude = longitude;
    this.name = name;
    this.desciption = desciption;
  }
}

class Match extends Event {
  constructor(name, home, enemy, persons, description) {
    super(name, description, persons);
    this.home = home;
    this.enemy = enemy;
  }
}

function addEvent() {
  if (selectType.value === "event") {
    if (kindOfEventInput.value.trim("") === "") {
      showEmpty(kindOfEventInput);
    }

    if (eventNameInput.value.trim("") === "") {
      showEmpty(eventNameInput);
    }

    if (personNeededEl.value.trim("") === "") {
      alertZero();
    } else {
      console.log(eventNameInput.value);
      removeBadClass(personNeededEl);
      removeBadClass(kindOfEventInput);
      removeBadClass(eventNameInput);

      const newEvent = new Event(
        eventNameInput.value,
        kindOfEventInput.value,
        +personNeededEl.value,
        description.value
      );

      console.log(newEvent);
      newEvent.addToDOM();

      quantityOfPlayers = 0;
      personNeededEl.value = "";
      clearEventInputs();
      clearDescription();
    }
  }
}

function addMatch() {
  if (selectType.value === "match") {
  }
}

function addPlace() {
  if (selectType.value === "academy" || selectType.value === "playground") {
    if (isNaN(+latidudeInput.value) || latidudeInput.value.trim("") === "") {
      showEmpty(latidudeInput);
    }

    if (isNaN(+longitudeInput.value) || longitudeInput.value.trim("") === "") {
      showEmpty(longitudeInput);
    } else {
      removeBadClass(latidudeInput);
      removeBadClass(longitudeInput);
      removeBadClass(placeNameInput);

      const newPlace = new Place(
        +latidudeInput.value,
        +longitudeInput.value,
        placeNameInput.value,
        description.value
      );

      console.log(newPlace);
      clearInputs(placeFormFields);
      clearDescription();
    }
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addPlace();
  addEvent();
});

increaseBtn.addEventListener("click", increasePlayers);
decreaseBtn.addEventListener("click", decreasePlayers);
selectType.addEventListener("change", showSuitableForm);
