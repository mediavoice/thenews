var adCount = 0;
var lastID = "";
var albert = [];
exec();
var adInterval = setInterval(exec, 7500);

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
      console.log(index);
      for (var i = 0; i < index; i++) {
        console.log(output[i]);
        $.ajax({
          url: "http://meraxes.polarmobile.com/nativeads/v1.4.0/json/creative/" + output[i],
          success: function(result) {
            albert.push(result);
            console.log(result);
          },
          error: function() {}
        });
      }
    },
    error: function() {
      console.log("Error while requesting JSON");
    }
  });
}

function insertAds(output) {
  adCount++;
  console.log("onion");
  var b = [];
  console.log("ALBERT" + albert.length);
  $.each(albert, function(index, event) {
    var events = $.grep(b, function(e) {
      return event.experience.destUrl == e.experience.destUrl;
    });
    if (events.length === 0) {
      b.push(event);
    }
  });
  for (var i = 0; i < b.length; i++) {
    //if (!adThumbHrefs[i]) adThumbHrefs[i] = "http://meraxes-cdn.polarmobile.com/image/v1.0.0/bin/57c704053e9221343df69081";
    try {
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
    } catch (e) {
      console.log("Couldn't find thumbnail");
    }
  }
  console.log("empty albert");
  albert = [];
  console.log("Ad Count " + adCount);
}

function exec() {
  console.log("exec");
  if (adCount < 5) {
    pullJSON();
    insertAds();
  } else {
    console.log("stopping");
    stop();
  }
}

function stop() {
  clearInterval(adInterval);
}