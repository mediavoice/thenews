var adCount = 0;
var adInterval = setInterval(exec, 1000);
var adTitles = [];
var adThumbHrefs = [];
var adLinks = [];
var lastID = "";
var albert = [];

function pullJSON() {
  console.log("Pulling JSON");
  // go through every ID in the JSON
  // grab info from meraxes: http://meraxes.polarmobile.com/nativeads/v1.4.0/json/creative/ + ID 

  var api = $.ajax({
    url: "http://ds1.prod.polarmobile.com:1234/latest/",
    success: function(result) {
      var index = result.instance_ids.length;
      var output = result.instance_ids;
      if (lastID.length == 0) {
        lastID = output[0];
      } else {
        // find new creative ids
        for (var i = 0; i < output.length; i++) {
          console.log("finding the last ID");
          if (output[i] == lastID) {
            console.log("found ID!");
            index = i;
            lastID = output[0];
            break;
          }
        }
      }

      for (var i = 0; i < index; i++) {
        $.ajax({
          url: "http://meraxes.polarmobile.com/nativeads/v1.4.0/json/creative/" + output[i],
          success: function(result) {
            console.log(result);
            albert.push(result);
            console.log(albert);
            // adTitles.push(result.experience.title);
            // if (result.thumb.instances[0].href != "null") {
            //   adThumbHrefs.push("http://meraxes-cdn.polarmobile.com/" + result.thumb.instances[0].href);
            // } else {
            //   console.log("failed to fetch href");
            //   adThumbHrefs.push("http://meraxes-cdn.polarmobile.com/image/v1.0.0/bin/57c704053e9221343df69081");
            // }
            // if (result.experience.destUrl != "undefined") {
            //   adLinks.push(result.experience.destUrl);
            // } else {
            //   console.log("failed to fetch link");
            //   adLinks.push("www.google.com");
            // }
          },
          error: function() {
            console.log("didnt get creative");
          }
        });
      }
    },
    error: function() {
      console.log("Error while requesting JSON");
    }
  });
}

function insertAds() {
  console.log("onion");
  for (var i = 0; i < 5; i++) {
    console.log("Inserting Ads");
    //if (!adThumbHrefs[i]) adThumbHrefs[i] = "http://meraxes-cdn.polarmobile.com/image/v1.0.0/bin/57c704053e9221343df69081";
    var html_template = ["",
      "<div class=\"plr-ad\">",
      "    <a href=\"" + albert[i].experience.destUrl + "\" rel=\"nofollow\">",
      "        <div class=\"plr-img-wrapper\">",
      "            <div style=\"background: url(" + albert[i].thumb.instances[0].href + ") no-repeat center center;\"></div>",
      "        </div>",
      "        <div class=\"plr-ad-content\">",
      "            <div class=\"plr-ad-content-title\">" + albert[i].experience.title + "</div>",
      "            <div class=\"plr-ad-content-banner\">Sponsored</div>",
      "        </div>",
      "    </a>",
      "</div>",
      "",
      ""
    ].join("\n");
    $('.outer-container').prepend(html_template);
  }
  adCount++;



}

function exec() {
  console.log("exec");
  if (adCount < 2) {
    pullJSON();
    insertAds();
  } else {
    stop();
  }
}

function stop() {
  clearInterval(adInterval);
}