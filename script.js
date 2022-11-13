const mapEl = document.querySelector("#map");
const navigationBtns = document.querySelectorAll(".btn.nav");
const optionsBtns = document.querySelectorAll(".btn.option");
const contentBoxes = document.querySelectorAll(".content-box");
const mapContainer = document.querySelector(".map-container");
const selectEl = document.querySelector("select");
const personNeededEl = document.querySelector(".persons-needed");
const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");
const placeFormFields = document.querySelectorAll(".place-data");
const eventFormFields = document.querySelectorAll(".event-data");
const descriptionData = document.querySelector("textarea");
const sideOptions = document.querySelectorAll(".side-option");

console.log(placeFormFields, eventFormFields);

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
  if (selectEl.value === "event" || selectEl.value === "match") {
    hideOn(placeFormFields);
    displayFlex(eventFormFields);
  } else {
    hideOn(eventFormFields);
    displayFlex(placeFormFields);
  }
}

console.log(contentBoxes);

let quantityOfPlayers = 0;

function increasePlayers(e) {
  e.preventDefault();
  quantityOfPlayers++;
  personNeededEl.innerText = quantityOfPlayers;
}

function decreasePlayers(e) {
  e.preventDefault();
  if (quantityOfPlayers <= 0) {
    quantityOfPlayers = 0;
  } else {
    quantityOfPlayers--;
    personNeededEl.innerText = quantityOfPlayers;
  }
}

increaseBtn.addEventListener("click", increasePlayers);
decreaseBtn.addEventListener("click", decreasePlayers);
selectEl.addEventListener("change", showSuitableForm);
