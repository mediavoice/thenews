var adCount = 0;
var lastID = "";
var albert = [];
exec();
var adInterval = setInterval(exec, 10000);

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
            console.log(lastID);
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
            albert.push(result);
          },
          error: function() { 
          }
        });
      }2
    },
    error: function() {
      console.log("Error while requesting JSON");
    }
  });
}

function insertAds(output) {
  console.log("onion");
  console.log("ALBERT" + albert.length);
  for (var i = 0; i < albert.length; i++) {
    console.log(albert[i]);
    console.log("Inserting Ads");
    //if (!adThumbHrefs[i]) adThumbHrefs[i] = "http://meraxes-cdn.polarmobile.com/image/v1.0.0/bin/57c704053e9221343df69081";
    var html_template = ["",
      "<div class=\"plr-ad\">",
      "    <a href=\"" + albert[i].experience.destUrl + "\" rel=\"nofollow\">",
      "        <div class=\"plr-img-wrapper\">",
      "            <div style=\"background: url('http://meraxes-cdn.polarmobile.com/" + albert[i].thumb.instances[0].href + "') no-repeat center center;\"></div>",
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