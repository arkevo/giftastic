var sports = [
  "football","soccer","tennis","ping pong","volleyball","cricket","baseball","basketball","rowing","track"
];

function createGiphyURL(sport) {
  var gipyhURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    sport +
    "&api_key=DAyl4KPQGw1K7x6DVdf7wB202G8cpsAj&limit=10";

  $.ajax({ url: gipyhURL }).then(function(giphyApiReturn) {
    $("#giphyDiv").empty();

    for (var i in giphyApiReturn["data"]) {
      var staticImage =
        giphyApiReturn["data"][i]["images"]["fixed_width_still"]["url"];
      var movingImage =
        giphyApiReturn["data"][i]["images"]["fixed_width"]["url"];
      var rating = $("<p>").text(
        "rating: " + giphyApiReturn["data"][i]["rating"]
      );
      var img = $("<img>");

      img.attr({
        src: staticImage,
        class: "giphy",
        "data-state": "still",
        "data-still": staticImage,
        "data-animate": movingImage,
        "data-rating": giphyApiReturn["data"][i]["rating"]
      });

      var createImgDiv = $("<div>")
        .append(img, rating)
        .addClass("createImgDiv");
      $("#giphyDiv").prepend(createImgDiv);
    }
  });
}


function btnCreator(sport) {
  var btn = $("<button>")
    .text(sport)
    .addClass("giphyButtonClass");
  $("#giphyButtonDiv").append(btn);
}

for (var index in sports) {
  btnCreator(sports[index]);
}

$("#newBtn").on("click", function() {
  event.preventDefault();
  var newSport = $("input")
    .val()
    .trim();
  btnCreator(newSport);
  $("input").val("");
});


$(document).on("click", ".giphyButtonClass", function() {
  var sportsText = $(this).text();

  createGiphyURL(sportsText);
});

$(document).on("click", ".giphy", function() {
  var gif = $(this);
  var dataState = gif.attr("data-state");
  var dataAnimate = gif.attr("data-animate");
  var dataStill = gif.attr("data-still");

  if (dataState === "still") {
    gif.attr("src", dataAnimate);
    gif.attr("data-state", "animate");
  } else {
    gif.attr("src", dataStill);
    gif.attr("data-state", "still");
  }
});
