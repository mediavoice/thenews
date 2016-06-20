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
        append:true,
        infoText: "",
        infoButtonText: "",
        template: compiledTemplate0,
        onRender: function($element) { },
        onFill: function(data) { },
        onError: function(error) { }
    }]);
    q().push(["injectCSS",["",
".s-polar-outer {",
"    border: 1px solid #2e7061;",
"    border-top: 8px solid #2e7061;",
"    padding: 10px;",
"    width: 300px;",
"    height: 250px;",
"    margin-bottom: 20px;",
"}",
".s-polar-title {",
"    font-family: ProximaNovaCond-Extrabld, NotoKufiArabic-Bold, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;",
"    font-weight: 400;",
"    text-transform: uppercase;",
"    text-align: justify;",
"    font-family: ProximaNovaCond-Extrabld, NotoKufiArabic-Bold, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;",
"    color: black;",
"    text-decoration: none;",
"}",
".s-polar-summary {",
"    font-family: NotoNashkArabic, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;",
"    line-height: 27px;",
"    padding-top: 20px;",
"    text-decoration: none;",
"    color: #757575;",
"}",
".s-polar-video {",
"    margin-top: 0px;",
"    margin-bottom: 0px;",
"}",
".s-polar-title {",
"    font-family: oswaldmedium;",
"    font-weight: 400;",
"    text-transform: uppercase;",
"    text-align: center;",
"}",
".s-polar-sponsorbadge {",
"    display: block;",
"    margin-top: -5px;",
"}",
".s-polar-sponsorlabel {",
"    float: left;",
"    color: #757575;",
"    font-size: small;",
"    margin-top: 17px;",
"}",
".s-polar-sponsorlogo {",
"    margin-top: 10px;",
"    height: 20px;",
"    width: auto;",
"    float: right;",
"    display: block;",
"}",
""].join("\n"), "head"]);

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

<div class="s-polar-outer"><a href="http://on.aol.com/video/spoilers-game-of-thrones-season-six-finale-will-blow-your-mind-5758b79be4b075144bea4691" rel="nofollow">
      </a><div class="follow-us__header">
<h3>The Mindi Project on Hulu</h3>
</div>

  <div class="s-polar-video">
      <iframe width="275"src="https://www.youtube.com/embed/_uwanee-lS4" frameborder="0" allowfullscreen></iframe>
  </div>
  <div class="s-polar-sponsorbadge"> 
    <span class="s-polar-sponsorlabel">PROMOTED</span>
    <img class="s-polar-sponsorlogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Hulu_logo.svg/2000px-Hulu_logo.svg.png" height="30px" alt="Hulu">
    
  </div>
  </div>

*/

  compiledTemplate0 = function (Handlebars,depth0,helpers,partials,data) {  this.compilerInfo = [4,'>= 1.0.0'];helpers = this.merge(helpers, Handlebars.helpers); data = data || {};    return "<div class=\"s-polar-outer\"><a href=\"http://on.aol.com/video/spoilers-game-of-thrones-season-six-finale-will-blow-your-mind-5758b79be4b075144bea4691\" rel=\"nofollow\">\n      </a><div class=\"follow-us__header\">\n<h3>The Mindi Project on Hulu</h3>\n</div>\n\n  <div class=\"s-polar-video\">\n      <iframe width=\"275\"src=\"https://www.youtube.com/embed/_uwanee-lS4\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n  <div class=\"s-polar-sponsorbadge\"> \n    <span class=\"s-polar-sponsorlabel\">PROMOTED</span>\n    <img class=\"s-polar-sponsorlogo\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Hulu_logo.svg/2000px-Hulu_logo.svg.png\" height=\"30px\" alt=\"Hulu\">\n    \n  </div>\n  </div>";  };

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
