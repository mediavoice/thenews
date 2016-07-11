(function() {
    var templates;
    populate_templates();

    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];

    var q = function() {
        return window.NATIVEADS_QUEUE;
    };
    q().push(["setPropertyID", "NA-DANITEST-11237996"]);

    /*======================================
    =            AD Definitions            =
    ======================================*/

    var ads = {
        "standard_ad": {
            "server": "mvdirect",
            "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
        },
        "inofgraphic_ad": {
            "server": "mvdirect",
            "id": "dee7b01db5bc41ed8da84b4437bc37ea"
        },
        "panorama_ad": {
            "server": "mvdirect",
            "id": "759b77783e0a4db18fb363dd2e1aa3be"
        },
        "panorama_ad2": {
            "server": "mvdirect",
            "id": "2913cfc8aabb4d20a1d052c07badb450"
        },
        "c2": {
            "server": "mvdirect",
            "id": "f278c44c9f11494ca9c57714599054c6"
        },
        "c3": {
            "server": "mvdirect",
            "id": "ceff856877e94c3d9b1fe825be40a650"
        },
        "c4": {
            "server": "mvdirect",
            "id": "afc61bcb3d6e4995a92b632d02f4e03f"
        },
        "c5": {
            "server": "mvdirect",
            "id": "e190767536954f418c789fc19347b240"
        },
        "c6": {
            "server": "mvdirect",
            "id": "0de95dc78ab64551af129ea1a6c7bca2"
        },
        "tweets_text_only": {
            "server": "mvdirect",
            "id": "collection_30d7536d97b54f37b2800ab8869fcc38"
        },
        "tweets": {
            "server": "mvdirect",
            "id": "collection_a478cfee2ce749c78c9d020ce0cce377"
        }
    }

    ;
    /*=========================================
    =            Utility Functions            =
    =========================================*/

    // modified from http://stackoverflow.com/a/1408373
    //     interpolate_str("I can do {thing}",{thing:"anything"}) === "I can do anything";
    //     interpolate_str("Count to {0}",[53])                   === "Count to 53";
    function interpolate_str(s, o) {
        return s.replace(/{([^{}]*)}/g,
            function(a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    }

    // rolled my own
    function get_total_height($e, exception) {
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
            if (rules[i] == exception) continue;
            sum += parseFloat($e.css(rules[i]));
        }
        return sum;
    }

    // rolled my own trunc
    function trunc(x, d) {
        d = Math.pow(10, d);
        return (x * d | 0) / d;
    }

    // from http://stackoverflow.com/a/11410079
    function clamp(num, min, max) {
        return num < min ? min : num > max ? max : num;
    }


    /*===============================
    =            Effects            =
    ===============================*/

    function ken_burns_effect($element) {
        // inject fulltilt
        var fulltilt_js = document.createElement('script');
        fulltilt_js.src = "https://static.polarcdn.com/vendor/fulltilt.min.js";
        document.getElementsByTagName('head')[0].appendChild(fulltilt_js);

        (function dependencywrapper() {
            if (typeof FULLTILT === "undefined") {
                requestAnimationFrame(dependencywrapper);
                return;
            }

            // Get quick shortcut to img-wrapper element
            var $i = $element.find(".plr-img-wrapper");

            var SCALE = 1.25;

            $i.css({
                position: "relative",
                left: "initial",
                bottom: "initial",
                right: 0,
                top: 0,
                transform: "scale(" + SCALE + ")"
            });

            var deviceOrientation;
            new FULLTILT.getDeviceOrientation({
                    'type': 'world'
                }).then(function(controller) {
                    deviceOrientation = controller;
                })
                .catch(function(message) {
                    console.error(message);
                });

            var manual = false;
            var mouse_pos = {
                x: 0,
                y: 0
            };

            var max_offset;

            function calc_max_offset() {
                max_offset = {
                    x: $i.find("div").width() * (SCALE - 1),
                    y: $i.find("div").height() * (SCALE - 1),
                };
            }
            calc_max_offset();
            window.addEventListener("resize", calc_max_offset);

            /* the magical main loop */
            (function parallax() {
                // if all else fails, new pos will be 0 offset
                var percent_offset = {
                    x: 0,
                    y: 0
                };

                // If no accelerometer or manual override
                if (manual || !deviceOrientation) {
                    var px_from_center = {
                        x: mouse_pos.x - $element.offset().left - $element.width() / 2,
                        y: mouse_pos.y - $element.offset().top - $element.height() / 2
                    };

                    percent_offset = {
                        x: clamp(trunc(px_from_center.x / $element.width(), 5), -0.5, 0.5),
                        y: clamp(trunc(px_from_center.y / $element.height(), 5), -0.5, 0.5)
                    };
                }

                if (deviceOrientation && !manual) {
                    var rotation = deviceOrientation.getScreenAdjustedEuler();

                    // Switch to manual control if missing accelerometer
                    if (!rotation.alpha || !rotation.beta || !rotation.gamma) {
                        manual = true;

                        // initialize mouse event handler
                        window.addEventListener("mousemove", function(e) {
                            mouse_pos.x = e.pageX;
                            mouse_pos.y = e.pageY;
                        });
                    }

                    // Calculate new offset such that it gradually moves into place

                    percent_offset = {
                        x: clamp(trunc(-(rotation.gamma) / 180, 5), -0.5, 0.5),
                        y: clamp(trunc(-(rotation.beta - 90) / 180 * 2, 5), -0.5, 0.5) // why * 2? It just *feels* better
                    };
                }

                // get previous position
                var old_offset = {
                    right: parseFloat($i.css("right")),
                    top: parseFloat($i.css("top"))
                };

                var new_offset = {
                    right: trunc(max_offset.x * percent_offset.x, 2),
                    top: trunc(max_offset.y * percent_offset.y, 2)
                };

                $i.css({
                    top: trunc(old_offset.top + (new_offset.top - old_offset.top) / 10, 2) + "px",
                    right: trunc(old_offset.right - (new_offset.right + old_offset.right) / 10, 2) + "px"
                });

                // Execute function on each browser animation frame
                requestAnimationFrame(parallax);
            })();
        })();
    }

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
            $element.css({
                "height": "initial"
            });

            default_h =
                get_total_height($element.find("h1")) +
                get_total_height($element.find(".plr-sponsor")) +
                parseFloat($element.find(".topic").css("height"));
            initial_h = get_total_height($element);

            start_y = 2 * window.innerHeight / 4;
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
                $element.css({
                    "height": new_h + "px"
                });
            } else {
                $element.css({
                    "height": default_h + "px"
                });
            }

            requestAnimationFrame(expand);
        }
        expand();
    }

    function scrolling_parallax($element) {
        // Get quick shortcut to img-wrapper element
        var $i = $element.find(".plr-img-wrapper");

        var SCALE = 1.5;

        $i.css({
            position: "relative",
            left: "initial",
            bottom: "initial",
            right: 0,
            top: 0,
            transform: "scale(" + SCALE + ")"
        });

        var max_offset;

        function calc_max_offset() {
            max_offset = {
                x: $i.find("div").width() * (SCALE - 1),
                y: $i.find("div").height() * (SCALE - 1),
            };
        }
        calc_max_offset();
        window.addEventListener("resize", calc_max_offset);

        /* the magical main loop */
        (function parallax() {
            // if all else fails, new pos will be 0 offset
            var percent_offset = {
                x: 0, //Math.sin(window.scrollY/window.innerHeight*2)/2,
                y: clamp(-((window.scrollY - $element.offset().top) / window.innerHeight + 0.5), -0.5, 0.5)
            };

            // get previous position
            var old_offset = {
                right: parseFloat($i.css("right")),
                top: parseFloat($i.css("top"))
            };

            var new_offset = {
                right: trunc(max_offset.x * percent_offset.x, 2),
                top: trunc(max_offset.y * percent_offset.y, 2)
            };

            $i.css({
                top: trunc(old_offset.top + (new_offset.top - old_offset.top) / 10, 2) + "px",
                right: trunc(old_offset.right - (new_offset.right + old_offset.right) / 10, 2) + "px"
            });

            // Execute function on each browser animation frame
            requestAnimationFrame(parallax);
        })();
    }

    function tap_to_expand($element, time) {
        $element.css({
            "overflow": "hidden"
        });

        var sponsor_text_initial = $element.find(".plr-sponsor").first().html();
        $element.find(".plr-sponsor").html("<em>Tap</em> to learn more! <br> " + sponsor_text_initial);

        $element.find("h1").unwrap().css({
            cursor: "pointer"
        });

        var initial_h,
            default_h,
            been_clicked = false;

        function onresize() {
            var img_height = get_total_height(($element.find(".plr-img-wrapper").length === 0) ? $element.find("img") : $element.find(".plr-img-wrapper div"));
            var p_height = get_total_height($element.find("p").first()) + get_total_height($element.find("p").last());

            var total_body_height;
            if (window.innerWidth < 425 || $element.find("img").length !== 0) {

                if ($element.find(".plr-img-wrapper").length) total_body_height = p_height;
                else total_body_height = p_height + img_height;
            } else {
                total_body_height = (img_height > p_height) ? img_height : p_height;
            }

            default_h =
                parseFloat($element.find(".topic").css("height")) +
                get_total_height($element.find("h1")) +
                get_total_height($element.find(".plr-sponsor"));

            initial_h =
                default_h +
                total_body_height +
                parseFloat($element.css("padding-bottom")) +
                parseFloat($element.css("padding-top"));

            if (!been_clicked) $element.css({
                "height": default_h + "px"
            });
            else $element.css({
                "height": initial_h + "px"
            });
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
                $element.css({
                    "height": initial_h + "px"
                });
                been_clicked = true;
            } else {
                $element.css({
                    "height": default_h + "px"
                });
                been_clicked = false;
            }
        });
    }


    /*==========================================
    =            Template "Classes"            =
    ==========================================*/

    function Blog(props) {
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: props.ad,
            location: props.location,
            infoText: "",
            infoButtonText: "",
            template: templates.blog,
            onRender: function($element) {
                if (props.onRender) props.onRender($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }

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
            $carousel = $(props.location).before(interpolate_str(["",
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
            incfaliure = function() {
                faliures++;
            };

        for (var j in props.ads) {
            q().push(["insertPreview", {
                label: interpolate_str("Carousel {0} - Slot {1}", [total_carousels, j]),
                unit: props.ads[j],
                location: interpolate_str(".plr-crsl--{0} .plr-slot--{1}", [total_carousels, j]),
                infoText: "",
                infoButtonText: "",
                template: templates.carousel_item,
                onRender: ((props.onRender && props.onRender[j]) ? props.onRender[j] : null),
                onFill: function(data) {},
                onError: incfaliure
            }]);
        }

        // Make sure that if all the ads failed, don't even show the carousel
        if (faliures == props.ads.length) $carousel.remove();
        else total_carousels++;
    }

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
                ".plr-collection-container .plr-header {",
                "    border-bottom: 3px solid #1879A9;",
                "    padding-bottom: 10px;",
                "}",
                ".plr-collection-container .plr-header h2 {",
                "    margin: 0;",
                "    text-transform: initial;",
                "    display: inline-block;",
                "    font-size: 26px;",
                "}",
                ".plr-collection-container .plr-header .plr-img-wrapper {",
                "    padding-bottom: 26px;",
                "    width: 100px;",
                "    position:relative;",
                "    top: 3px;",
                "    display: inline-block;",
                "    overflow: hidden;",
                "}",
                ".plr-collection-container .plr-header .plr-img-wrapper div {",
                "    position: absolute;",
                "    top: 0px;",
                "    bottom: 0px;",
                "    left: 0px;",
                "    right: 0px;",
                "    background-size: contain !important;",
                "}",
            ].join("\n"), "head"]);
        }

        /*----------  Inject Container HTML  ----------*/

        var $collection;
        q().push(function() {
            $collection = $(props.location).before(["",
                "<div class=\"plr-collection-container plr-collection--" + total_collections + "\">",
                "    <div class=\"plr-header\">",
                "        <h2>" + props.title + "</h2>",
                "        <div class=\"plr-disclosure\" style=\"\">",
                "            <span style=\"position: relative;top: -4px;\">Sponsored By </span>",
                "            <div class=\"plr-img-wrapper\">",
                "                <div style=\"background: white\"></div>",
                "            </div>",
                "        </div>",
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

        /*----------  Add some onRender code to the first fill  ----------*/
        function onRenderFirst($element) {
            $element.parent().find(".plr-disclosure .plr-img-wrapper div").css({
                "background": "url('" + $element.find(".sponsor-logo-href").text() + "') no-repeat center center"
            });
        }

        if (typeof props.onRender === "undefined") props.onRender = [onRenderFirst];
        else {
            var user_onRenderFirst = props.onRender[0];
            props.onRender[0] = function($element) {
                onRenderFirst($element);
                user_onRenderFirst($element);
            };
        }

        /*----------  Insert the Collection Items  ----------*/

        var faliures = 0,
            incfaliure = function() {
                faliures++;
            };

        for (var i = 0; i < props.ads.length; i++) {
            var location = ".plr-collection--" + total_collections + " .plr-collection-anchor";
            if (i === 0) location += "--top";

            q().push(["insertPreview", {
                label: "Landing Page",
                unit: props.ads[i],
                location: location,
                infoText: "",
                infoButtonText: "",
                template: templates.collection_item,
                onRender: ((props.onRender && props.onRender[i]) ? props.onRender[i] : null),
                onFill: function(data) {},
                onError: faliures
            }]);
        }

        // Make sure that if all the ads failed, don't even show the carousel
        if (faliures == props.ads.length) {
            $collection.remove();
            console.log("Collection Failed");
        } else total_collections++;
    }

    function Hero(props) {
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: props.ad,
            location: props.location,
            infoText: "",
            infoButtonText: "",
            template: templates.hero,
            onRender: function($element) {
                if (props.onRender) props.onRender($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }

    function HorizontalStack(props) {
        /*
            props = {
                location: jQuery Selector | where to put the ad
                ad: Creative ID           | which creative
                onRender: function        | onRender function
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
            template: templates.hstack,
            onRender: function($element) {
                /* THUMB OPTIONS */
                var img = $element.find(".plr-img-wrapper").first();

                // circle by default
                switch (props.display.thumb) {
                    case "rectangle":
                        img.find("div").first().css({
                            "border-radius": "0"
                        });
                        img.css({
                            "width": "50%",
                            "padding-bottom": "50%"
                        });
                        break;
                    case "square":
                        img.find("div").first().css({
                            "border-radius": "0"
                        });
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

                if (typeof props.onRender !== "undefined") props.onRender();
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }

    function Infographic(props) {
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: props.ad,
            location: props.location,
            infoText: "",
            infoButtonText: "",
            template: templates.infographic,
            onRender: function($element) {
                if (props.onRender) props.onRender($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }

    function ThreeSixty_Pano(props) {
        /*
            
        props = {
            location:  jquery selector
            unit:      unit object
        }
            
        */

        q().push(["insertPreview", {
            label: "360 Pano",
            unit: props.unit,
            location: props.location,
            infoText: "",
            infoButtonText: "",
            template: templates.threesixty,
            onRender: function($element) {
                $element.css({
                    height: "300px",
                    overflow: "auto"
                });

                /*----------  Inject Dependencies  ----------*/

                // fulltilt
                var fulltilt_js = document.createElement('script');
                fulltilt_js.src = "https://static.polarcdn.com/vendor/fulltilt.min.js";
                document.getElementsByTagName('head')[0].appendChild(fulltilt_js);

                // pannellum
                var pnlm_js = document.createElement('script');
                pnlm_js.src = "https://cdn.pannellum.org/2.2/pannellum.js";
                document.getElementsByTagName('head')[0].appendChild(pnlm_js);

                var pnlm_css = document.createElement('link');
                pnlm_css.href = "https://cdn.pannellum.org/2.2/pannellum.css";
                pnlm_css.rel = "stylesheet";
                document.getElementsByTagName('head')[0].appendChild(pnlm_css);

                /*----------  Magic Loop  ----------*/
                function threesixty() {
                    // short circuit until the dependencies load
                    if (typeof pannellum === "undefined" || typeof FULLTILT === "undefined") {
                        requestAnimationFrame(threesixty);
                        return;
                    }

                    // Instantiate panellum 
                    var img_url = $element.find(".pnlm-img-url").text();
                    var img_preview_url = $element.find(".preview-img-url").text();

                    var pnlm = pannellum.viewer($element.find(".plr-pnlm-wrapper")[0], {
                        "type": "equirectangular",
                        "panorama": img_url,
                        "preview": img_preview_url,
                        "author": "if you see me, something went wrong",
                        "autoLoad": false
                    });

                    var title_text = $element.find(".title").text();
                    $element.find(".pnlm-load-button p").first()
                        .text(title_text)
                        .css({
                            "padding": "10px"
                        });

                    var sponsor_name = $element.find(".sponsor-name").text();
                    $element.find(".pnlm-author-box").text("Presented by " + sponsor_name);

                    if (typeof props.onRender === "function") props.onRender($element);

                    /* DeviceMotion Magic */
                    var manual = false;

                    var deviceOrientation;

                    new FULLTILT.getDeviceOrientation({
                            'type': 'world'
                        }).then(function(controller) {
                            deviceOrientation = controller;
                        })
                        .catch(function(message) {
                            console.error(message);
                        });

                    (function getDeviceOrientationData() {
                        if (deviceOrientation) {
                            var e = deviceOrientation.getScreenAdjustedEuler();

                            // Switch to manual control if missing accelerometer
                            if (!e.alpha || !e.beta || !e.gamma) manual = true;

                            var view = {
                                x: -e.alpha - e.gamma,
                                y: e.beta - 90
                            };

                            if (pnlm.getRenderer() !== undefined && pnlm.getRenderer().isLoading() === false) {
                                pnlm.setYaw(view.x);
                                pnlm.setPitch(view.y);
                                pnlm.setUpdate();
                            }
                        }

                        // Execute function on each browser animation frame
                        if (!manual) requestAnimationFrame(getDeviceOrientationData);
                    })();
                }
                threesixty();

            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }

    /*--------  threesixty_huffpo  --------*/

    function ThreeSixty_Pano_huffpo(props) {
        /*
            
        props = {
            location:  jquery selector
            ad:      unit object

            onRender: function
        }
            
        */

        q().push(["insertPreview", {
            label: "360 Pano",
            unit: props.ad,
            location: props.location,
            infoText: "",
            infoButtonText: "",
            template: templates.threesixty_huffpo,
            onRender: function($element) {
                $element.css({
                    overflow: "auto"
                });

                /*----------  Inject Dependencies  ----------*/

                // fulltilt
                var fulltilt_js = document.createElement('script');
                fulltilt_js.src = "https://static.polarcdn.com/vendor/fulltilt.min.js";
                document.getElementsByTagName('head')[0].appendChild(fulltilt_js);

                // pannellum
                var pnlm_js = document.createElement('script');
                pnlm_js.src = "https://cdn.pannellum.org/2.2/pannellum.js";
                document.getElementsByTagName('head')[0].appendChild(pnlm_js);

                var pnlm_css = document.createElement('link');
                pnlm_css.href = "https://cdn.pannellum.org/2.2/pannellum.css";
                pnlm_css.rel = "stylesheet";
                document.getElementsByTagName('head')[0].appendChild(pnlm_css);

                /*----------  Magic Loop  ----------*/
                function threesixty() {
                    // short circuit until the dependencies load
                    if (typeof pannellum === "undefined" || typeof FULLTILT === "undefined") {
                        requestAnimationFrame(threesixty);
                        return;
                    }

                    // Instantiate panellum 
                    var img_url = $element.find(".pnlm-img-url").text();
                    var img_preview_url = $element.find(".preview-img-url").text();

                    var pnlm = pannellum.viewer($element.find(".plr-pnlm-wrapper")[0], {
                        "type": "equirectangular",
                        "panorama": img_url,
                        "preview": img_preview_url,
                        "autoLoad": false
                    });

                    var title_text = $element.find(".title").text();
                    $element.find(".pnlm-load-button p").first().text(title_text);

                    $element.find(".pnlm-load-button").click(function() {
                        $element.find(".plr-pnlm-wrapper").css({
                            width: "300px",
                            height: "244px",
                            overflow: "visible",
                        });
                        $element.find(".plr-learn-more").css({
                            display: "block"
                        });
                    });

                    // execute custom onRender stuff
                    if (typeof props.onRender === "function") props.onRender($element);

                    /* DeviceMotion Magic */
                    var manual = false;

                    var deviceOrientation;

                    new FULLTILT.getDeviceOrientation({
                            'type': 'world'
                        }).then(function(controller) {
                            deviceOrientation = controller;
                        })
                        .catch(function(message) {
                            console.error(message);
                        });

                    (function getDeviceOrientationData() {
                        if (deviceOrientation) {
                            var e = deviceOrientation.getScreenAdjustedEuler();

                            // Switch to manual control if missing accelerometer
                            if (!e.alpha || !e.beta || !e.gamma) manual = true;

                            var view = {
                                x: -e.alpha - e.gamma,
                                y: e.beta - 90
                            };

                            if (pnlm.getRenderer() !== undefined && pnlm.getRenderer().isLoading() === false) {
                                pnlm.setYaw(view.x);
                                pnlm.setPitch(view.y);
                                pnlm.setUpdate();
                            }
                        }

                        // Execute function on each browser animation frame
                        if (!manual) requestAnimationFrame(getDeviceOrientationData);
                    })();
                }
                threesixty();
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }


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
        ].join("\n"), [props.num_tweets * (card_width + 5)]), "head"]);

        // why +5? ¯\_(ツ)_/¯

        /*----------  Insert the Carousel Items  ----------*/

        var previews_array = [];
        for (var i = 1; i <= props.num_tweets; i++) {
            previews_array.push({
                name: "plr-tweet--" + i
            });
        }

        q().push(["insertPreviewCollection", {
            label: "Home",
            unit: props.campaign_collection_unit,
            location: props.location,
            previews: previews_array,
            infoText: "",
            infoButtonText: "",
            template: templates.twitter_carousel,
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

    function VerticalStack(props) {
        /*
            props = {
                location: jQuery Selector | where to put the ad
                ad: Creative ID           | which creative
                onRender: function        | onRender function
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
            template: templates.vstack,
            onRender: function($element) {
                /* THUMB OPTIONS */
                var img = $element.find(".plr-img-wrapper").first();

                // circle by default
                switch (props.display.thumb) {
                    case "rectangle":
                        img.find("div").first().css({
                            "border-radius": "0"
                        });
                        img.css({
                            "width": "100%",
                            "padding-bottom": "50%"
                        });
                        break;
                    case "square":
                        img.find("div").first().css({
                            "border-radius": "0"
                        });
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

                if (typeof props.onRender !== "undefined") props.onRender();
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }


    /*=======================================
    =            Insert Previews            =
    =======================================*/

    /*-------  load all  -------*/

    if (location.hash === "") {
        console.log("Load - All");


        /*----------  Vertical Stack  ----------*/

        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: ads.standard_ad,
                display: {
                    thumb: "circle",
                    /* OR "square" OR "none" OR "rectangle" */
                    summary: true
                }
            });
        });
        /*----------  Horizontal Stack  ----------*/
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(7)",
                ad: ads.standard_ad,
                display: {
                    thumb: "rectangle",
                    /* OR "square" OR "none" OR "rectangle" */
                    summary: true
                }
            });
        });
        /*----------  Hero  ----------*/

        q().push(function() {
            new Hero({
                location: ".article:eq(0) p:eq(12)",
                ad: ads.standard_ad
            });
        });
        /*----------  Carousel 1  ----------*/

        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(13)",
                ads: [
                    ads.standard_ad,
                    ads.c2,
                    ads.c3,
                    ads.c4,
                    ads.c5,
                    ads.c6
                ]
            });
        });

        /*----------  In Between Article  ----------*/

        q().push(function() {
            new Blog({
                location: ".article:last",
                ad: ads.standard_ad
            });
        });

        /*----------  Parallax Hero  ----------*/

        q().push(function() {
            new Hero({
                location: ".article:last p:eq(3)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    ken_burns_effect($element);
                }
            });
        });

        /*----------  In-Article Pullout  ----------*/

        q().push(function() {
            new Blog({
                location: ".article:last p:eq(10)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    scroll_to_expand($element);
                }
            });
        });

        /*----------  Tap To Expand Article  ----------*/

        q().push(function() {
            new Blog({
                location: ".article:last p:eq(15)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    tap_to_expand($element, 1);
                }
            });
        });

        /*----------  Tap To Expand Infographic  ----------*/

        q().push(function() {
            new Infographic({
                location: ".article:last p:eq(18)",
                ad: ads.inofgraphic_ad,
                onRender: function($element) {
                    tap_to_expand($element, 2);
                }
            });
        });

        /*----------  Collection 1 ----------*/

        q().push(function() {
            new Collection({
                location: ".bottom-anchor",
                title: "Indy racing like you’ve never seen it before!",
                ads: [
                    ads.standard_ad,
                    ads.standard_ad,
                    ads.standard_ad
                ],
                display: "hero" /* OR bigThumb OR noThumb */
            });
        });
    }
    /*-------  #blog  -------*/

    if (location.hash === "#blog") {
        console.log("Load - Blog");

        //without image
        q().push(function() {
            new Blog({
                location: ".article:eq(0) p:eq(2)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    $element.find(".plr-img-wrapper").remove();
                }
            });
        });

        //with image
        q().push(function() {
            new Blog({
                location: ".article:last",
                ad: ads.standard_ad
            });
        });
    }
    /*-------  #carousel  -------*/

    if (location.hash === "#carousel") {
        console.log("Load - Carousel");
        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(8)",
                ads: [
                    ads.standard_ad,
                    ads.standard_ad,
                    ads.standard_ad,
                    ads.standard_ad,
                    ads.standard_ad,
                    ads.standard_ad
                ]
            });
        });
    }
    /*-------  #collection  -------*/

    if (location.hash === "#collection") {
        console.log("Load - Collection");

        q().push(function() {
            new Collection({
                location: ".bottom-anchor",
                title: "Indy racing like you’ve never seen it before!",
                ads: [
                    ads.standard_ad,
                    ads.standard_ad,
                    ads.standard_ad
                ],
                display: "bigThumb" /* OR bigThumb OR noThumb */
            });
        });
        q().push(function() {
            new Collection({
                location: ".article:last",
                title: "Indy racing like you’ve never seen it before!",
                ads: [
                    ads.standard_ad,
                    ads.standard_ad,
                    ads.standard_ad
                ],
                display: "hero" /* OR bigThumb OR noThumb */
            });
        });
    }
    /*-------  #expandable  -------*/

    if (location.hash === "#expandable") {
        console.log("Load - Expandable");

        //scroll-to-expand
        q().push(function() {
            new Blog({
                location: ".article p:eq(2)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    scroll_to_expand($element);
                }
            });
        });

        //tap-to-expand
        q().push(function() {
            new Blog({
                location: ".article p:eq(5)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    tap_to_expand($element, 1);
                }
            });
        });

        //infographic
        q().push(function() {
            new Infographic({
                location: ".article p:eq(8)",
                ad: ads.inofgraphic_ad,
                onRender: function($element) {
                    tap_to_expand($element, 2);
                }
            });
        });
    }
    /*-------  #hero  -------*/

    if (location.hash === "#hero") {
        console.log("Load - Hero");

        q().push(function() {
            new Hero({
                location: ".article:eq(0) p:eq(2)",
                ad: ads.standard_ad
            });
        });
    }
    /*-------  #hstack  -------*/

    if (location.hash === "#hstack") {
        console.log("Load - Horizontal Stack");
        //square
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(3)",
                ad: ads.standard_ad,
                display: {
                    thumb: "square",
                    summary: true
                }
            });
        });
        //circle
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(8)",
                ad: ads.standard_ad,
                display: {
                    thumb: "circle",
                    summary: true
                }
            });
        });

        //none
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(16)",
                ad: ads.standard_ad,
                display: {
                    thumb: "none",
                    summary: true
                }
            });
        });
    }
    /*-------  #interactive  -------*/

    if (location.hash === "#interactive") {
        console.log("Load - Interactive");

        q().push(function() {
            new Hero({
                location: ".article p:eq(3)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    ken_burns_effect($element);
                },
            });
        });
    }
    /*-------  #lab  -------*/

    if (location.hash === "#lab") {
        console.log("Load - Dexter's Lab");

        /*----------  Tweets Standard  ----------*/

        q().push(function() {
            new TwitterCarousel({
                location: ".article:eq(0) p:eq(3)",
                campaign_collection_unit: ads.tweets,
                num_tweets: 12,
                show_sponsor: true
            });
        });

        /*----------  Tweets Text Only  ----------*/

        q().push(function() {
            new TwitterCarousel({
                location: ".article:eq(0) p:eq(6)",
                campaign_collection_unit: ads.tweets_text_only,
                num_tweets: 12,
                show_sponsor: true
            });
        });

        /*----------  360 Panorama  ----------*/
        q().push(function() {
            new ThreeSixty_Pano({
                location: ".article:first p:eq(10)",
                unit: ads.panorama_ad
            });
        });
    }

    // RYOT

    if (location.hash === "#ryot") {
        q().push(function() {
            new ThreeSixty_Pano_huffpo({
                "location": ".article:first p:eq(10)",
                "ad": {
                    "server": "mvdirect",
                    "id": "2913cfc8aabb4d20a1d052c07badb450"
                }
            });
        });
    }

    /*-------  #pratik  -------*/

    if (location.hash === "#pratik") {
        console.log("Load - helloPratik");

        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: ads.standard_ad,
                display: {
                    thumb: "rectangle",
                    summary: true
                }
            });
        });

        q().push(function() {
            new Hero({
                location: ".article:eq(0) p:eq(8)",
                ad: ads.standard_ad
            });

            new Hero({
                location: ".article:eq(0) p:eq(13)",
                ad: ads.standard_ad,
                onRender: function($element) {
                    ken_burns_effect($element);
                }
            });
        });
    }
    /*-------  #vstack  -------*/

    if (location.hash === "#vstack") {
        console.log("Load - Vertical Stack");
        //rectangle
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: ads.standard_ad,
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
                ad: ads.standard_ad,
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
                ad: ads.standard_ad,
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
                ad: ads.standard_ad,
                display: {
                    thumb: "none",
                    summary: true
                }
            });
        });
    }

    /*=================================
    =            InjectCSS            =
    =================================*/

    /*--------  from threesixty.scss  --------*/

    q().push(["injectCSS", ["",
        ".plr-360-huffpo {",
        "  position: relative;",
        "  width: 300px;",
        "  height: 250px;",
        "  margin: auto;",
        "  border-top: 3px solid #2e7061;",
        "  border-bottom: 3px solid #2e7061; }",
        "  @media (max-width: 450px) {",
        "    .plr-360-huffpo {",
        "      margin-left: -10px; } }",
        "  .plr-360-huffpo .plr-pnlm-wrapper {",
        "    overflow: visible;",
        "    width: 300px;",
        "    height: 200px; }",
        "  .plr-360-huffpo .pnlm-load-button {",
        "    top: initial;",
        "    bottom: -47px;",
        "    left: initial;",
        "    width: 300px;",
        "    height: 50px;",
        "    margin: initial;",
        "    text-align: center;",
        "    color: black;",
        "    border-radius: 0;",
        "    background-color: white; }",
        "    .plr-360-huffpo .pnlm-load-button:hover {",
        "      background-color: white; }",
        "    .plr-360-huffpo .pnlm-load-button p {",
        "      font-family: arial;",
        "      font-size: 26px;",
        "      font-weight: 600;",
        "      padding: 0;",
        "      color: #2e7061; }",
        "  .plr-360-huffpo .plr-learn-more {",
        "    line-height: 30px;",
        "    position: absolute;",
        "    right: 5px;",
        "    bottom: 5px;",
        "    display: none;",
        "    height: 30px;",
        "    margin: 0;",
        "    padding: 0 10px;",
        "    background-color: rgba(1, 117, 102, 0.7); }",
        "    .plr-360-huffpo .plr-learn-more a {",
        "      text-decoration: none;",
        "      color: white; }",
        "",
        ""
    ].join("\n"), "head"]);

    /*=================================
    =            Templates            =
    =================================*/

    /* jshint ignore:start */
    function populate_templates() {
        templates = {
            threesixty_huffpo: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, functionType = "function",
                    escapeExpression = this.escapeExpression;


                buffer += "<div class=\"plr-360-huffpo\">\n    <div class=\"plr-pnlm-wrapper\"></div>\n    <div class=\"plr-ad-info\" style=\"display:none;\">\n        <div class=\"sponsor-name\">" +
                    escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                    "</div>\n        <div class=\"sponsor-logo\">" +
                    escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.logo)), stack1 == null || stack1 === false ? stack1 : stack1.href)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                    "</div>\n        <div class=\"link\">";
                if (stack2 = helpers.link) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</div>\n        <div class=\"title\">";
                if (stack2 = helpers.title) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.title;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</div>\n        <div class=\"summary\">";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</div>\n        <div class=\"pnlm-img-url\">" +
                    escapeExpression(((stack1 = ((stack1 = depth0.custom), stack1 == null || stack1 === false ? stack1 : stack1.panorama_img_url)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                    "</div>\n        <div class=\"preview-img-url\">";
                if (stack2 = helpers.getThumbHref) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.getThumbHref;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</div>\n    </div>\n    <p class=\"plr-learn-more\">\n        <a href=\"";
                if (stack2 = helpers.link) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "\">Learn More</a>\n    </p>\n</div>";
                return buffer;
            },
            blog: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, functionType = "function",
                    escapeExpression = this.escapeExpression;


                buffer += "<div class=\"plr-btwn-art\">\n    <div class=\"topic\">sponsored</div>\n    <a href=\"";
                if (stack1 = helpers.link) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.link;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "\"><h1>";
                if (stack1 = helpers.title) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.title;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "</h1></a>\n    <div class=\"plr-sponsor\">Presented by <b>" +
                    escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                    "</b></div>\n    <div class=\"plr-img-wrapper\">\n        <div style=\"background: url('";
                if (stack2 = helpers.getThumbHref) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.getThumbHref;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "') no-repeat center center;\"></div>\n    </div>\n    <p>";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</p>\n    <a href=\"";
                if (stack2 = helpers.link) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "\" style=\"text-decoration: underline;\">\n        <p>Continue Reading...</p>\n    </a>\n</div>";
                return buffer;
            },
            carousel_item: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, options, functionType = "function",
                    escapeExpression = this.escapeExpression,
                    helperMissing = helpers.helperMissing;


                buffer += "<div class=\"plr-crsl-item\">\n    <a href=\"";
                if (stack1 = helpers.link) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.link;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "\" style=\"border-bottom: none;box-shadow: none;\">\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
                options = {
                    hash: {
                        'width': (1500),
                        'height': (1000)
                    },
                    data: data
                };
                buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) +
                    "') no-repeat center center;\"></div>\n        </div>\n        <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n        <h2>";
                if (stack2 = helpers.title) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.title;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</h2>\n        <p style=\"color: #666666;margin-bottom: 0;\">";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</p>\n    </a>\n</div>";
                return buffer;
            },
            collection_item: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, functionType = "function",
                    escapeExpression = this.escapeExpression;


                buffer += "<div class=\"plr-collection\">\n    <a href=\"";
                if (stack1 = helpers.link) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.link;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "\">\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
                if (stack1 = helpers.getThumbHref) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.getThumbHref;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "') no-repeat center center;\"></div>\n        </div>\n        <h2>";
                if (stack1 = helpers.title) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.title;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "</h2>\n    </a>\n    <p>";
                if (stack1 = helpers.summary) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.summary;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "</p>\n  <div class=\"sponsor-logo-href\" style=\"display:none;\">" +
                    escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.logo)), stack1 == null || stack1 === false ? stack1 : stack1.href)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                    "</div>\n</div>";
                return buffer;
            },
            hero: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, options, functionType = "function",
                    escapeExpression = this.escapeExpression,
                    helperMissing = helpers.helperMissing;


                buffer += "<div class=\"plr-fullw\">\n  <a href=\"";
                if (stack1 = helpers.link) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.link;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "\" rel=\"nofollow\">\n    <div class=\"plr-img-wrapper\">\n      <div style=\"background: url('";
                options = {
                    hash: {
                        'width': (1500),
                        'height': (1000)
                    },
                    data: data
                };
                buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) +
                    "') no-repeat center center;\"></div>\n    </div>\n    <div class=\"plr-contents\" style=\"\">\n      <h1>";
                if (stack2 = helpers.title) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.title;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</h1>\n      <p>";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</p>\n    </div>\n    <div class=\"plr-sponsored\">Sponsor Content</div>\n  </a>\n</div>";
                return buffer;
            },
            hstack: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, options, functionType = "function",
                    escapeExpression = this.escapeExpression,
                    helperMissing = helpers.helperMissing;


                buffer += "<div class=\"plr-hstack\">\n    <a href=\"";
                if (stack1 = helpers.link) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.link;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "\" style=\"border-bottom: none;box-shadow: none;\">\n        <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n        <h2>";
                if (stack1 = helpers.title) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.title;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "</h2>\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
                options = {
                    hash: {
                        'width': (1500),
                        'height': (1000)
                    },
                    data: data
                };
                buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) +
                    "') no-repeat center center;\"></div>\n        </div>\n\n        <p style=\"color: #666666;margin-bottom: 0;\">";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</p>\n    </a>\n</div>";
                return buffer;
            },
            infographic: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, options, functionType = "function",
                    escapeExpression = this.escapeExpression,
                    helperMissing = helpers.helperMissing;


                buffer += "<div class=\"plr-btwn-art\">\n    <div class=\"topic\">sponsored</div>\n    <a href=\"";
                if (stack1 = helpers.link) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.link;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "\"><h1>";
                if (stack1 = helpers.title) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.title;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "</h1></a>\n    <div class=\"plr-sponsor\">Presented by <b>" +
                    escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                    "</b></div>\n    <img src=\"";
                options = {
                    hash: {
                        'width': (425)
                    },
                    data: data
                };
                buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) +
                    "\" style=\"width:100%\">\n    <p>";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</p>\n    <a href=\"";
                if (stack2 = helpers.link) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "\" style=\"text-decoration: underline;\">\n        <p>Learn More...</p>\n    </a>\n</div>";
                return buffer;
            },
            /*

   This function represents a pre-compiled Handlebars template. Pre-compiled
   templates are not pretty, but they provide a very significant performance
   boost, especially on mobile devices. For more information, see
   http://handlebarsjs.com/precompilation.html.

   Note that this code has been generated from the following markup:

<div class="plr-360">
    <div class="plr-pnlm-wrapper"></div>
    <div class="plr-ad-info" style="display:none;">
        <div class="sponsor-name">{{sponsor.name}}</div>
        <div class="sponsor-logo">{{sponsor.logo.href}}</div>
        <div class="link">{{link}}</div>
        <div class="title">{{title}}</div>
        <div class="summary">{{summary}}</div>
        <div class="pnlm-img-url">{{custom.panorama_img_url}}</div>
        <div class="preview-img-url">{{getThumbHref}}</div>
    </div>
    <p class='plr-learn-more' style='
        display: none;
        margin: 0;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
    '>
        <a href={{link}}>Learn More</a>
    </p>
</div>

*/

            threesixty: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, functionType = "function",
                    escapeExpression = this.escapeExpression;
                buffer += "<div class=\"plr-360\">\n    <div class=\"plr-pnlm-wrapper\"></div>\n    <div class=\"plr-ad-info\" style=\"display:none;\">\n        <div class=\"sponsor-name\">" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n        <div class=\"sponsor-logo\">" + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.logo)), stack1 == null || stack1 === false ? stack1 : stack1.href)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n        <div class=\"link\">";
                if (stack2 = helpers.link) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) + "</div>\n        <div class=\"title\">";
                if (stack2 = helpers.title) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.title;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) + "</div>\n        <div class=\"summary\">";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) + "</div>\n        <div class=\"pnlm-img-url\">" + escapeExpression(((stack1 = ((stack1 = depth0.custom), stack1 == null || stack1 === false ? stack1 : stack1.panorama_img_url)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n        <div class=\"preview-img-url\">";
                if (stack2 = helpers.getThumbHref) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.getThumbHref;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) + "</div>\n    </div>\n    <p class='plr-learn-more'>\n        <a style='text-decoration:none;' href=\"";
                if (stack2 = helpers.link) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) + "\">Learn More</a>\n    </p>\n</div>";
                return buffer;
            },
            twitter_carousel: function(Handlebars, depth0, helpers, partials, data) {
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
                    buffer += "\n            <div class=\"plr-twtr-crsl-slot plr-tweet--" +
                        escapeExpression(((stack1 = ((stack1 = data), stack1 == null || stack1 === false ? stack1 : stack1.index)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                        "\">\n                <blockquote class=\"twitter-tweet\" data-lang=\"en\">\n                    <a href=\"";
                    if (stack2 = helpers.link) {
                        stack2 = stack2.call(depth0, {
                            hash: {},
                            data: data
                        });
                    } else {
                        stack2 = depth0.link;
                        stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                    }
                    buffer += escapeExpression(stack2) +
                        "\"></a>\n                </blockquote>\n                <script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n            </div>\n            <div class=\"plr-sponsor-name\" style=\"display:none\">" +
                        escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
                        "</div>\n            ";
                    return buffer;
                }

                buffer += "<div class=\"plr-twtr-crsl\">\n    <h1>#StuporTuesday</h1>\n    <div class=\"plr-twtr-crsl-outer\">\n        <div class=\"plr-twtr-crsl-inner\">\n            ";
                stack1 = helpers.each.call(depth0, depth0.creatives, {
                    hash: {},
                    inverse: self.noop,
                    fn: self.program(1, program1, data),
                    data: data
                });
                if (stack1 || stack1 === 0) {
                    buffer += stack1;
                }
                buffer += "\n        </div>\n    </div>\n    <h2>Sponsored By Our Sponsors</h2>\n</div>";
                return buffer;
            },
            vstack: function(Handlebars, depth0, helpers, partials, data) {
                this.compilerInfo = [4, '>= 1.0.0'];
                helpers = this.merge(helpers, Handlebars.helpers);
                data = data || {};
                var buffer = "",
                    stack1, stack2, options, functionType = "function",
                    escapeExpression = this.escapeExpression,
                    helperMissing = helpers.helperMissing;


                buffer += "<div class=\"plr-halfw\">\n    <a href=\"";
                if (stack1 = helpers.link) {
                    stack1 = stack1.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack1 = depth0.link;
                    stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
                }
                buffer += escapeExpression(stack1) +
                    "\" style=\"border-bottom: none;box-shadow: none;\">\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
                options = {
                    hash: {
                        'width': (1500),
                        'height': (1000)
                    },
                    data: data
                };
                buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) +
                    "') no-repeat center center;\"></div>\n        </div>\n        <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n        <h2>";
                if (stack2 = helpers.title) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.title;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</h2>\n        <p style=\"color: #666666;margin-bottom: 0;\">";
                if (stack2 = helpers.summary) {
                    stack2 = stack2.call(depth0, {
                        hash: {},
                        data: data
                    });
                } else {
                    stack2 = depth0.summary;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) +
                    "</p>\n    </a>\n</div>";
                return buffer;
            },
        }
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
