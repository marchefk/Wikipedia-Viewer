var title = "";
var desc = "";
var link = "";

function getInput() {
  var phrase = $("#input").val();
  return phrase;
}

function getResults() {
  var value = getInput();
  console.log(value);
  var url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${value}&callback=?`;
  console.log(url);
  $.getJSON(url, function(data) {
    console.log(data);
    var validator = data.query.search[0];
    console.log(validator);
    if (validator === undefined) {
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
        console.log(link);
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
