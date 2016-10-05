(function() {
    var compiledTemplate0 = "";

    templates();

    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];

    var q = function() {
        return window.NATIVEADS_QUEUE;
    };

    q().push(["setPropertyID", "NA-DANITEST-11237996"]);
    q().push(["setSecondaryPageURL", "/sample/publisher/sponsored.html"]);


    q().push(["insertPreview", {
        label: "wired-right-rail",
        template: compiledTemplate0,
        unit: {
            "server": "mvdirect",
            "id": "367259feb2fd4d99963c609445b80135"
        },
        location: "#panel > div > div > div:nth-child(1) > p:nth-child(8)",

        // iframeMode: true,
        // location: "body",
        // append: true,
        // unit: {
        //     server: "dfp-gpt",
        //     selfContainedMode: true,
        // },
        onFill: function(data) {},
        onRender: function($element) {
        },
        onError: function(error) {}
    }]);


        q().push(["injectCSS", ["",
"@import 'https://fonts.googleapis.com/css?family=Roboto';",
"",
".plr-rr {",
"  width: 300px;",
"  height: 250px;",
"  /*overflow: hidden;*/",
"  position: relative;",
"  margin: auto;",
"  text-align: left;",
"  border: 1px solid #c0c3c4;",
"}",
"",
".plr-rr a {",
"  color: initial;",
"  text-decoration: initial;",
"}",
"",
".plr-rr .plr-img-wrapper {",
"  position: relative;",
"  top: 0;",
"  left: 0;",
"  overflow: hidden;",
"  width: 100%;",
"  height: 100%;",
"}",
"",
".plr-rr .plr-img-wrapper > div:first-child {",
"  position: absolute;",
"  top: 0;",
"  right: 0;",
"  bottom: 0;",
"  left: 0;",
"  transition: .25s;",
"  background-size: cover !important;",
"}",
"",
".plr-rr .plr-img-wrapper {",
"  transition: .3s;",
"}",
"",
".plr-rr .plr-rr-logo {",
"  position: relative;",
"  float: right;",
"  margin-right: 5px;",
"  bottom: 35px;",
"}",
"",
".plr-rr__content {",
"  position: absolute;",
"  bottom: 0;",
"  left: 0;",
"  width: 100%;",
"  background-color: transparent;",
"  font-family: 'Roboto', sans-serif;",
"}",
"",
".plr-rr__content__title {",
"  font-weight: normal;",
"  font-size: 18px;",
"  color: white;",
"  padding: 10px;",
"}",
"",
".plr-rr__content__banner {",
"  font-family: 'Roboto', sans-serif;",
"  display: inline-block;",
"  font-size: 8px;",
"  font-weight: bold;",
"  line-height: 16px;",
"  letter-spacing: 1.2px;",
"  text-transform: uppercase;",
"  position: absolute;",
"  background-color: white;",
"  border-radius: 3px;",
"  padding: 3.2px 4.8px;",
"  margin: 4px;",
"  color: #666;",
"  right: 0;",
"  top: 0;",
"}",
""].join("\n"), "head"]);


    q().push(["configureSecondaryPage", {
        track: function() {}
    }]);

    function templates() {
/*

   This function represents a pre-compiled Handlebars template. Pre-compiled
   templates are not pretty, but they provide a very significant performance
   boost, especially on mobile devices. For more information, see
   http://handlebarsjs.com/precompilation.html.

   Note that this code has been generated from the following markup:

<div class="plr-rr">
  <a href="#polar-deck-link" rel="nofollow">
    <div class="plr-img-wrapper">
      <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
    </div>
    <div class="plr-rr__content__banner">Sponsored</div>
    <div class="plr-rr__content">
      
      <div class="plr-rr__content__title">{{title}}</div>
      
    </div>
  </a>
</div>

*/

  compiledTemplate0 = function (Handlebars,depth0,helpers,partials,data) {  this.compilerInfo = [4,'>= 1.0.0'];helpers = this.merge(helpers, Handlebars.helpers); data = data || {};  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;  buffer += "<div class=\"plr-rr\">\n  <a href=\"#polar-deck-link\" rel=\"nofollow\">\n    <div class=\"plr-img-wrapper\">\n      <div style=\"background: url('";  if (stack1 = helpers.getThumbHref) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.getThumbHref; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "') no-repeat center center;\"></div>\n    </div>\n    <div class=\"plr-rr__content__banner\">Sponsored</div>\n    <div class=\"plr-rr__content\">\n      \n      <div class=\"plr-rr__content__title\">";  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "</div>\n      \n    </div>\n  </a>\n</div>";  return buffer;  };

    }

})();

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = d.location.protocol;
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.type = "text/javascript";
    js.async = true;
    js.src = ((p == "https:") ? p : "http:") + "//plugin.mediavoice.com/plugin.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "nativeads-plugin");