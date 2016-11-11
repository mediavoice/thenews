var adCount = 0;
var adInterval = setInterval(exec, 1000);
var adTitles = [];
var adThumbHrefs = [];
var lastID = "";

function pullJSON() {
  console.log("Pulling JSON");
  var output = [];
  // go through every ID in the JSON
  // grab info from meraxes: http://meraxes.polarmobile.com/nativeads/v1.4.0/json/creative/ + ID 

  var api = $.ajax({
    url: "http://ds1.prod.polarmobile.com:1234/latest/",
    success: function(result) {
      var index = result.instance_ids.length;
      output = result.instance_ids;
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
            adTitles.push(result.sponsor.name);
            if (result.primaryMedia.content.href)
              adThumbHrefs.push("http://meraxes-cdn.polarmobile.com/" + result.primaryMedia.content.href);
            else
              adThumbHrefs.push("http://meraxes-cdn.polarmobile.com/image/v1.0.0/bin/57c704053e9221343df69081");
          },
          error: function() { 
          }
        });
      }

      console.log("LAST ID " + lastID);
    },
    error: function() {
      console.log("Error while requesting JSON");
    }
  });
}

function insertAds(output) {
  for (var i = 0; i < adTitles.length; i++) {
    console.log("Inserting Ads");
    //if (!adThumbHrefs[i]) adThumbHrefs[i] = "http://meraxes-cdn.polarmobile.com/image/v1.0.0/bin/57c704053e9221343df69081";
    var html_template = ["",
      "<div class=\"plr-ad\">",
      "    <a href=\"{{link}}\" rel=\"nofollow\">",
      "        <div class=\"plr-img-wrapper\">",
      "            <div style=\"background: url('" + adThumbHrefs[i] + "') no-repeat center center;\"></div>",
      "        </div>",
      "        <div class=\"plr-ad-content\">",
      "            <div class=\"plr-ad-content-title\">" + adTitles[i] + "</div>",
      "            <div class=\"plr-ad-content-banner\">Sponsored</div>",
      "        </div>",
      "    </a>",
      "</div>",
      "",
      ""
    ].join("\n");
    $('.outer-container').prepend(html_template);
    adCount++;
  }

  adTitles = adThumbHrefs = [];


}

function exec() {
  console.log("exec");
  if (adCount < 1) {
    pullJSON();
    insertAds();
  } else {
    stop();
  }
}

function stop() {
  clearInterval(adInterval);
}