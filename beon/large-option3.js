(function(){

    var compiledTemplate0 = "";
    templates();

    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];

    var q = function() {
        return window.NATIVEADS_QUEUE;
    };

    q().push(["setPropertyID", "NA-TEST-11235814"]);
    q().push(["setSecondaryPageURL", "/sample/publisher/sponsored.html"]);

    q().push(["insertPreview", {
        label: "Home",
        unit: {"server":"dfp","id":"/7814368/NativeAdUnit","size":"2x2","targets":{"category":"news","placement":"top"}},
        location: ".right_rail_flex",
        infoText: "",
        infoButtonText: "",
        template: compiledTemplate0,
        onRender: function($element) { },
        onFill: function(data) { },
        onError: function(error) { }
    }]);
    q().push(["injectCSS", ".polar-headline {font-size: 22px; font-family: 'ProximaNovaCond-Extrabld', 'NotoKufiArabic-Bold', 'Helvetica Neue', 'Helvetica', Roboto, Arial, sans-serif; line-height: 1.4em; font-weight: normal;}.polar-outer { border:1px solid #2e7061; border-top:8px solid #2e7061; padding:10px; width:300px; height:500px; margin-bottom: 20px; } .polar-title { font-family: 'ProximaNovaCond-Extrabld', 'NotoKufiArabic-Bold', 'Helvetica Neue', 'Helvetica', Roboto, Arial, sans-serif; font-weight: 400; text-transform: uppercase; text-align: justify; font-family: 'ProximaNovaCond-Extrabld', 'NotoKufiArabic-Bold', 'Helvetica Neue', 'Helvetica', Roboto, Arial, sans-serif; color: black; text-decoration: none; } .polar-summary { font-family: \"NotoNashkArabic\", \"Helvetica Neue\", \"Helvetica\", Roboto, Arial, sans-serif; line-height: 27px; padding-top: 20px; text-decoration: none; color: #757575;} .polar-video { margin-top: 25px; margin-bottom: 20px; margin-left: -11px !important;} .polar-title { font-family: oswaldmedium; font-weight: 400; text-transform: uppercase; text-align: center; } .polar-sponsorbadge { display: block; margin-top:5px; } .polar-sponsorlabel { float:left; color: #757575; font-size: small; margin-top:17px; } .polar-sponsorlogo { height: 50px; width:auto; float:right; display: block; }", "head"]);

    q().push(["configureSecondaryPage", {
        binding: {
            sponsor: {
                link: "#sponsor-link",
                logo: "#sponsor-logo",
                name: "#sponsor-name"
            },
            title: "#title",
            summary: "#summary",
            content: "#content",
            author: "#author",
            pubDate: "#pub-date",
            image: {
                href: "#media",
                caption: "#media-caption",
                credits: "#media-credits"
            }
        },
        onFill: function(data) { },
        onRender: function() { },
        onError: function(error) { },
        track: function() { }
    }]);

    function templates () {

/*

   This function represents a pre-compiled Handlebars template. Pre-compiled
   templates are not pretty, but they provide a very significant performance
   boost, especially on mobile devices. For more information, see
   http://handlebarsjs.com/precompilation.html.

   Note that this code has been generated from the following markup:

<div class="polar-outer"><a href="http://on.aol.com/video/spoilers-game-of-thrones-season-six-finale-will-blow-your-mind-5758b79be4b075144bea4691" rel="nofollow">
      </a><div class="follow-us__header">
<div class="polar-headline">Game of Thrones Surprise</div>
</div>
  <div class="polar-video">
    <iframe style="height:163px;" src="http://www.hbo.com/data/content/global/videos/embed/data/1432041.html?width=640&height=360" style="overflow:hidden" scrolling="no" allowfullscreen="false" mozallowfullscreen="false" webkitallowfullscreen="false" seamless="seamless" frameborder="0" type="text/html"></iframe>
  </div>
  
  <a class="polar-summary" href="http://on.aol.com/video/spoilers-game-of-thrones-season-six-finale-will-blow-your-mind-5758b79be4b075144bea4691" rel="nofollow">Game of Thrones has had its share of surprises over the course of season six and with the current slate of episodes almost of over, fans of the HBO show will be delivered a lengthy and dramatic ending.</a>
  <div class="polar-sponsorbadge"> 
    <span class="polar-sponsorlabel">PROMOTED</span>
    <img class="polar-sponsorlogo" src="http://logok.org/wp-content/uploads/2014/10/HBO_logo.png" height="50px" alt="HBO">
    
  </div>
  </div>

*/

  compiledTemplate0 = function (Handlebars,depth0,helpers,partials,data) {  this.compilerInfo = [4,'>= 1.0.0'];helpers = this.merge(helpers, Handlebars.helpers); data = data || {};    return "<div class=\"polar-outer\"><a href=\"http://on.aol.com/video/spoilers-game-of-thrones-season-six-finale-will-blow-your-mind-5758b79be4b075144bea4691\" rel=\"nofollow\">\n      </a><div class=\"follow-us__header\">\n<div class=\"polar-headline\">Game of Thrones Surprise</div>\n</div>\n  <div class=\"polar-video\">\n    <iframe style=\"height:163px;\" src=\"http://www.hbo.com/data/content/global/videos/embed/data/1432041.html?width=640&height=360\" style=\"overflow:hidden\" scrolling=\"no\" allowfullscreen=\"false\" mozallowfullscreen=\"false\" webkitallowfullscreen=\"false\" seamless=\"seamless\" frameborder=\"0\" type=\"text/html\"></iframe>\n  </div>\n  \n  <a class=\"polar-summary\" href=\"http://on.aol.com/video/spoilers-game-of-thrones-season-six-finale-will-blow-your-mind-5758b79be4b075144bea4691\" rel=\"nofollow\">Game of Thrones has had its share of surprises over the course of season six and with the current slate of episodes almost of over, fans of the HBO show will be delivered a lengthy and dramatic ending.</a>\n  <div class=\"polar-sponsorbadge\"> \n    <span class=\"polar-sponsorlabel\">PROMOTED</span>\n    <img class=\"polar-sponsorlogo\" src=\"http://logok.org/wp-content/uploads/2014/10/HBO_logo.png\" height=\"50px\" alt=\"HBO\">\n    \n  </div>\n  </div>";  };

    }

})();

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0], p = d.location.protocol;
  if (d.getElementById(id)) {return;}
  js = d.createElement(s);
  js.id = id; js.type = "text/javascript"; js.async = true;
  js.src = ((p == "https:") ? p : "http:") + "//plugin.mediavoice.com/plugin.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "nativeads-plugin");
