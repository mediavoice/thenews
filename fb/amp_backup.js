//AMP

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

      q().push(function() {
        var scripts = document.head.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].type.toLowerCase() === "text/mediavoice-tag") {
                document.body.appendChild(scripts[i]);
            }
        }
    });

    q().push(["insertPreview", {
        label: "NYP - AMP",
        template: compiledTemplate0,
        // unit: {
        //     "server": "mvdirect",
        //     "id": "b71a8f20c4b84815a3824168d3dfb7ec"
        // },
        // location: "#AdSlot_AF-Right-Rectangle",

        iframeMode: true,
        location: "body",
        append: true,
         unit: {
             server: "dfp-gpt",
             selfContainedMode: true,
         },
        onFill: function(data) {},
        onRender: function($element) {
            $element.next().remove();
        },
        onError: function(error) {}
    }]);

    //Style 1 - sponsored blue underline, black bottom overlay
    q().push(["injectCSS", ["",
    ".plr-rr {",
    "  width: 296px;",
    "  height: 246px;",
    "  overflow: hidden;",
    "  position: relative;",
    "  margin: auto;",
    "  text-align: left;",
    "  box-shadow: 0 0 3px #ccc;",
    "  -moz-box-shadow: 0 0 3px #ccc;",
    "  -webkit-box-shadow: 0 0 3px #ccc;",
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
    "  padding-bottom: 60%;",
    "  border: 1px solid #dedede;",
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
    ".plr-rr__content {",
    "  position: absolute;",
    "  bottom: -4px;",
    "  left: 0;",
    "  width: 100%;",
    "}",
    "",
    ".plr-rr__content__title {",
    "  font-family: Arial, sans serif;",
    "  font-size: 14px;",
    "  background-color: rgba(255, 255, 255, 1);",
    "  line-height: 20px;",
    "  padding: 8px;",
    "}",
    "",
    ".plr-rr__content__banner {",
    "  font-size: 10px;",
    "  font-family: Arial, sans-serif;",
    "  position: relative;",
    "  text-transform: uppercase;",
    "  bottom: 3px;",
    "  background: white;",
    "  padding: 0px 8px 8px;",
    "  color: #d2d2d2;",
    "}",
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

<div class="plr-rr">
  <a href="{{link}}" rel="nofollow" target="_top">
    <div class="plr-img-wrapper">
      <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
    </div>
    <div class="plr-rr__content">
      <div class="plr-rr__content__title">{{title}}</div>
      <div class="plr-rr__content__banner">Sponsored by {{sponsor.name}}</div>
    </div>
  </a>
</div>

*/

  compiledTemplate0 = function (Handlebars,depth0,helpers,partials,data) {  this.compilerInfo = [4,'>= 1.0.0'];helpers = this.merge(helpers, Handlebars.helpers); data = data || {};  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;  buffer += "<div class=\"plr-rr\">\n  <a href=\"";  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "\" rel=\"nofollow\" target=\"_top\">\n    <div class=\"plr-img-wrapper\">\n      <div style=\"background: url('";  if (stack1 = helpers.getThumbHref) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.getThumbHref; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "') no-repeat center center;\"></div>\n    </div>\n    <div class=\"plr-rr__content\">\n      <div class=\"plr-rr__content__title\">";  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }  buffer += escapeExpression(stack1)    + "</div>\n      <div class=\"plr-rr__content__banner\">Sponsored by "    + escapeExpression(((stack1 = ((stack1 = depth0.sponsor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))    + "</div>\n    </div>\n  </a>\n</div>";  return buffer;  };

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