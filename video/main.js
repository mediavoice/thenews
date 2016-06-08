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
    var nike = "3c59b16ceaa549ec90c25bee127a97ae";

    /*===========================================
    =            Auxiallry Functions            =
    ===========================================*/

    function add_play_icon($element) {
        $element.find(".plr-img-wrapper > div").append("" +
            "    <div style=\"height: 100%;\">           " +
            "        <img src=\"play_icon.png\" style=\" " +
            "            width: 50%;                     " +
            "            top: 50%;                       " +
            "            position:                       " +
            "            relative;                       " +
            "            transform: translateY(-50%);    " +
            "            opacity: 0.75;\">               " +
            "    </div>                                  " +
            "");
    }

    function add_play_banner($element) {
        $element.find(".plr-img-wrapper > div").append("" +
            "    <div style=\"                  " +
            "        color: white;              " +
            "        background-color: #3C3C3C; " +
            "        display: inline-block;     " +
            "        line-height: 12px;         " +
            "        position: absolute;        " +
            "        left: 0;                   " +
            "        bottom: 0px;               " +
            "    \">                            " +
            "      <div style=\"                " +
            "        color: #1877AB;            " +
            "        background-color: white;   " +
            "        display: inline-block;     " +
            "        position: relative;        " +
            "        padding: 5px 4px;          " +
            "        top: 0px;                  " +
            "        height: 23px;              " +
            "    \">&#9654;&#xFE0E;</div><div style=\"  " +
            "        display: inline-block;     " +
            "        padding: 4px;              " +
            "        font-size: 12px;           " +
            "        position: relative;        " +
            "        top: -2px;                 " +
            "    \"> 00:21 </div></div>         " +
            "");
    }

    /*=====  End of Auxiallry Functions  ======*/


    /*=======================================
    =            Insert Previews            =
    =======================================*/

    /*----------  Vertical Stack  ----------*/

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "51a1174a5ea44bab823527e407bc9c72" },
        location: "body > div > div:nth-child(1) > p:nth-child(7)",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            add_play_icon($element);

            $element.click(function() {
                setTimeout(function() {
                    $(".polar-deck-body").css({
                        height: "538",
                        "background-color": "black"
                    });
                    $(".polar-deck-frame").css({
                        height: "210px",
                        top: "50%",
                        position: "relative",
                        transform: "translateY(-50%)"
                    });
                }, 1000);
            });
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    q().push(["injectCSS", "", "head"]);

    /*----------  Hero  ----------*/

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "d56273f226844406aa0551fe7ac26e91" },
        location: "body > div > div:nth-child(1) > p:nth-child(13)",
        infoText: "",
        infoButtonText: "",
        template: imageHero,
        onRender: function($element) {
            $element.find(".plr-contents").after("" +
                "<div class=\"plr-sponsored\" style=\"                 " +
                "        right: inherit;                               " +
                "        bottom: inherit;                              " +
                "        left: 5px;                                    " +
                "        top: 5px;                                     " +
                "        padding: 5px;                                 " +
                "        background-color: rgba(0,0,0,0.6);            " +
                "        border-radius: 2px;                           " +
                "    \">&#9654; PLAY VIDEO &nbsp; | &nbsp;  1:35</div> " +
                "");

        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    /*----------  Carousel 1  ----------*/


    q().push(function() {
        var selector = "body > div > div:nth-child(1) > p:nth-child(13)";
        $(selector).after("" +
            "    <div class=\"plr-crsl-outer plr-crsl--1\">    " +
            "        <div class=\"plr-crsl-inner\">            " +
            "            <div class=\"plr-crsl-slot\">         " +
            "                <div class=\"plr-slot--1\"></div> " +
            "            </div>                                " +
            "            <div class=\"plr-crsl-slot\">         " +
            "                <div class=\"plr-slot--2\"></div> " +
            "            </div>                                " +
            "            <div class=\"plr-crsl-slot\">         " +
            "                <div class=\"plr-slot--3\"></div> " +
            "            </div>                                " +
            "            <div class=\"plr-crsl-slot\">         " +
            "                <div class=\"plr-slot--4\"></div> " +
            "            </div>                                " +
            "        </div>                                    " +
            "    </div>                                        " +
            "");
    });

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "3006a7eb8b124a0199abb5bac910c06f" },
        location: ".plr-crsl--1 .plr-slot--1",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            add_play_banner($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "8616c2299065470a984187177e44f7bd" },
        location: ".plr-crsl--1 .plr-slot--2",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            add_play_banner($element);

            $element.click(function() {
                setTimeout(function() {
                    $(".polar-deck-body").css({
                        height: "538",
                        "background-color": "black"
                    });
                    $(".polar-deck-frame").css({
                        height: "210px",
                        top: "50%",
                        position: "relative",
                        transform: "translateY(-50%)"
                    });
                }, 1000);
            });
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "15c180cab1e4479688db17672f29ba5d" },
        location: ".plr-crsl--1 .plr-slot--3",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            add_play_banner($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "b953a00e34454ca396c0427236747555" },
        location: ".plr-crsl--1 .plr-slot--4",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            add_play_banner($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    /*----------  Carousel 2  ----------*/

    q().push(function() {
        var selector = "body > div > div:nth-child(1) > p:nth-child(18)";
        $(selector).after("" +
            "    <div class=\"plr-crsl-outer plr-crsl--2\">    " +
            "        <div class=\"plr-crsl-inner\">            " +
            "            <div class=\"plr-crsl-slot\">         " +
            "                <div class=\"plr-slot--1\"></div> " +
            "            </div>                                " +
            "            <div class=\"plr-crsl-slot\">         " +
            "                <div class=\"plr-slot--2\"></div> " +
            "            </div>                                " +
            "            <div class=\"plr-crsl-slot\">         " +
            "                <div class=\"plr-slot--3\"></div> " +
            "            </div>                                " +
            "        </div>                                    " +
            "    </div>                                        " +
            "                                                  " +
            "");
    });

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "6b5a14b11515463bba769237d0f10b10" },
        location: ".plr-crsl--2 .plr-slot--1",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            $element.find(".plr-sponsored-disclosure").text("sponsored by purina");

            $element.find(".plr-img-wrapper > div").append("" +
                "<div style=\"color: white;background-color: #1877AB;display: inline-block;position: absolute;left: 0;bottom: 0px;height: 50px;width: 100px;\">                  <div style=\"color: #FFFFFF;top: 50%;position: relative;transform: translateY(-50%) scale(2);\">    &#9654;&#xFE0E;</div></div>" +
                "");
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "bcdc3f9eacc4458d84d54ec956969cef" },
        location: ".plr-crsl--2 .plr-slot--2",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            $element.find(".plr-img-wrapper > div").append("" +
                "<div style=\"color: white;background-color: #1877AB;display: inline-block;position: absolute;left: 0;bottom: 0px;height: 50px;width: 100px;\">                  <div style=\"color: #FFFFFF;top: 50%;position: relative;transform: translateY(-50%) scale(2);\">    &#9654;&#xFE0E;</div></div>" +
                "");
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "2095a143a0254b7081e7bb6f1b04db17" },
        location: ".plr-crsl--2 .plr-slot--3",
        infoText: "",
        infoButtonText: "",
        template: verticalStack,
        onRender: function($element) {
            $element.find(".plr-img-wrapper > div").append("" +
                "<div style=\"color: white;background-color: #1877AB;display: inline-block;position: absolute;left: 0;bottom: 0px;height: 50px;width: 100px;\">                  <div style=\"color: #FFFFFF;top: 50%;position: relative;transform: translateY(-50%) scale(2);\">    &#9654;&#xFE0E;</div></div>" +
                "");
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    /*----------  In-Article Pullout  ----------*/


    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "fedb1ab67c104697babe619fd1a4b480" },
        location: ".article:last p:eq(10)",
        infoText: "",
        infoButtonText: "",
        template: btwn_video,
        onRender: function($element) {
            // $element.find("p").first().html("\"Innovation at Nike is not about dreaming of tomorrow. It's about accelerating toward it,\" says Tinker Hatfield. \"We're able to anticipate the needs of athletes because we know them better than anybody. Sometimes, we deliver a reality before others have even begun to imagine it.\"")



            $element.css({
                "overflow": "hidden",
                "padding-bottom": 0,
                "padding-top": 10 + "px",
            });

            /* DRAWER CODE */

            $element.css({ "overflow": "hidden" });

            var initial_h,
                default_h,
                start_y;

            function get_total_height($e, except) {
                var rules = ["height", "padding-top", "padding-bottom", "margin-bottom", "margin-top", "border-bottom-width", "border-top-width"];
                var sum = 0;
                for (var i in rules) {
                    sum += parseFloat($e.css(rules[i]));
                }
                return sum;
            }

            function onresize() {
                $element.css({ "height": "initial" });

                default_h = get_total_height($element.find("h1")) + get_total_height($element.find(".plr-sponsor")) + parseFloat($element.find(".topic").css("height"));
                initial_h = get_total_height($element);

                // Make it open up earlier on mobile
                start_y = (window.innerWidth < 426) ? (window.innerHeight - 300) : (2 * window.innerHeight / 3);
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

                requestAnimationFrame(open_sashimi);
            }
            open_sashimi();
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "ed3f975af7a14be79dc9f141148b4cfd" },
        location: ".article:last p:eq(18)",
        infoText: "",
        infoButtonText: "",
        template: btwn_video,
        onRender: function($element) {
            // $element.find("p").first().html("\"Innovation at Nike is not about dreaming of tomorrow. It's about accelerating toward it,\" says Tinker Hatfield. \"We're able to anticipate the needs of athletes because we know them better than anybody. Sometimes, we deliver a reality before others have even begun to imagine it.\"")



            $element.css({
                "overflow": "hidden",
                "padding-bottom": 0,
                "padding-top": 10 + "px",
            });

            /* DRAWER CODE */

            $element.css({ "overflow": "hidden" });

            var initial_h,
                default_h,
                start_y;

            function get_total_height($e, except) {
                var rules = ["height", "padding-top", "padding-bottom", "margin-bottom", "margin-top", "border-bottom-width", "border-top-width"];
                var sum = 0;
                for (var i in rules) {
                    sum += parseFloat($e.css(rules[i]));
                }
                return sum;
            }

            function onresize() {
                $element.css({ "height": "initial" });

                default_h = get_total_height($element.find("h1")) + get_total_height($element.find(".plr-sponsor")) + parseFloat($element.find(".topic").css("height"));
                initial_h = get_total_height($element);

                // Make it open up earlier on mobile
                start_y = (window.innerWidth < 426) ? (window.innerHeight - 300) : (2 * window.innerHeight / 3);
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

                requestAnimationFrame(open_sashimi);
            }
            open_sashimi();
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    /*----------  In Between Article  ----------*/

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "a54de504c3dd4797a77ceadfb8a24bf2" },
        location: ".article:last",
        infoText: "",
        infoButtonText: "",
        template: btwn_video,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    /*----------  Collection  ----------*/

    q().push(function() {
        var selector = ".article:last";

        $(selector).after("" +
            "    <style type=\"text/css\">                                                                                                                                                      " +
            "    .plr-collection-container {                                                                                                                                                    " +
            "        margin-bottom: 20px;                                                                                                                                                       " +
            "        padding-bottom: 15px;                                                                                                                                                      " +
            "    }                                                                                                                                                                              " +
            "                                                                                                                                                                                   " +
            "    .plr-header h2 {                                                                                                                                                               " +
            "        margin: 0;                                                                                                                                                                 " +
            "        text-transform: initial;                                                                                                                                                   " +
            "        display: inline-block;                                                                                                                                                     " +
            "        font-size: 26px;                                                                                                                                                           " +
            "    }                                                                                                                                                                              " +
            "                                                                                                                                                                                   " +
            "    .plr-header .plr-img-wrapper {                                                                                                                                                 " +
            "        padding-bottom: 24px;                                                                                                                                                      " +
            "        width: 30%;                                                                                                                                                                " +
            "        left:0px;                                                                                                                                                                " +
            "        top: 3px;                                                                                                                                                                  " +
            "        position: relative;                                                                                                                                                        " +
            "        display: inline-block;                                                                                                                                                     " +
            "        overflow: hidden;                                                                                                                                                          " +
            "    }                                                                                                                                                                              " +
            "                                                                                                                                                                                   " +
            "    .plr-header .plr-img-wrapper div {                                                                                                                                             " +
            "        position: absolute;                                                                                                                                                        " +
            "        top: 0px;                                                                                                                                                                  " +
            "        bottom: 0px;                                                                                                                                                               " +
            "        left: 0px;                                                                                                                                                                 " +
            "        right: 0px;                                                                                                                                                                " +
            "        background-size: contain !important;                                                                                                                                       " +
            "    }                                                                                                                                                                              " +
            "                                                                                                                                                                                   " +
            "    .plr-header {                                                                                                                                                                  " +
            "        border-bottom: 3px solid #1879A9;                                                                                                                                          " +
            "        padding-bottom: 10px;                                                                                                                                                      " +
            "    }                                                                                                                                                                              " +
            "    </style>                                                                                                                                                                       " +
            "                                                                                                                                                                                   " +
            "    <div class=\"plr-collection-container\">                                                                                                                                       " +
            "        <div class=\"plr-header\">                                                                                                                                                 " +
            "            <h2>Reccomended By</h2>                                                                                                                                                " +
            "            <div class=\"plr-img-wrapper\">                                                                                                                                        " +
            "                <div style=\"background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Purina-logo.svg/2000px-Purina-logo.svg.png') no-repeat center center;\"></div> " +
            "            </div>                                                                                                                                                                 " +
            "        </div>                                                                                                                                                                     " +
            "        <div class=\"plr-collection-anchor--hardcoded\"></div>                                                                                                                     " +
            "        <div class=\"plr-collection-anchor\"></div>                                                                                                                                " +
            "    </div>                                                                                                                                                                         " +
            "");
    });

    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "d56273f226844406aa0551fe7ac26e91" },
        location: ".plr-collection-anchor--hardcoded",
        infoText: "",
        infoButtonText: "",
        template: collection_item,
        onRender: function($element) {
            $element.find(".plr-img-wrapper > div").append("" +
                "<div style=\"color: white;background-color: rgba(60, 60, 60, 0);display: inline-block;line-height: 12px;position: absolute;left: 10px;bottom: 10px;border: 2px solid white;padding: 10px;border-radius: 100px;\">                  <div style=\"color: rgba(255, 255, 255, 0);background-color: rgba(255, 255, 255, 0);display: inline-block;-webkit-text-stroke: white 1px;margin-right: 9px;\">   &#9654;&#xFE0E;</div><div style=\"display: inline-block;position: relative;font-size: 15px;top: -1px;\">WATCH</div></div>" +
                "");
        },
        onFill: function(data) {},
        onError: function(error) {}
    }]);
    q().push(["insertPreview", {
        label: "Landing Page",
        unit: { "server": "mvdirect", "id": "0de95dc78ab64551af129ea1a6c7bca2" },
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
        unit: { "server": "mvdirect", "id": "e190767536954f418c789fc19347b240" },
        location: ".plr-collection-anchor",
        infoText: "",
        infoButtonText: "",
        template: collection_item,
        onRender: function($element) {},
        onFill: function(data) {},
        onError: function(error) {}
    }]);

    /*=====  End of Insert Previews  ======*/





























    /*=================================
    =            Templates            =
    =================================*/

    /* jshint ignore:start */
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
                    <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
                </div>
                <div class="plr-sponsored-disclosure">sponsor content</div>
                <h2>{{title}}</h2>
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
            buffer += escapeExpression(stack1) + "') no-repeat center center;\"></div>\n                </div>\n                <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n                <h2>";
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
            <div class="topic">sponsored</div>
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
            buffer += "<div class=\"plr-btwn-art\">\n  <div class=\"topic\">sponsored</div>\n  <a href=\"";
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

        <div class="plr-btwn-art">
            <div class="topic">sponsored</div>
            <a href="{{link}}"><h1>{{title}}</h1></a>
            <div class="plr-sponsor">Presented by <b>{{sponsor.name}}</b></div>
            <div style="display: block; position: relative; max-width: 100%;">
                <div style="padding-top: 56.25%;overflow: hidden;">
                    <iframe src="{{link}}" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" style="width: 100%;height: 103%;position: absolute;top: 0px;bottom: 0px;right: 0px;left: 0px;border: none;"></iframe>
                </div>
            </div>
            <p>{{summary}}</p>
        </div>

        */

        btwn_video = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-btwn-art\">\n    <div class=\"topic\">sponsored</div>\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\"><h1>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h1></a>\n    <div class=\"plr-sponsor\">Presented by <b>" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</b></div>\n    <div style=\"display: block; position: relative; max-width: 100%;\">\n        <div style=\"padding-top: 56.25%;overflow: hidden;\">\n            <iframe src=\"";
            if (stack2 = helpers.link) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.link;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "\" allowfullscreen=\"\" webkitallowfullscreen=\"\" mozallowfullscreen=\"\" style=\"width: 100%;height: 103%;position: absolute;top: 0px;bottom: 0px;right: 0px;left: 0px;border: none;\"></iframe>\n        </div>\n    </div>\n    <p>";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n</div>";
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
    /*=====  End of Templates  ======*/

    /* jshint ignore:end */

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

    // Inject jQuery
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);

})(document, "script", "nativeads-plugin");
