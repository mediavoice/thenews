(function() {
    templates();

    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];

    var q = function() {
        return window.NATIVEADS_QUEUE;
    };
    q().push(["setPropertyID", "NA-DANITEST-11237996"]);










    var standard_ad = { "server": "mvdirect", "id": "dc2b73ff3a184cf5b4fc5ad33517a017" };
    var inofgraphic_ad = { "server": "mvdirect", "id": "dee7b01db5bc41ed8da84b4437bc37ea" };

    var tweets = [
        { "server": "mvdirect", "id": "09a5eed8717944808a7c80236477535d" },
        { "server": "mvdirect", "id": "65217426654849cabef17c72935d2361" }
    ];














    /*=========================================
    =            Utility Functions            =
    =========================================*/

    // interpolate_str("I can do {thing}",{thing:"anything"}) === "I can do anything";
    // interpolate_str("Count to {0}",[53])                   === "Count to 53";
    function interpolate_str(s, o) {
        return s.replace(/{([^{}]*)}/g,
            function(a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    }

    function get_total_height($e) {
        var rules = [
            "height",
            "padding-top",
            "padding-bottom",
            "margin-bottom",
            "margin-top",
            "border-bottom-width",
            "border-top-width"
        ];
        var sum = 0;
        for (var i in rules) {
            sum += parseFloat($e.css(rules[i]));
        }
        return sum;
    }

    /*=======================================
    =            Spooky JS Magic            =
    =======================================*/

    /*----------  Kenny Burns  ----------*/

    function ken_burns_effect($element) {
        var a = {},
            e = $element.find(".plr-img-wrapper")[0].style;

        e.position = "relative";

        e.left = "initial";
        e.bottom = "initial";
        e.right = 0;
        e.top = 0;

        e.transform = "scale(1.5)";

        // Helper
        function trunc(x, d) {
            d = Math.pow(10, d);
            return (x * d | 0) / d;
        }

        // Where the magic happens ;)
        function parallax() {
            // Get previous position
            var p = {
                x: parseFloat(e.right),
                y: parseFloat(e.top)
            };

            // Calculate new offset such that it gradually moves into place, and apply
            e.top = trunc(p.y + (a.y - p.y) / 10, 2) + "px";
            e.right = trunc(p.x - (a.x + p.x) / 10, 2) + "px";

            requestAnimationFrame(parallax);
        }
        parallax();

        function handler(b) {
            // truncate to 1 decimal place
            a.x = trunc(b[0], 1);
            a.y = trunc(b[1], 1);

            a.x = Math.abs(a.x) < 5 ? 0 : a.x;
            a.y = Math.abs(a.y) < 5 ? 0 : a.y;

            // Flip variables depending on orientation
            var temp;
            switch (window.orientation) {
                case 0: // Upright
                    a.y += 45;
                    break;
                case 90: // Left 
                    temp = a.y;
                    a.y = -a.x;
                    a.x = temp;
                    break;
                case -90: // Right
                    temp = a.y;
                    a.y = a.x;
                    a.x = -temp;
                    break;
                default:
                    a.y += 0;
            }
        }

        // Cross-browser standardization of deviceorientation event
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function(e) {
                handler([-e.gamma, -e.beta]);
            });
        } else if (w.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function(e) {
                handler([e.acceleration.x * 2, e.acceleration.y * 2]);
            });
        } else {
            window.addEventListener("MozOrientation", function(e) {
                handler([orientation.x * 50, orientation.y * 50]);
            });
        }
    }

    /*----------  Scroll To Expand  ----------*/

    function scroll_to_expand($element) {
        $element.css({
            "padding-bottom": 0,
            "padding-top": 10 + "px",
            "overflow": "hidden"
        });

        var initial_h,
            default_h,
            start_y;

        // Recalculate Height when the screen size changes
        function onresize() {
            $element.css({ "height": "initial" });

            default_h =
                get_total_height($element.find("h1")) +
                get_total_height($element.find(".plr-sponsor")) +
                parseFloat($element.find(".topic").css("height"));
            initial_h = get_total_height($element);



            start_y = 2 * window.innerHeight / 3;
        }
        window.addEventListener("resize", onresize);
        onresize();


        // Main Loop
        function expand() {
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

            requestAnimationFrame(expand);
        }
        expand();
    }

    /*----------  Tap To Expand  ----------*/

    function tap_to_expand($element, time) {
        $element.css({
            "padding-bottom": 0,
            "padding-top": 10 + "px",
            "overflow": "hidden"
        });

        var sponsor_text_initial = $element.find(".plr-sponsor").first().html();
        $element.find(".plr-sponsor").html("<em>Tap</em> to learn more - " + sponsor_text_initial);

        $element.find("h1").unwrap().css({ cursor: "pointer" });

        var initial_h,
            default_h,
            been_clicked = false;

        function onresize() {
            $element.css({ "height": "initial" });

            default_h =
                get_total_height($element.find("h1")) +
                get_total_height($element.find(".plr-sponsor")) +
                parseFloat($element.find(".topic").css("height"));

            initial_h =
                get_total_height($element);

            if (!been_clicked) $element.css({ "height": default_h + "px" });
            else $element.css({ "height": initial_h + "px" });
        }


        window.addEventListener("resize", onresize);
        $element.find("img").load(onresize);
        onresize();


        $element.css({
            "transition": time + "s",
            "height": default_h + "px"
        });

        $element.find("h1").click(function() {
            if (!been_clicked) {
                $element.css({ "height": initial_h + "px" });
                been_clicked = true;
            } else {
                $element.css({ "height": default_h + "px" });
                been_clicked = false;
            }
        });
    }










    /*==========================================
    =            Template "Classes"            =
    ==========================================*/

    /*----------  Carousel  ----------*/

    var total_carousels = 0;

    function Carousel(props) {
        /*
        
        props = {
            location: jQuery selector
            ads: array of unit objects

            onRender: array of onRender function corresponding to the index in ads
            
            hero: whether to display the items as "heroes"
        }
    
        */


        if (props.ads.length === 0) return;

        /*----------  Inject Carousel Base CSS *ONCE*  ----------*/

        if (total_carousels === 0) {
            q().push(["injectCSS", ["",
                ".plr-crsl-outer {",
                "    position: relative;",
                "    overflow-x: scroll;",
                "    width: 100%;",
                "    padding: 10px 0;",
                "    border-top: 1px solid #9a9a9a;",
                "    border-bottom: 1px solid #9a9a9a;",
                "    -webkit-overflow-scrolling: touch;",
                "}",
                ".plr-crsl-slot {",
                "    position: relative;",
                "    display: table-cell;", // Table cell? Yep. Why? ¯\_(ツ)_/¯,
                "    width: 290px;", // Placeholder width..,
                "    padding: 0 20px;",
                "    border-right: 1px solid #808080;",
                "}",
                ".plr-crsl-slot:last-child {",
                "    border-right: none;",
                "}",
                ""
            ].join("\n"), "head"]);
        }

        /*----------  Inject Carousel Container HTML  ----------*/

        // Generate correct number of slots
        var slots = "";
        for (var i in props.ads)
            slots += ["",
                "<div class=\"plr-crsl-slot\">",
                "    <div class=\"plr-slot--" + i + "\"></div>",
                "</div>",
                ""
            ].join("\n");

        // Actually add the container
        var $carousel;
        q().push(function() {
            $carousel = $(props.location).after(interpolate_str(["",
                "<div class=\"plr-crsl-outer plr-crsl--{0}\">",
                "    <div class=\"plr-crsl-inner\">",
                "        {1}", // slots are inserted programatically here
                "    </div>",
                "</div>",
                ""
            ].join("\n"), [total_carousels, slots])).next();
        });

        /*----------  Inject "Variable" CSS  ----------*/

        // Change internal width to suit no. of injected ads
        q().push(["injectCSS", interpolate_str(["",
            ".plr-crsl--{0} .plr-crsl-inner {",
            "    width: {1}px;",
            "}",
            "",
            "@media only screen and (max-width: 426px) {",
            "    .plr-crsl--{0} .plr-crsl-inner {",
            "        width: {1}px;",
            "    }",
            "}",
            ""
        ].join("\n"), [total_carousels, (props.ads.length * 290 + 30)]), "head"]);

        // Change the CSS if "Hero" format is desired
        if (props.hero) {
            q().push(["injectCSS", interpolate_str(["",
                ".plr-crsl--{0} {",
                "  padding-bottom: 0; }",
                "  .plr-crsl--{0} .plr-crsl-slot {",
                "    padding: 0 5px;",
                "    border: none; }",
                "    .plr-crsl--{0} .plr-crsl-slot .plr-crsl-item {",
                "      padding-bottom: 0; }",
                "      .plr-crsl--{0} .plr-crsl-slot .plr-crsl-item .plr-sponsored-disclosure {",
                "        display: none; }",
                "      .plr-crsl--{0} .plr-crsl-slot .plr-crsl-item .plr-img-wrapper {",
                "        width: 100%; }",
                "    .plr-crsl--{0} .plr-crsl-slot:first-child .plr-sponsored-disclosure {",
                "      font-size: 16px;",
                "      position: absolute;",
                "      top: -24px;",
                "      left: 0;",
                "      display: inherit; }",
                ""
            ].join("\n"), [total_carousels]), "head"]);
        }

        /*----------  Insert the Carousel Items  ----------*/

        var faliures = 0,
            incfaliure = function() { faliures++; };

        for (var j in props.ads) {
            q().push(["insertPreview", {
                label: interpolate_str("Carousel {0} - Slot {1}", [total_carousels, j]),
                unit: props.ads[j],
                location: interpolate_str(".plr-crsl--{0} .plr-slot--{1}", [total_carousels, j]),
                infoText: "",
                infoButtonText: "",
                template: carousel_item,
                onRender: ((props.onRender && props.onRender[j]) ? props.onRender[j] : null),
                onFill: function(data) {},
                onError: incfaliure
            }]);
        }

        // Make sure that if all the ads failed, don't even show the carousel
        if (faliures == props.ads.length) $carousel.remove();
        else total_carousels++;
    }

    /*----------  Collection  ----------*/

    var total_collections = 0;

    function Collection(props) {
        /* 
        props = {
            location: jQuery selector
            ads: array of unit objects
            onRender: array of onRender function corresponding to the index in ads

            display:    "hero"
                     OR "noThumb"
                     OR "bigThumb"
        }
        */


        /*----------  Inject Base Container CSS *ONCE*  ----------*/

        if (total_collections === 0) {
            q().push(["injectCSS", ["",
                ".plr-collection-container {",
                "    margin-bottom: 20px;",
                "    padding-bottom: 15px;",
                "}",
                ".plr-collection-container .plr-header h2 {",
                "    margin: 0;",
                "    text-transform: initial;",
                "    display: inline-block;",
                "    font-size: 26px;",
                "}",
                ".plr-collection-container .plr-header {",
                "    border-bottom: 3px solid #1879A9;",
                "    padding-bottom: 10px;",
                "}"
            ].join("\n"), "head"]);
        }

        /*----------  Inject Container HTML  ----------*/

        var $collection;
        q().push(function() {
            $collection = $(props.location).after(["",
                "<div class=\"plr-collection-container plr-collection--" + total_collections + "\">",
                "    <div class=\"plr-header\">",
                "        <h2>Sponsored Stories</h2>",
                "    </div>",
                "    <div class=\"plr-collection-anchor--top\"></div>",
                "    <div class=\"plr-collection-anchor\"></div>",
                "</div>",
                ""
            ].join("\n")).next();
        });

        /*----------  Inject CSS  ----------*/
        // Varies depending on what style collection the user wants

        // These are the base properties that never change, so we inject them *ONCE*
        if (total_collections === 0) {
            q().push(["injectCSS", ["",
                "  .plr-collection p:last-child {", /* hide read more by default */
                "    display: none; }",
                /* On Mobile */
                "@media only screen and (max-width: 426px) {",
                "  .plr-collection p:not(:nth-child(1)) {", // hide the summary
                "    display: none; }",
                "  .plr-collection h2 {", // make font smaller on mobile
                "    font-size: 18px; }",
                "  .plr-collection .plr-img-wrapper {", // make images big on mobile
                "    width: 100%;",
                "    padding-bottom: 50%;",
                "    margin-bottom: 10px;",
                "  }",
                "}"
            ].join("\n"), "head"]);
        }

        // Now we inject the "variable" CSS
        var style = "";
        if (props.display === "hero") {
            style += interpolate_str(["",
                /* On all elements but the first */
                ".plr-collection--{0} .plr-collection:not(:nth-child(2)) .plr-img-wrapper", // hide the image
                "{ display: none; }",
                /* For the first element */
                ".plr-collection--{0} .plr-collection:nth-child(2) p:last-child", // show the read more
                "{ display: block; }",
                /* Mobile */
                "@media only screen and (max-width: 426px) {",
                "    .plr-collection--{0} .plr-collection:nth-child(2) p:not(:nth-child(1))", /* For the first */
                "    { display: block; }", // show the summary
                "}"
            ].join("\n"), [total_collections]);
        } else if (props.display === "noThumb") {
            style += interpolate_str(["",
                ".plr-collection--{0} .plr-collection .plr-img-wrapper", // hide the image
                "{ display: none; }"
            ].join("\n"), [total_collections]);
        }
        // bigThumb is implied

        q().push(["injectCSS", style, "head"]);

        /*----------  Insert the Collection Items  ----------*/

        var faliures = 0,
            incfaliure = function() { faliures++; };

        for (var i = 0; i < props.ads.length; i++) {
            var location = ".plr-collection--" + total_collections + " .plr-collection-anchor";
            if (i === 0) location += "--top";

            q().push(["insertPreview", {
                label: "Landing Page",
                unit: props.ads[i],
                location: location,
                infoText: "",
                infoButtonText: "",
                template: collection_item,
                onRender: ((props.onRender && props.onRender[j]) ? props.onRender[j] : null),
                onFill: function(data) {},
                onError: faliures
            }]);
        }

        // Make sure that if all the ads failed, don't even show the carousel
        if (faliures == props.ads.length) $collection.remove();
        else total_collections++;

        total_collections++;
    }

    /*----------  Vertical Stack  ----------*/

    function VerticalStack(props) {
        /*
        props = {
            location: jQuery Selector | where to put the ad
            ad: Creative ID           | which creative
            display: {                | Options related to how it looks
                thumb:    "circle"    |
                       OR "square"    |     What the thumb should look like
                       OR "none"      |
                summary: bool         |     Show / Hide the summary
            }
        }
    
        */
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: props.ad,
            location: props.location,
            infoText: "",
            infoButtonText: "",
            template: verticalStack,
            onRender: function($element) {
                /* THUMB OPTIONS */
                var img = $element.find(".plr-img-wrapper").first();

                // circle by default
                switch (props.display.thumb) {
                    case "rectangle":
                        img.find("div").first().css({ "border-radius": "0" });
                        img.css({ "width": "100%", "padding-bottom": "50%" });
                        break;
                    case "square":
                        img.find("div").first().css({ "border-radius": "0" });
                        break;
                    case "none":
                        img.remove();
                        break;
                    default: // Circle by default
                        break;
                }

                /* SUMMARY OPTIONS */
                if (props.display.summary === false) {
                    $element.find("p").first().remove();
                }
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }

    /*----------  Twitter Carousel  ----------*/

    var total_twitter_carousels = 0;

    function TwitterCarousel(props) {
        /*
        
        props = {
            location: jQuery selector
            campaign_collection_unit: collection unit object

            onRender: function to run on render

            show_sponsor: true/false to show "Sposnored By XYZ"
        }
    
        */

        /*----------  Inject Carousel Base CSS *ONCE*  ----------*/
        var card_width = 240;

        if (total_twitter_carousels === 0) {
            q().push(["injectCSS", ["",
                ".plr-twtr-crsl-outer {",
                "    position: relative;",
                "    overflow-x: scroll;",
                "    width: 100%;",
                "    border-top: 1px solid #9a9a9a;",
                "    border-bottom: 1px solid #9a9a9a;",
                "    -webkit-overflow-scrolling: touch;",
                "}",
                ".plr-twtr-crsl-slot {",
                "    position: relative;",
                "    display: inline-block;",
                "    width: " + card_width + "px;",
                "    vertical-align: middle;",
                "    padding: 0 5px;",
                "}",


                ".plr-twtr-crsl {",
                "    padding: 5px 0px;",
                "}",
                ".plr-twtr-crsl h1 {",
                "    border: 0;",
                "    margin: 0;",
                "}",
                ".plr-twtr-crsl h2 {",
                "    margin: 0;",
                "    padding-top: 5px;",
                "    font-size: 18px;",
                "    text-transform: initial;",
                "    text-align: right;",
                "}",
                "",
            ].join("\n"), "head"]);
        }

        /*----------  Inject "Variable" CSS  ----------*/

        // Change internal width to suit no. of injected ads
        q().push(["injectCSS", interpolate_str(["",
            ".plr-twtr-crsl .plr-twtr-crsl-inner {",
            "    width: {0}px;",
            "}",
            "",
            "@media only screen and (max-width: 426px) {",
            "    .plr-twtr-crsl .plr-twtr-crsl-inner {",
            "        width: {0}px;",
            "    }",
            "}",
            ""
        ].join("\n"), [5 * card_width + 30]), "head"]);

        /*----------  Insert the Carousel Items  ----------*/

        q().push(["insertPreviewCollection", {
            label: "Home",
            unit: props.campaign_collection_unit,
            location: props.location,
            previews: [
                { name: "plr-tweet--1" },
                { name: "plr-tweet--2" },
                { name: "plr-tweet--3" },
                { name: "plr-tweet--4" },
                { name: "plr-tweet--5" }
            ],
            infoText: "",
            infoButtonText: "",
            template: twtr_crsl,
            onRender: function($element) {
                if (props.show_sponsor === false) {
                    $element.find("h2").remove();
                }

                var sponsor_name = $element.find(".plr-sponsor-name").first().text();
                $element.find("h2").text("Sponsored By " + sponsor_name);

                if (props.onRender) props.onRender();
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        total_twitter_carousels++;
    }






























    /*=======================================
    =            Insert Previews            =
    =======================================*/

    $(".items").click(function(){
        location.reload();
    });

    /*==========  #all  ==========*/

    if(location.hash=='' || location.hash=="#all"){
    console.log("Load - All")


        /*----------  Vertical Stack  ----------*/

        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: standard_ad,
                display: {
                    thumb: "circle",
                    /* OR "square" OR "none" OR "rectangle" */
                    summary: true
                }
            });
        });
        /*----------  Hero  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(7)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Carousel 1  ----------*/

        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(8)",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad
                ]
            });
        });

        /*----------  Carousel 2  ----------*/

        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(13)",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                onRender: [function($element) {
                    $element
                        .find(".plr-sponsored-disclosure")
                        .text("sponsored by slate");
                }],
                hero: true
            });
        });

        /*----------  In Between Article  ----------*/


        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Parallax Hero  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last p:eq(3)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {
                ken_burns_effect($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  In-Article Pullout  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last p:eq(10)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                scroll_to_expand($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Tap To Expand Article  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last p:eq(15)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                tap_to_expand($element,1);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Tap To Expand Infographic  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: inofgraphic_ad,
            location: ".article:last p:eq(18)",
            infoText: "",
            infoButtonText: "",
            template: infographic,
            onRender: function($element) {
                tap_to_expand($element,2);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Collection 1 ----------*/

        q().push(function() {
            new Collection({
                location: ".article:last",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                display: "hero" /* OR bigThumb OR noThumb */
            });
        });
    }



    /*==========  #vstack  ==========*/
    if(location.hash=="#vstack"){
        console.log("Load - Vertical Stack")
        //rectangle
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: standard_ad,
                display: {
                    thumb: "rectangle",
                    summary: true
                }
            });
        });
        //circle
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(8)",
                ad: standard_ad,
                display: {
                    thumb: "circle",
                    summary: true
                }
            });
        });
        //square
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(13)",
                ad: standard_ad,
                display: {
                    thumb: "square",
                    summary: true
                }
            });
        });
        //none
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(16)",
                ad: standard_ad,
                display: {
                    thumb: "none",
                    summary: true
                }
            });
        });
    }
    /*==========  #hstack  ==========*/
    if(location.hash=="#hstack"){
        console.log("Load - Horizontal Stack")
    
    }

    /*==========  #hero  ==========*/
    if(location.hash=="#hero"){
        console.log("Load - Hero")
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(2)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*==========  #carousel  ==========*/
    if(location.hash=="#carousel"){
        console.log("Load - Carousel")
        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(8)",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad
                ]
            });
        });
    }
    /*==========  #blog  ==========*/
    //without image
    if(location.hash=="#blog"){
        console.log("Load - Blog")
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(2)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {$(".plr-img-wrapper").remove()},
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    //with image
    if(location.hash=="#blog"){
        console.log("Load - Blog")
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*==========  #collection  ==========*/
    if(location.hash=="#collection"){
        console.log("Load - Collection")
        q().push(function() {
            new Collection({
                location: ".article:eq(0)",
                append:true,
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                display: "bigThumb" /* OR bigThumb OR noThumb */
            });
        });
        q().push(function() {
            new Collection({
                location: ".article:last",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                display: "hero" /* OR bigThumb OR noThumb */
            });
        });
    
    }
    /*==========  #interactive  ==========*/
    if(location.hash=="#interactive"){
        console.log("Load - Interactive")
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(3)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {
                ken_burns_effect($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);    
    }
    /*==========  #expandable  ==========*/
    if(location.hash=="#expandable"){
        console.log("Load - Expandable")
        //scroll-to-expand
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(2)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                scroll_to_expand($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
        //tap-to-expand
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(5)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                tap_to_expand($element,1);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
        //infographic
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: inofgraphic_ad,
            location: ".article p:eq(8)",
            infoText: "",
            infoButtonText: "",
            template: infographic,
            onRender: function($element) {
                tap_to_expand($element,2);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);    
    }
    /*==========  #video  ==========*/
    if(location.hash=="#video"){
        console.log("Load - Video")
    
    }

    /*==========  #secret  ==========*/
    if(location.hash=="#secret"){
        console.log("Load - Dexter's Lab")
        
        /*----------  Tweets  ----------*/

        q().push(function() {
            new TwitterCarousel({
                location: ".article:eq(0) p:eq(12)",
                campaign_collection_unit: {
                    "server": "mvdirect",
                    "id": "collection_a478cfee2ce749c78c9d020ce0cce377"
                },
                show_sponsor: true
            });
        });
    }    

    /*==========  #pratik  ==========*/
    if(location.hash=="#pratik"){
        console.log("Load - helloPratik")
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: standard_ad,
                display: {
                    thumb: "rectangle",
                    summary: true
                }
            });
        });
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(8)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(13)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {
                ken_burns_effect($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }










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

        <div class="plr-collection">
            <a href="{{link}}">
                <div class="plr-img-wrapper">
                    <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
                </div>
                <h2>{{title}}</h2>
            </a>
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
            buffer += escapeExpression(stack1) + "') no-repeat center center;\"></div>\n        </div>\n        <h2>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h2>\n    </a>\n    <p>";
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


        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-crsl-item">
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

        carousel_item = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, options, functionType = "function",
                escapeExpression = this.escapeExpression,
                helperMissing = helpers.helperMissing;
            buffer += "<div class=\"plr-crsl-item\">\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\" style=\"border-bottom: none;box-shadow: none;\">\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
            options = { hash: { 'width': (1500), 'height': (1000) }, data: data };
            buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) + "') no-repeat center center;\"></div>\n        </div>\n        <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n        <h2>";
            if (stack2 = helpers.title) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.title;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</h2>\n        <p style=\"color: #666666;margin-bottom: 0;\">";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n    </a>\n</div>";
            return buffer;
        };

        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-twtr-crsl">
            <h1>#StuporTuesday</h1>
            <div class="plr-twtr-crsl-outer">
                <div class="plr-twtr-crsl-inner">
                    {{#each creatives}}
                    <div class="plr-twtr-crsl-slot plr-tweet--{{@index}}">
                        <blockquote class="twitter-tweet" data-lang="en">
                            <a href="{{link}}"></a>
                        </blockquote>
                        <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
                    </div>
                    <div class="plr-sponsor-name" style="display:none">{{sponsor.name}}</div>
                    {{/each}}
                </div>
            </div>
            <h2>Sponsored By Our Sponsors</h2>
        </div>

        */

        twtr_crsl = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, functionType = "function",
                escapeExpression = this.escapeExpression,
                self = this;

            function program1(depth0, data) {
                var buffer = "",
                    stack1, stack2;
                buffer += "\n            <div class=\"plr-twtr-crsl-slot plr-tweet--" + escapeExpression(((stack1 = ((stack1 = data), stack1 == null || stack1 === false ? stack1 : stack1.index)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "\">\n                <blockquote class=\"twitter-tweet\" data-lang=\"en\">\n                    <a href=\"";
                if (stack2 = helpers.link) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) + "\"></a>\n                </blockquote>\n                <script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n            </div>\n            <div class=\"plr-sponsor-name\" style=\"display:none\">" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n            ";
                return buffer;
            }
            buffer += "<div class=\"plr-twtr-crsl\">\n    <h1>#StuporTuesday</h1>\n    <div class=\"plr-twtr-crsl-outer\">\n        <div class=\"plr-twtr-crsl-inner\">\n            ";
            stack1 = helpers.each.call(depth0, depth0.creatives, { hash: {}, inverse: self.noop, fn: self.program(1, program1, data), data: data });
            if (stack1 || stack1 === 0) { buffer += stack1; }
            buffer += "\n        </div>\n    </div>\n    <h2>Sponsored By Our Sponsors</h2>\n</div>";
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
            <img src="{{getThumbHref width=425}}" style="width:100%">
            <p>{{summary}}</p>
            <a href="{{link}}" style="text-decoration: underline;">
                <p>Continue Reading...</p>
            </a>
        </div>

        */

        infographic = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, options, functionType = "function",
                escapeExpression = this.escapeExpression,
                helperMissing = helpers.helperMissing;
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
            buffer += escapeExpression(stack1) + "</h1></a>\n    <div class=\"plr-sponsor\">Presented by <b>" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</b></div>\n    <img src=\"";
            options = { hash: { 'width': (425) }, data: data };
            buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) + "\" style=\"width:100%\">\n    <p>";
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







    }
    /* jshint ignore:end */
})();


(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = d.location.protocol;
    if (d.getElementById(id)) return;
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
