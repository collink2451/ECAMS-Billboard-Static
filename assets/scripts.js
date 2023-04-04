const api_url = "https://ecams-billboard--api.azurewebsites.net";

setInterval(function () {
  ping();
}, 120000);

function ping() {
  $.ajax({
    type: "GET",
    url: api_url + "/ping",
    dataType: "text",
    success: function (response) {
      console.log(response);
    },
  });
}

$(window).on("load", function () {
  ping();
});

async function getData() {
  const data = await fetch("https://ecams-billboard--api.azurewebsites.net/api/data")
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  console.log(data)
  return data
}

getData()

const profs = [
  {
      "item":"Abumoar, Dr. Sam",
      "ref":"SU 113"
  },
  {
      "item":"Al-Khassaweneh, Dr. Mahmood",
      "ref":"AS 116A"
  },
  {
      "item":"Alzoubi, Dr. Khaled",
      "ref":"AS 118A"
  },
  {
      "item":"Ayala, Dr. Daniel",
      "ref":"AS 114A"
  },
  {
      "item":"Dupre, Br. Tom",
      "ref":"AS 128A"
  },
  {
      "item":"Harsy Ramsay, Dr. Amanda",
      "ref":"SU 124"
  },
  {
      "item":"Howard, Dr. Cindy",
      "ref":"AS 131L"
  },
  {
      "item":"Kim, Dr. Paul",
      "ref":"AS 110A"
  },
  {
      "item":"Kim, Dr. Sung",
      "ref":"AS 126A"
  },
  {
      "item":"Lewis, Dr. Michael",
      "ref":"AS 110A-A"
  },
  {
      "item":"Martinez, Dr. Gina",
      "ref":"AS 130L"
  },
  {
    "item":"Meyer, Dr. Marie",
    "ref":"SU 128"
  },
  {
    "item":"Ngalamou, Dr. Lucien",
    "ref":"AS 111A"
  },
  {
    "item":"Omari, Dr. Safwan",
    "ref":"AS 129L"
  },
  {
    "item":"Perry, Dr. Jason",
    "ref":"AS 127L"
  },
  {
    "item":"Plass, Dr. Matthias",
    "ref":"AS 125L"
  },
  {
    "item":"Pogue, Eric",
    "ref":"AS 124A"
  },
  {
    "item":"Smith, Dr. Michael",
    "ref":"SU 122"
  },
  {
    "item":"Spangler, Eric",
    "ref":"AS 120A"
  },
  {
    "item":"Speva, Jayme",
    "ref":"AS 032L"
  },
  {
    "item":"Stephenson, Dr. Brittany",
    "ref":"SU 126"
  },
  {
    "item":"Sulyok, Dr. Cara",
    "ref":"SU 125"
  },
  {
    "item":"Szczurek, Dr. Piotr",
    "ref":"SU 111"
  },
  {
    "item":"Wedyan, Dr. Fadi",
    "ref":"AS 122A"
  },
]

async function createProfs() {
  outputStr = "";
  profs.forEach((element, index) => {
      outputStr += "<tr>";
      outputStr += `<td>${element.item}</td>`;
      outputStr += `<td>${element.ref}</td>`;
      outputStr += "</tr>";
  });
  $("#profs").html(outputStr);
}
createProfs();
