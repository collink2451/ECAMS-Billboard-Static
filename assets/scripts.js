const api_url = "https://ecams-billboard--api.azurewebsites.net";
const acp_url = "https://ecams-billboard-acp.azurewebsites.net";

setInterval(function () {
  ping();
}, 120000);

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
  console.log(data);
  return data;
}


async function arrayImg(){
  const data = await getImg();
  let array = [];
  data.forEach((element, index) => {
    image = new Image();
    image.src = api_url+"/uploads/"+element.image_name;
    array.push(image);
    
});
console.log(array);

}

async function caro(){
  const data = await arrayImg();
  for (let i = 0; i < data.length; i++){
    document.body.appendChild(data[i]);
  }
}

caro();

