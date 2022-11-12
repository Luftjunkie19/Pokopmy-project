const mapEl = document.querySelector("#map");
const navigationBtns = document.querySelectorAll(".btn.nav");
const optionsBts = document.querySelectorAll(".btn.option");
const contentBoxes = document.querySelectorAll(".content-box");
const mapContainer = document.querySelector(".map-container");

const selectEl = document.querySelector("select");

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

  /*map.on("click", (e) => {
    setYourOwnMarker(e, map);
  });*/

  navigationBtns[0].classList.add("active");

  footballPlaygrounds.forEach((ground) => {
    showMarkers(ground, map);
  });
}

/*function setYourOwnMarker(e, map) {
  let marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  footballPlaygrounds.push(marker);
  console.log(footballPlaygrounds);
}*/

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

function removeActive() {
  navigationBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function hideOn() {
  contentBoxes.forEach((box) => {
    box.style.display = "none";
  });
}

navigationBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    removeActive();
    if (i === 0) {
      mapContainer.style.display = "grid";
      navigationBtns[i].classList.add("active");
      hideOn();
    } else {
      hideOn();
      mapContainer.style.display = "none";
      contentBoxes[i - 1].style.display = "flex";
      navigationBtns[i].classList.add("active");
    }
  });
});

function clValue() {
  if (selectEl.value === "event" || selectEl.value === "match") {
    console.log("Find some friends in real world, ok?");
  } else {
    console.log(`Wow you've got a ${selectEl.value}, you're incredible Boi.`);
  }
}

selectEl.addEventListener("change", clValue);

console.log(contentBoxes);
