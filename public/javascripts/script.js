var styleTiles = function(index, element) {
  var media = config.media;

  if(media[index].style === "text") {

    element[0].innerHTML = "<span>" + media[index].title + "</span>";

  } else if(media[index].style === "content") {

    if(media[index].type === "image") {

      element.css({
        "background": "url(" + media[index].file + ")",
        "background-size": "contain",
        "background-color": "black",
        "background-repeat": "no-repeat",
        "background-position": "center center"
      });

      element[0].innerHTML = "<div class=\"overlap\">" +
        "<span>" + media[index].title + "</span>" +
        "</div>";

    } else if(media[index].type === "video") {

      element[0].innerHTML = "" +
        "<div><video muted src=\"" + media[index].file + "\" class=\"thumbnail-video\">" +
        "</video></div>" +
        "<div class=\"overlap\">" + media[index].title + "</div>";

    }
    if(media[index].tmp === "play-thumbnail") {

      element[0].innerHTML = "" +
        "<div><video loop muted autoplay src=\"" + media[index].file + "\" class=\"thumbnail-video\">" +
        "</video></div>" +
        "<div class=\"overlap\">" + media[index].title + "</div>";

    }
  }
};

var resizeTiles = function (firstLaunch) {
  var tiles = $("#tiles");

  var vh = window.innerHeight;
  var vw = window.innerWidth;

  var rows = config.rows;
  var cols = config.columns;

  var squareTiles = config["square-tiles"];

  var margin = config.margin;
  var hMargin = vh / margin;
  var wMargin = vw / margin;

  var h = (vh / rows) - hMargin;
  var w = (vw / cols) - wMargin;

  if (squareTiles) {
    h = Math.min(h, w);
    w = h;
  }

  for( var irow = 0; irow < rows; irow++ ) {
    for( var icol = 0; icol < cols; icol++ ) {
      var index = irow * cols + icol;
      var ele = $("#" + index);

      ele.css({
        "height": h+"px",
        "width": w+"px",
        "line-height": h+"px",
        "margin-top": hMargin/2+"px",
        "margin-bottom": hMargin/2+"px",
        "margin-left": wMargin/2+"px",
        "margin-right": wMargin/2+"px"
      });

      styleTiles(index, ele);
    }

    var tMargin = vh - rows * (h + hMargin);
    var lMargin = vw - cols * (w + wMargin);

    tiles.css({
      "margin-top": tMargin/2+"px",
      "margin-left": lMargin/2+"px"
    });

    if(firstLaunch === "first-launch") {
      setVisible(tiles);
    }
  }
};

var setVisible = function (element) {
  element.animate({
    opacity: "1"
  }, "slow");
  element.css("z-index", "1");
};

var setHidden = function(element) {
  element.animate({
    opacity: "0"
  }, "fast");
  element.css("z-index", "0");
};

var clickHandler = function() {
  var id = parseInt(this.getAttribute("id"));

  var tiles = $("#tiles");
  var video = $("#video")[0];
  var image = $("#image");

  setHidden(tiles);

  var media = config.media;
  if( media[id].type === "video" ) {

    video.src = media[id].file;

    var hideVideo = function() {
      setVisible(tiles);
      setHidden($("#video"));
    };

    video.onended = function () {
      hideVideo();
    };

    video.onclick = function () {
      video.pause();
      hideVideo();
    };

    video.play();
    setVisible($("#video"));

  } else if( media[id].type === "image") {
    image.css({
      "background-image": "url(\"" + media[id].file + "\")",
      "background-repeat": "no-repeat",
      "background-position": "center center",
      "background-size": "contain"
    });

    var hideImage = function () {
      setVisible(tiles);
      setHidden(image);
    };

    image.click(hideImage);

    setTimeout(hideImage, 10000);
    setVisible(image);
  }
};

$(document).ready(function () {
  resizeTiles("first-launch");

  $(".thumbnail").click(clickHandler);
});

$(window).resize(resizeTiles);
