//----------Templates---------------------------------------------------------
(function() {
    var verticalStack = "";
    var imageHero = "";
    var parallax = "";
    var carouselA = "";
    var carouselB = "";
    var collection = "";
    var largePreview = "";
    var expand = "";

    templates();

    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];

    var q = function() {
        return window.NATIVEADS_QUEUE;
    };
    q().push(["setPropertyID", "NA-DANITEST-11237996"]);
    var nike = "3c59b16ceaa549ec90c25bee127a97ae"







































    //
    //
    //---- Vertical Stack ----------------------------------------------------
    //
    //

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: "body > div > div:nth-child(1) > p:nth-child(5)",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    q().push(["injectCSS", "", "head"]);

    //
    //
    // ----- crsl ------------------------------------------------------------
    //
    //

    q().push(function() {
        var selector = "body > div > div:nth-child(1) > p:nth-child(13)";
        $(selector).after("\
            <div class=\"plr-crsl-outer\">\
                <div class=\"plr-crsl-inner\">\
                    <div class=\"plr-crsl-slot\">\
                        <div class=\"plr-slot--1\"></div>\
                    </div>\
                    <div class=\"plr-crsl-slot\">\
                        <div class=\"plr-slot--2\"></div>\
                    </div>\
                    <div class=\"plr-crsl-slot\">\
                        <div class=\"plr-slot--3\"></div>\
                    </div>\
                    <div class=\"plr-crsl-slot\">\
                        <div class=\"plr-slot--4\"></div>\
                    </div>\
                </div>\
            </div>\
        ")
    })

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".plr-slot--1",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".plr-slot--2",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".plr-slot--3",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".plr-slot--4",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    //
    //
    // ----- inbetween article -----------------------------------------------------
    //
    //



    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".article:last p:eq(10)",
        infoText: "",
        infoButtonText: "",
        template: inbetween_article,
        onRender: function($element) {
            $element.find("p").first().html("\"Innovation at Nike is not about dreaming of tomorrow. It's about accelerating toward it,\" says Tinker Hatfield. \"We're able to anticipate the needs of athletes because we know them better than anybody. Sometimes, we deliver a reality before others have even begun to imagine it.\"")

            $element.css({
                "overflow": "hidden",
                "padding-bottom": 0,
                "padding-top": 10+"px",
                "border-top": "1px solid #808080"
            });

            /* DRAWER CODE */

            $element.css({ "overflow": "hidden" })

            var initial_h,
                default_h,
                start_y;

            function get_total_height($e, except) {
                var rules = ["height", "padding-top", "padding-bottom", "margin-bottom", "margin-top"];
                var sum = 0;
                for (var i in rules) {
                    sum += parseFloat($e.css(rules[i]))
                }
                return sum;
            }

            function onresize() {
                $element.css({ "height": "initial" })

                default_h = 0 //get_total_height($element.find("h1")) + get_total_height($element.find(".plr-sponsor"));
                initial_h = get_total_height($element);

                // Make it open up earlier on mobile
                start_y = (window.innerWidth < 426) ? (window.innerHeight - 100) : (2 * window.innerHeight / 3);
            }
            window.addEventListener("resize", onresize);

            onresize();

            function open_sashimi() {
                var top = $element.get(0).getBoundingClientRect().top;

                if (top < start_y) {
                    var new_h = start_y - (top - default_h);

                    // Don't keep expanding silly!
                    if (new_h > initial_h) {
                        new_h = initial_h;
                    }
                    $element.css({ "height": new_h + "px" });
                } else {
                    $element.css({ "height": default_h + "px" });
                }

                requestAnimationFrame(open_sashimi)
            }
            open_sashimi();
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".article:last",
        infoText: "",
        infoButtonText: "",
        template: inbetween_article,
        onRender: function($element) {
            $element.find("p").first().html("\"Innovation at Nike is not about dreaming of tomorrow. It's about accelerating toward it,\" says Tinker Hatfield. \"We're able to anticipate the needs of athletes because we know them better than anybody. Sometimes, we deliver a reality before others have even begun to imagine it.\"")
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    //
    //
    // ----- imageHero ------------------------------------------------------------
    //
    //



    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: "body > div > div:nth-child(1) > p:nth-child(10)",
        infoText: "",
        infoButtonText: "",
        template: imageHero,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: "body > div > div:nth-child(1) > p:nth-child(12)",
        infoText: "",
        infoButtonText: "",
        template: imageHero,
        onRender: function($element) {
            (function($element, img_selector) {
                var w = window,
                    a = {},
                    e = $element.find(img_selector)[0].style;

                e.position = "relative";

                e.left = "initial";
                e.bottom = "initial";
                e.right = 0;
                e.top = 0;

                e.transform = "scale(2)"

                function round(x, d) {
                    d = Math.pow(10, d);
                    return (x * d | 0) / d
                };

                function parallax() {
                    // Get previous position
                    var p = {
                        x: parseFloat(e.right),
                        y: parseFloat(e.top)
                    }

                    // Calculate new offset such that it gradually moves into place, and apply
                    e.top = round(p.y + (a.y - p.y) / 10, 2) + "px";
                    e.right = round(p.x - (a.x + p.x) / 10, 2) + "px";

                    requestAnimationFrame(parallax);
                }

                function handler(b) {
                    // truncate to 1 decimal place
                    a.x = round(b[0], 1);
                    a.y = round(b[1], 1);

                    a.x = Math.abs(a.x) < 5 ? 0 : a.x;
                    a.y = Math.abs(a.y) < 5 ? 0 : a.y;


                    // Flip variables depending on orientation
                    switch (w.orientation) {
                        // Upright
                        case 0:
                            a.y += 45;
                            break;
                            // Left 
                        case 90:
                            var t = a.y;
                            a.y = -a.x;
                            a.x = t;
                            break;
                            // Right
                        case -90:
                            var t = a.y;
                            a.y = a.x;
                            a.x = -t;
                            break;
                        default:
                            a.y += 45;
                    }
                }

                if (w.DeviceOrientationEvent) {
                    console.log("a");
                    w.addEventListener("deviceorientation", function(e) {
                        // console.log(a);
                        handler([-e.gamma, -e.beta]);
                    });
                } else if (w.DeviceMotionEvent) {
                    w.addEventListener('devicemotion', function(e) {
                        handler([e.acceleration.x * 2, e.acceleration.y * 2]);
                    });
                } else {
                    w.addEventListener("MozOrientation", function(e) {
                        handler([orientation.x * 50, orientation.y * 50]);
                    });
                }

                requestAnimationFrame(parallax);
            })($element, ".plr-img-wrapper")
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    q().push(["injectCSS", "", "head"]);



    //
    //
    // ---- COLLECTION --------------------------------------------------------------
    //
    //



    q().push(function() {
        var selector = ".article:last";

        $(selector).after("\
            <style type=\"text/css\">\
            .plr-collection-container {\
                margin-bottom: 20px;\
                padding-bottom: 15px;\
            }\
            \
            .plr-header h2 {\
                margin: 0;\
                text-transform: initial;\
                display: inline-block;\
                font-size: 26px;\
            }\
            \
            .plr-header .plr-img-wrapper {\
                padding-bottom: 24px;\
                width: 13%;\
                left: 12px;\
                top: 3px;\
                position: relative;\
                display: inline-block;\
                overflow: hidden;\
            }\
            \
            .plr-header .plr-img-wrapper div {\
                position: absolute;\
                top: 0px;\
                bottom: 0px;\
                left: 0px;\
                right: 0px;\
                background-size: contain !important;\
            }\
            \
            .plr-header {\
                border-bottom: 3px solid #1879A9;\
                padding-bottom: 10px;\
            }\
            </style>\
            \
            <div class=\"plr-collection-container\">\
                <div class=\"plr-header\">\
                    <h2>Reccomended By</h2>\
                    <div class=\"plr-img-wrapper\">\
                        <div style=\"background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2000px-Logo_NIKE.svg.png') no-repeat center center;\"></div>\
                    </div>\
                </div>\
                <div class=\"plr-collection-anchor\"></div>\
            </div>\
        ");
    })

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".plr-collection-anchor",
        infoText: "",
        infoButtonText: "",
        template: collection_item,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".plr-collection-anchor",
        infoText: "",
        infoButtonText: "",
        template: collection_item,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": nike },
        location: ".plr-collection-anchor",
        infoText: "",
        infoButtonText: "",
        template: collection_item,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);































    // TEMPLATE CODE

    function templates() {
        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-fullw">
          <a href="{{link}}" rel="nofollow">
            <div class="plr-img-wrapper">
              <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
            </div>
            <div class="plr-contents" style="">
              <h1>{{title}}</h1>
              <p>{{summary}}</p>
            </div>
            <div class="plr-sponsored">Sponsor Content</div>
          </a>
        </div>

        */

        imageHero = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, options, functionType = "function",
                escapeExpression = this.escapeExpression,
                helperMissing = helpers.helperMissing;
            buffer += "<div class=\"plr-fullw\">\n  <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\" rel=\"nofollow\">\n    <div class=\"plr-img-wrapper\">\n      <div style=\"background: url('";
            options = { hash: { 'width': (1500), 'height': (1000) }, data: data };
            buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) + "') no-repeat center center;\"></div>\n    </div>\n    <div class=\"plr-contents\" style=\"\">\n      <h1>";
            if (stack2 = helpers.title) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.title;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</h1>\n      <p>";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n    </div>\n    <div class=\"plr-sponsored\">Sponsor Content</div>\n  </a>\n</div>";
            return buffer;
        };


        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-halfw">
            <a href="{{link}}" style="border-bottom: none;box-shadow: none;">
                <div class="plr-img-wrapper">
                    <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
                </div>
                <div class="plr-sponsored-disclosure">sponsor content</div>
                <h2 style="margin: 0 0 10px 0;">{{title}}</h2>
                <p style="color: #666666;margin-bottom: 0;">{{summary}}</p>
            </a>
        </div>

        */

        verticalStack = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-halfw\">\n            <a href=\"";
            if (stack1 = helpers.link) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\" style=\"border-bottom: none;box-shadow: none;\">\n                <div class=\"plr-img-wrapper\">\n                    <div style=\"background: url('";
            if (stack1 = helpers.getThumbHref) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.getThumbHref;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "') no-repeat center center;\"></div>\n                </div>\n                <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n                <h2 style=\"margin: 0 0 10px 0;\">";
            if (stack1 = helpers.title) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h2>\n                <p style=\"color: #666666;margin-bottom: 0;\">";
            if (stack1 = helpers.summary) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.summary;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</p>\n            </a>\n        </div>";
            return buffer;
        };

        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-btwn-art">
            <a href="{{link}}"><h1>{{title}}</h1></a>
            <div class="plr-sponsor">Presented by <b>{{sponsor.name}}</b></div>
            <div class="plr-img-wrapper">
                <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
            </div>
            <p>{{summary}}</p>
            <a href="{{link}}" style="text-decoration: underline;">
                <p>Continue Reading...</p>
            </a>
        </div>

        */

        inbetween_article = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-btwn-art\">\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\"><h1>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h1></a>\n    <div class=\"plr-sponsor\">Presented by <b>" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</b></div>\n    <div class=\"plr-img-wrapper\">\n        <div style=\"background: url('";
            if (stack2 = helpers.getThumbHref) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.getThumbHref;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "') no-repeat center center;\"></div>\n    </div>\n    <p>";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n    <a href=\"";
            if (stack2 = helpers.link) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.link;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "\" style=\"text-decoration: underline;\">\n        <p>Continue Reading...</p>\n    </a>\n</div>";
            return buffer;
        };

        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-collection">
            <a href="{{link}}">
                <div class="plr-img-wrapper">
                    <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
                </div>
            </a>
            <h2>{{title}}</h2>
            <p>{{summary}}</p>
            <a href="{{link}}">
                <p>Read more...</p>
            </a>
        </div>

        */

        collection_item = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-collection\">\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\">\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
            if (stack1 = helpers.getThumbHref) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.getThumbHref;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "') no-repeat center center;\"></div>\n        </div>\n    </a>\n    <h2>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h2>\n    <p>";
            if (stack1 = helpers.summary) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.summary;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</p>\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\">\n        <p>Read more...</p>\n    </a>\n</div>";
            return buffer;
        };


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

    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
})(document, "script", "nativeads-plugin");
