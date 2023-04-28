const api_url = "https://ecams-billboard--api.azurewebsites.net";
const acp_url = "https://ecams-billboard-acp.azurewebsites.net";

setInterval(function () {
  ping();
}, 120000);

setInterval(function () {
  // Reload every 1 hours
  window.location.reload();
}, 3600000);

setInterval(function () {
  // Refresh data every 10 minutes
  loadData();
  loadImg();
}, 600000);

async function ping() {
  await fetch(api_url + "/ping", { mode: "no-cors" });
  await fetch(acp_url + "/ping", { mode: "no-cors" });
}

$(window).on("load", function () {
  ping();
});

async function getData() {
  const data = await fetch(api_url + "/api/data")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  console.log(data);
  return data;
}

async function loadData() {
  const data = await getData();
  outputStr = "";
  data.forEach((element, index) => {
    outputStr += "<tr>";
    outputStr += `<td>${element.name}</td>`;
    outputStr += `<td>${element.room}</td>`;
    outputStr += "</tr>";
  });
  $("#profs").html(outputStr);
}

loadData();

async function getImg() {
  const data = await fetch(api_url + "/api/banners")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return data;
}

async function loadImg() {
  const data = await getImg();
  outputStr = "";
  data.forEach((element, index) => {
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

loadImg();
