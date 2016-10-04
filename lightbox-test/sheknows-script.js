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
".plr-promo-unit {",
"    display: inline-block;",
"    position: relative;",
"}",
"",
".plr-promo-unit a {",
"    color: initial;",
"    text-decoration: initial;",
"}",
"",
".plr-rr {",
"    position: relative;",
"    width: 300px;",
"    height: 250px;",
"    background: #fff;",
"    border-top: 3px solid #000;",
"    display: inline-block;",
"    overflow: hidden;",
"}",
"",
".plr-ad-unit {",
"    position: absolute;",
"    width: 274px;",
"    left: 13px;",
"    top: 13px;",
"    bottom: 10px;",
"    right: 13px;",
"    margin: auto;",
"}",
"",
".plr-thumbnail {",
"    position: relative;",
"    width: 100%;",
"    height: 150.013px;",
"    background: #fff;",
"}",
"",
".plr-ad-content {",
"    position: relative;",
"    margin-top: 16px;",
"    -webkit-font-smoothing: antiliased;",
"}",
"",
".plr-sponsored {",
"    font-family: Brandon Text;",
"    font-weight: bold;",
"    text-transform: uppercase;",
"    font-size: 10px;",
"    line-height: 10px;",
"    color: #f5823f;",
"    letter-spacing: 0.08em;",
"    -webkit-font-smoothing: antiliased;",
"    -moz-font-smoothing: antiliased;",
"}",
"",
".plr-title {",
"    font-family: Brandon Text;",
"    font-weight: bold;",
"    font-size: 18px;",
"    line-height: 20px;",
"    margin-top: 4px;",
"    color: #000;",
"    -webkit-font-smoothing: antiliased;",
"    -moz-font-smoothing: antiliased;",
"}",
""].join("\n"), "head"]);

          //lightbox
    q().push(["injectCSS", ["",
        ".polar-deck-dialog {",
        "}",
        "",
        ".polar-deck-content {",
        "    border-top-left-radius: 1em;",
        "    border-top-right-radius: 1em;",
        "    border-bottom-left-radius: 1em;",
        "    border-bottom-right-radius: 1em;",
        "    font-family: \"Avenir Next\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;",
        "    border: none;",
        "}",
        ".polar-deck-sponsor-logo {",
        "    max-height: 10px;",
        "    margin-top: 0px;",
        "    position: absolute;",
        "    bottom: 10px;",
        "    transform: none;",
        "    margin-left: 0;",
        "    ",
        "}",
        "",
        "section.polar-deck-body {padding: 0;}",
        "",
        ".polar-deck-frame {",
        "    padding: 0 !important;",
        "}",
        "",
        "section.polar-deck-footer {",
        "    padding: 10px;",
        "    border: none;",
        "}",
        "",
        "section.polar-deck-header {",
        "    background-color: #1f1f1f;",
        "    border-bottom: 1px solid #1f1f1f;",
        "    border-top-left-radius: 0.5em;",
        "    border-top-right-radius: 0.5em;",
        "    position: relative;",
        "    float: left;",
        "    overflow: hidden",
        "    width: 100%",
        "}",
        "",
        ".polar-deck-sponsor-info {",
        "    text-align: left;",
        "}",
        "",
        "section.polar-deck-footer {",
        "    background-color: #1f1f1f;",
        "    border-top: 1px solid #1f1f1f;",
        "    border-bottom-left-radius: 0.5em;",
        "    border-bottom-right-radius: 0.5em;",
        "}",
        "",
        "a.polar-learn-more-btn.polar-btn {",
        "    background-color: #03a9f4;",
        "    color:white !important;",
        "}",
        "",
        ".polar-deck-share-btns li.email {",
        "    -webkit-filter: invert(1);",
        "}",
        ".polar-deck-sponsored-by {",
        "    color: #888888;",
        "    width: 98%;",
        "    top: 0;",
        "    display: block;",
        "    display: inline-block;",
        "    text-transform: uppercase;",
        "    position: absolute;",
        "    top: 10px;",
        "    left: 15px;",
        "    font-weight: 500;",
        "    font-size: 8px;",
        "    font-family: \"Avenir Next\", \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "}",
        "",
        ".polar-deck-close-btn {",
        "    position: absolute;",
        "    font-family: Candara, Calibri, sans-serif;",
        "    line-height: 0px;",
        "    font-size: 17px;",
        "    border: none;",
        "    text-transform: lowercase;",
        "    width: 30px;",
        "    height: 30px;",
        "    text-align: center;",
        "    color: #eaeaea;",
        "    background: #E45559;",
        "    right: 20px;",
        "    top: 25%;",
        "    text-align: center;",
        "    font-weight: normal;",
        "    transition: all .1s ease-out;",
        "    letter-spacing: 1px;",
        "}",
        "",
        ".polar-deck-close-btn:hover {",
        "    color: #fff;",
        "    background: #E45559;",
        "}",
        ""
    ].join("\n"), "head"]);


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

<div class="plr-promo-unit">
  <a href="{{link}}">
    <div class="plr-rr">
      <div class="plr-ad-unit">
              <div class="plr-thumbnail" style="background: url('{{getThumbHref}}') no-repeat center center;background-size:cover;">
        </div>
        <div class="plr-ad-content">
          <div class="plr-sponsored">Sponsor Content</div>
                  <div class="plr-title">{{title}}</div>
        </div>
      </div>
    </div>

  </a>
</div>

*/

  compiledTemplate0 = function (Handlebars,depth0,helpers,partials,data) {  this.compilerInfo = [4,'>= 1.0.0'];helpers = this.merge(helpers, Handlebars.helpers); data = data || {};  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;  buffer += "<div class=\"plr-promo-unit\">\n  <a href=\"";  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "\">\n    <div class=\"plr-rr\">\n      <div class=\"plr-ad-unit\">\n              <div class=\"plr-thumbnail\" style=\"background: url('";  if (stack1 = helpers.getThumbHref) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.getThumbHref; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "') no-repeat center center;background-size:cover;\">\n        </div>\n        <div class=\"plr-ad-content\">\n          <div class=\"plr-sponsored\">Sponsor Content</div>\n                  <div class=\"plr-title\">";  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "</div>\n        </div>\n      </div>\n    </div>\n\n  </a>\n</div>";  return buffer;  };

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