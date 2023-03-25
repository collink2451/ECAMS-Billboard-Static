const api_url = "https://ecams-billboard-api.azurewebsites.net";

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