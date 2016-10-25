let title = "",
    desc = "",
    link = "";

function getInput() {
  var phrase = $("#input").val();
  return phrase;
}

function getResults() {
  var value = getInput();
  var url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${value}&callback=?`;
  $.getJSON(url, function(data) {
    var validator = data.query.search[0];
    if (!validator) {
      $("#notfound").show();
      $("#notfound").html("No results found.");
      for (var i = 0; i < 10; i++) {
        $("#p" + i).hide();
      }
    } else {
      $("#notfound").hide();
      for (var i = 0; i < 10; i++) {
        title = data.query.search[i].title;
        desc = data.query.search[i].snippet;
        link = `https://en.wikipedia.org/wiki/${title}`;
        $("#p" + i).show();
        $("#p" + i).addClass("altered");
        $("#p" + i).html(`<h3>${title}</h3>${desc}...`);
        $("#a" + i).attr('href', link);
      }
    }
  })
}
$("#search").on("click", function() {
  getResults()
})
$("#input").keyup(function(event) {
  if (event.keyCode == 13) {
    getResults();
  }
});
