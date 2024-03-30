const api_url = "https://ecams-billboard--api.azurewebsites.net";
const acp_url = "https://ecams-billboard-acp.azurewebsites.net";
const department = "ECAMS";

let data = [];
let overlayVisible = false;
let resetOverlayInterval;
let locationSet = false;
let skipButtonPressed = false;

setInterval(function () {
  ping();
}, 120000);

setInterval(function () {
  // Reload every 1 hour
  window.location.reload();
}, 3600000);

setInterval(function () {
  // Refresh data every 10 minutes
  loadData();
  loadImg();
}, 600000);

function toggleOverlay(visible) {
  const overlay = document.getElementById('overlay');
  overlay.style.display = visible ? 'flex' : 'none';
  overlayVisible = visible;
}

function resetOverlay() {
  toggleOverlay(true);
}

// Add the resetOverlay function to the window click event
window.onclick = function () {
  clearInterval(resetOverlayInterval); // Clear the interval on click
  toggleOverlay(false);
  resetOverlayInterval = setInterval(resetOverlay, 180000); // Set the interval again
};

async function ping() {
  await fetch(api_url + "/ping", { mode: "no-cors" });
  await fetch(acp_url + "/ping", { mode: "no-cors" });
}

$(window).on("load", function () {
  ping();
});

async function getData() {
  await fetch(api_url + "/api/data/" + department)
    .then((res) => res.json())
    .then((localData) => {
      data = localData;
      return;
    });
  console.log(data);
}

async function loadData() {
  await getData();
  outputStr = "";
  data.forEach((element, index) => {
    outputStr += "<tr>";
    outputStr += `<td>${element.name}</td>`;
    outputStr += `<td>${element.room}</td>`;
    outputStr += `<td><button class="btn btn-outline-primary btn-sm" id="view-professor" onclick="openProfessorModal('${element.id}')"><i class="fa-solid fa-eye"></i></button></td>`;
    outputStr += "</tr>";
  });
  $("#profs").html(outputStr);
}

loadData();

async function getImg() {
  const imageData = await fetch(api_url + "/api/banners")
    .then((res) => res.json())
    .then((imageData) => {
      return imageData;
    });
  return imageData;
}

async function loadImg() {
  const imageData = await getImg();
  outputStr = "";
  imageData.forEach((element, index) => {
    const image_url = api_url + "/uploads/" + element.image_name;
    outputStr += `<div class="carousel-item ${
      index === 0 ? "active" : ""
    }" data-bs-interval="10000">
                    <img
                      src="${image_url}"
                      class="d-block w-100"
                      alt="${element.name}"
                      width="375"
                      height="500"
                    />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>${element.name}</h5>
                    </div>
                  </div>`;
  });
  $("#carousel-body").html(outputStr);
}

function openProfessorModal(professorId) {
  const professor = data.find((element) => element.id === professorId)

  $("#professorName").html(professor.name);
  $("#professorNameTable").html(professor.name);
  $("#professorEmail").html(professor.email);
  $("#professorHours").html(professor.hours);
  $("#professorOffice").html(professor.room);
  $("#professorModal").modal("show")
}

loadImg();

// Logic for adding metrics to MongoDB
//--------------------------------------------------------

let locationName = '';

document.addEventListener('DOMContentLoaded', function() {
  const locationForm = document.getElementById('locationForm');
  locationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitForm();
  });
});

function submitForm() {
  if (skipButtonPressed) {
    locationSet = false;
    document.getElementById('locationOverlay').style.display = 'none';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('touchImage').style.display = 'block';
    resetOverlayInterval = setInterval(resetOverlay, 5000);
  } else {
  locationName = document.getElementById('locationInput').value;
  locationSet = true;
  document.getElementById('locationOverlay').style.display = 'none';
  document.getElementById('overlay').style.display = 'block';
  // Assuming resetOverlay is a defined function
  // Set an interval to reset the overlay every 5 seconds
  resetOverlayInterval = setInterval(resetOverlay, 5000);
  }
}

function sendData() {
  console.log("sendData() called");
  const timestamp = new Date().toISOString();
  fetch('/submit-interaction', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location: locationName, timestamp }),
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data sent successfully:', response.statusText);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}

// Assuming touchImage is the button that should be monitored
document.getElementById('touchImage').addEventListener('click', sendData);

document.getElementById('skipButton').addEventListener('click', function() {
  var confirmResponse = confirm('Are you sure you want to skip metric logging?');
  if (confirmResponse) {
    skipButtonPressed = true;
    console.log('Metric logging skipped.');
    document.getElementById('locationForm').removeAttribute("required");
    submitForm();
  }
});

//TODO FIX SKIP BUTTON BUG WHERE TOUCH IMAGE DOESNT SHOW UP
