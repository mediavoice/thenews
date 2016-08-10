/* Built on Wed Aug 10 2016 10:43:15 GMT-0400 (EDT). */
(function() {
  var templates;
  populate_templates();

  window.NATIVEADS = window.NATIVEADS || {};
  window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];

  var q = function() {
    return window.NATIVEADS_QUEUE;
  };
  q().push(["setPropertyID", "NA-DANITEST-11237996"]);



  /*=========================================
  =            Utility Functions            =
  =========================================*/

  /*--------  interpolate_str.js  --------*/

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


  /*--------  clamp.js  --------*/

  // from http://stackoverflow.com/a/11410079
  function clamp(num, min, max) {
    return num < min ? min : num > max ? max : num;
  }


  /*--------  trunc.js  --------*/

  // rolled my own trunc
  function trunc(x, d) {
    d = Math.pow(10, d);
    return (x * d | 0) / d;
  }


  /*--------  get_total_height.js  --------*/

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



  /*===============================
  =            Effects            =
  ===============================*/

  /*--------  ken_burns  --------*/

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


  /*--------  scroll_to_expand  --------*/

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


  /*--------  tap_to_expand  --------*/

  /* build require: get_total_height.js */

  function tap_to_expand($element) {
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
      "transition": 1 + "s",
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
  var Construct = {
    vstack: function(props) {
      /*
    props = {
        location: jQuery Selector | where to put the ad
        ad: Creative ID           | which creative
        onRender: function        | onRender function
        display: {                | Options related to how it looks
            thumb:    "circle"    |
                   OR "square"    |     What the thumb should look like
                   OR "none"      |
                   OR "rectangle" |
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
        template: props.template,
        onRender: function($element) {
          if (typeof props.display === "object") {
            /* THUMB OPTIONS */
            if (typeof props.display.thumb === "string") {
              var img = $element.find(".plr-img-wrapper").first();
              switch (props.display.thumb) {
                case "circle":
                  // circle by default
                  break;
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
            }

            /* SUMMARY OPTIONS */
            if (props.display.summary === false) {
              $element.find("p").first().remove();
            }
          }


          // Execute any custom onRender code
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    hstack: function(props) {
      /*
    props = {
        location: jQuery Selector | where to put the ad
        ad: Creative ID           | which creative
        onRender: function        | onRender function
        display: {                | Options related to how it looks
            thumb:    "circle"    |
                   OR "square"    |     What the thumb should look like
                   OR "none"      |
                   OR "rectangle" |
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
        template: props.template,
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

          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    hero: function(props) {
      q().push(["insertPreview", {
        label: "Landing Page",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          // Apply effect
          if (typeof props.effect === "function") props.effect($element);

          // Execute custom onRender
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    carousel: function(props) {
      var total_carousels = 0;


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
      $carousel = $(props.location).before(interpolate_str(["",
        "<div class=\"plr-crsl-outer plr-crsl--{0}\">",
        "    <div class=\"plr-crsl-inner\">",
        "        {1}", // slots are inserted programatically here
        "    </div>",
        "</div>",
        ""
      ].join("\n"), [total_carousels, slots])).next();

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
          template: props.template,
          onRender: ((props.onRender && typeof props.onRender[j] === "function") ? props.onRender[j] : null),
          onFill: function(data) {},
          onError: incfaliure
        }]);
      }

      // Make sure that if all the ads failed, don't even show the carousel
      if (faliures == props.ads.length) $carousel.remove();
      else total_carousels++;

    },

    blog: function(props) {
      q().push(["insertPreview", {
        label: "Landing Page",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          // Add effect
          if (typeof props.effect === "function") props.effect($element);

          // Execute custom onRender
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    infographic: function(props) {
      q().push(["insertPreview", {
        label: "Landing Page",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          // Apply effect if need be
          if (typeof props.effect === "function") props.effect($element);

          // Execute any cusom onRender
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    collection: function(props) {
      var total_collections = 0;


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

      /*----------  Inject CSS  ----------*/
      // Varies depending on what style collection the user wants

      // These are the base properties that never change, so we inject them *ONCE*
      if (total_collections === 0) {
        q().push(["injectCSS", ["",
          /* On Mobile */
          "@media only screen and (max-width: 426px) {",
          "  .plr-collection-item p:not(:nth-child(1)) {", // hide the summary
          "    display: none; }",
          "  .plr-collection-item h2 {", // make font smaller on mobile
          "    font-size: 18px; }",
          "  .plr-collection-item .plr-img-wrapper {", // make images big on mobile
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
          ".plr-collection--{0} .plr-collection-item:not(:nth-child(2)) .plr-img-wrapper", // hide the image
          "{ display: none; }",
          /* Mobile */
          "@media only screen and (max-width: 426px) {",
          "    .plr-collection--{0} .plr-collection-item:nth-child(2) p:not(:nth-child(1))", /* For the first */
          "    { display: block; }", // show the summary
          "}"
        ].join("\n"), [total_collections]);
      } else if (props.display === "noThumb") {
        style += interpolate_str(["",
          ".plr-collection--{0} .plr-collection-item .plr-img-wrapper", // hide the image
          "{ display: none; }"
        ].join("\n"), [total_collections]);
      }
      // bigThumb is implied

      q().push(["injectCSS", style, "head"]);

      /*----------  "prefix" some onRender code to the first fill  ----------*/

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
          template: props.template,
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

    },

    hero_2: function(props) {
      q().push(["insertPreview", {
        label: "Landing Page",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          // Apply effect
          if (typeof props.effect === "function") props.effect($element);

          // Execute custom onRender
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    hero_3: function(props) {
      q().push(["insertPreview", {
        label: "Landing Page",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          $element.find(".plr-sponsored").text(
            "Sponsored By " + $element.find(".plr-sponsored").attr("data-sponsor-name")
          );

          // Apply effect
          if (typeof props.effect === "function") props.effect($element);

          // Execute custom onRender
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    hero_4: function(props) {
      q().push(["insertPreview", {
        label: "Landing Page",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          $element.find(".plr-sponsored").text(
            "Sponsored By " + $element.find(".plr-sponsored").attr("data-sponsor-name")
          );

          // Apply effect
          if (typeof props.effect === "function") props.effect($element);

          // Execute custom onRender
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    twitter_carousel: function(props) {
      var total_twitter_carousels = 0;

      /*
          
          props = {
              location: jQuery selector
              collection_ad: collection unit object

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
        unit: props.collection_ad,
        location: props.location,
        previews: previews_array,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          if (props.show_sponsor === false) {
            $element.find("h2").remove();
          }

          var sponsor_name = $element.find(".plr-sponsor-name").first().text();
          $element.find("h2").text("Sponsored By " + sponsor_name);

          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

      total_twitter_carousels++;

    },

    threesixty: function(props) {
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
        template: props.template,
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

    },

    threesixty_huffpo_autoload: function(props) {
      q().push(["insertPreview", {
        label: "360 Pano",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          /*----------  Inject Dependencies  ----------*/

          // pannellum
          var pnlm_js = document.createElement('script');
          pnlm_js.src = "https://cdn.pannellum.org/2.2/pannellum.js";
          document.getElementsByTagName('head')[0].appendChild(pnlm_js);

          var pnlm_css = document.createElement('link');
          pnlm_css.href = "https://cdn.pannellum.org/2.2/pannellum.css";
          pnlm_css.rel = "stylesheet";
          document.getElementsByTagName('head')[0].appendChild(pnlm_css);

          /*----------  Loop until dependencies load  ----------*/

          (function threesixty() {
            // short circuit until the dependencies load
            if (typeof pannellum === "undefined") {
              requestAnimationFrame(threesixty);
              return;
            }

            // Instantiate panellum 
            var img_url = $element.find(".pnlm-img-url").text();
            var img_preview_url = $element.find(".preview-img-url").text();

            pannellum.viewer($element.find(".plr-pnlm-wrapper")[0], {
              "type": "equirectangular",
              "panorama": img_url,
              "preview": img_preview_url,
              "autoLoad": true,
              "autoRotate": true,
              "autoRotateInactivityDelay": 1000,
              "hfov": 80
            });

            // execute custom onRender stuff
            if (typeof props.onRender === "function") props.onRender($element);
          })();
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },

    threesixty_huffpo_static: function(props) {
      q().push(["insertPreview", {
        label: "Landing Page",
        unit: props.ad,
        location: props.location,
        infoText: "",
        infoButtonText: "",
        template: props.template,
        onRender: function($element) {
          // Apply effect
          if (typeof props.effect === "function") props.effect($element);

          // Execute custom onRender
          if (typeof props.onRender === "function") props.onRender($element);
        },
        onFill: function(data) {},
        onError: function(error) {}
      }]);

    },
  };


  /*==================================
  =            Inject CSS            =
  ==================================*/

  /*--------  for layout: vstack  --------*/

  q().push(["injectCSS", ["",
    ".plr-halfw {",
    "  float: left;",
    "  width: 300px;",
    "  margin: 25px 25px 25px 0;",
    "  padding: 15px 0;",
    "  transition: .25s;",
    "  text-align: center;",
    "  border-top: 3px solid #1877ab;",
    "  border-bottom: 3px #1877ab solid; }",
    "  .plr-halfw .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 60%;",
    "    padding-bottom: 60%; }",
    "    .plr-halfw .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-halfw .plr-img-wrapper {",
    "    margin: auto; }",
    "    .plr-halfw .plr-img-wrapper div {",
    "      border-radius: 100%; }",
    "  .plr-halfw .plr-sponsored-disclosure {",
    "    font-size: 12px;",
    "    font-variant: small-caps;",
    "    display: inline-block;",
    "    margin-top: 12px;",
    "    padding: 3px 5px;",
    "    padding-top: 0;",
    "    color: white;",
    "    background-color: #1877ab; }",
    "  .plr-halfw a {",
    "    text-decoration: initial; }",
    "  .plr-halfw h2 {",
    "    margin: 10px 0; }",
    "  .plr-halfw:hover h2 {",
    "    color: #1877ab; }",
    "  @media only screen and (max-width: 426px) {",
    "    .plr-halfw {",
    "      width: 100%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: hstack  --------*/

  q().push(["injectCSS", ["",
    ".plr-hstack {",
    "  float: left;",
    "  width: 400px;",
    "  margin: 25px 25px 25px 0;",
    "  padding: 10px 0;",
    "  transition: .25s;",
    "  text-align: center;",
    "  border-top: 3px solid #1877ab;",
    "  border-bottom: 3px #1877ab solid; }",
    "  .plr-hstack .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 50%;",
    "    padding-bottom: 50%; }",
    "    .plr-hstack .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-hstack .plr-img-wrapper {",
    "    float: left;",
    "    margin: 0px 10px 0px 0px; }",
    "    .plr-hstack .plr-img-wrapper div {",
    "      border-radius: 100%; }",
    "  .plr-hstack .plr-sponsored-disclosure {",
    "    font-size: 12px;",
    "    font-variant: small-caps;",
    "    display: inline-block;",
    "    margin-top: 5px;",
    "    padding: 3px 5px;",
    "    padding-top: 0;",
    "    color: white;",
    "    background-color: #1877ab; }",
    "  .plr-hstack a {",
    "    text-decoration: initial; }",
    "  .plr-hstack h2 {",
    "    margin: 10px 0; }",
    "  .plr-hstack:hover h2 {",
    "    color: #1877ab; }",
    "  .plr-hstack p {",
    "    text-align: left; }",
    "  @media only screen and (max-width: 426px) {",
    "    .plr-hstack {",
    "      width: 100%; }",
    "      .plr-hstack .plr-img-wrapper {",
    "        margin: 0px 10px 0px 0px; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: hero  --------*/

  q().push(["injectCSS", ["",
    ".plr-fullw {",
    "  position: relative;",
    "  overflow: hidden;",
    "  height: 225px;",
    "  margin-bottom: 14px; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 100%;",
    "    padding-bottom: 50%; }",
    "    .plr-fullw .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    width: initial;",
    "    height: 100%; }",
    "  .plr-fullw .plr-contents {",
    "    position: absolute;",
    "    top: 0;",
    "    right: 0;",
    "    width: 60%;",
    "    height: 100%;",
    "    padding: 20px;",
    "    transition: .25s;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "    .plr-fullw .plr-contents h1 {",
    "      font-size: 30px;",
    "      line-height: 35px;",
    "      margin: 0;",
    "      padding: 0;",
    "      color: white;",
    "      border: none; }",
    "    .plr-fullw .plr-contents p {",
    "      font-size: 15px;",
    "      color: white; }",
    "  .plr-fullw .plr-sponsored {",
    "    font-size: 10px;",
    "    line-height: 20px;",
    "    position: absolute;",
    "    top: 10px;",
    "    left: 10px;",
    "    padding: 0 4px;",
    "    transition: .25s;",
    "    color: white;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "  .plr-fullw:hover .plr-img-wrapper div {",
    "    opacity: .8; }",
    "  .plr-fullw:hover .plr-contents {",
    "    width: 62%; }",
    "  .plr-fullw:hover .plr-sponsored {",
    "    opacity: .8; }",
    "",
    "@media only screen and (max-width: 425px) {",
    "  .plr-fullw .plr-contents {",
    "    width: 100%; }",
    "    .plr-fullw .plr-contents h1 {",
    "      position: relative;",
    "      top: 50%;",
    "      transform: translateY(-50%);",
    "      text-align: center; }",
    "    .plr-fullw .plr-contents p {",
    "      display: none; }",
    "  .plr-fullw .plr-sponsored {",
    "    top: inherit;",
    "    right: 10px;",
    "    bottom: 10px;",
    "    left: inherit; }",
    "  .plr-fullw:hover .plr-contents {",
    "    width: 100%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: carousel  --------*/

  q().push(["injectCSS", ["",
    ".plr-crsl-item {",
    "  width: 100%;",
    "  margin: 0;",
    "  padding: 15px 0;",
    "  transition: .25s;",
    "  text-align: center;",
    "  border: none; }",
    "  .plr-crsl-item .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 60%;",
    "    padding-bottom: 60%; }",
    "    .plr-crsl-item .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-crsl-item .plr-img-wrapper {",
    "    margin: auto; }",
    "  .plr-crsl-item p {",
    "    display: none; }",
    "  .plr-crsl-item h2 {",
    "    font-size: 16px;",
    "    text-transform: initial; }",
    "  .plr-crsl-item a {",
    "    text-decoration: initial; }",
    "  .plr-crsl-item .plr-sponsored-disclosure {",
    "    font-size: 12px;",
    "    font-variant: small-caps;",
    "    display: inline-block;",
    "    margin-top: 12px;",
    "    padding: 3px 5px;",
    "    padding-top: 0;",
    "    color: white;",
    "    background-color: #1877ab; }",
    "  .plr-crsl-item:hover h2 {",
    "    color: #1877ab; }",
    "  @media only screen and (max-width: 426px) {",
    "    .plr-crsl-item {",
    "      width: 100%; }",
    "      .plr-crsl-item .plr-img-wrapper {",
    "        position: relative;",
    "        overflow: hidden;",
    "        width: 75%;",
    "        margin: auto;",
    "        padding-bottom: 75%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: blog  --------*/

  q().push(["injectCSS", ["",
    ".plr-btwn-art {",
    "  overflow: auto;",
    "  margin-bottom: 20px;",
    "  padding-top: 10px;",
    "  padding-right: 10px;",
    "  padding-bottom: 15px;",
    "  padding-left: 10px;",
    "  background-color: #e3f2fd; }",
    "  .plr-btwn-art .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 40%;",
    "    padding-bottom: 30%; }",
    "    .plr-btwn-art .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-btwn-art .plr-sponsor {",
    "    margin-bottom: 10px; }",
    "  .plr-btwn-art .plr-img-wrapper {",
    "    float: left;",
    "    margin-right: 20px; }",
    "  .plr-btwn-art h1 {",
    "    margin: 0 !important;",
    "    border-bottom: none !important; }",
    "  .plr-btwn-art a {",
    "    text-decoration: initial;",
    "    color: initial; }",
    "  @media only screen and (max-width: 425px) {",
    "    .plr-btwn-art .plr-img-wrapper {",
    "      width: 100%;",
    "      margin-right: 20px;",
    "      margin-bottom: 10px;",
    "      padding-bottom: 50%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: infographic  --------*/

  q().push(["injectCSS", ["",
    ".plr-btwn-art {",
    "  overflow: auto;",
    "  margin-bottom: 20px;",
    "  padding-top: 10px;",
    "  padding-right: 10px;",
    "  padding-bottom: 15px;",
    "  padding-left: 10px;",
    "  background-color: #e3f2fd; }",
    "  .plr-btwn-art .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 40%;",
    "    padding-bottom: 30%; }",
    "    .plr-btwn-art .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-btwn-art .plr-sponsor {",
    "    margin-bottom: 10px; }",
    "  .plr-btwn-art .plr-img-wrapper {",
    "    float: left;",
    "    margin-right: 20px; }",
    "  .plr-btwn-art h1 {",
    "    margin: 0 !important;",
    "    border-bottom: none !important; }",
    "  .plr-btwn-art a {",
    "    text-decoration: initial;",
    "    color: initial; }",
    "",
    "@media only screen and (max-width: 425px) {",
    "  .plr-btwn-art .plr-img-wrapper {",
    "    width: 100%;",
    "    margin-right: 20px;",
    "    margin-bottom: 10px;",
    "    padding-bottom: 50%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: collection  --------*/

  q().push(["injectCSS", ["",
    ".plr-collection-item {",
    "  overflow: auto;",
    "  padding: 10px 0;",
    "  border-bottom: 1px solid grey; }",
    "  .plr-collection-item .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 25%;",
    "    padding-bottom: 25%; }",
    "    .plr-collection-item .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-collection-item .plr-img-wrapper {",
    "    float: left;",
    "    margin-right: 20px; }",
    "  .plr-collection-item h2 {",
    "    margin: 0;",
    "    text-transform: inherit; }",
    "  .plr-collection-item p {",
    "    margin: 0;",
    "    margin-top: 5px; }",
    "  .plr-collection-item a {",
    "    text-decoration: initial; }",
    "  .plr-collection-item:hover a {",
    "    color: #1877ab; }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: hero_2  --------*/

  q().push(["injectCSS", ["",
    ".plr-fullw {",
    "  position: relative;",
    "  overflow: hidden;",
    "  height: 225px;",
    "  margin-bottom: 14px; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 100%;",
    "    padding-bottom: 50%; }",
    "    .plr-fullw .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    width: initial;",
    "    height: 100%; }",
    "  .plr-fullw .plr-contents {",
    "    position: absolute;",
    "    top: 0;",
    "    right: 0;",
    "    width: 60%;",
    "    height: 100%;",
    "    padding: 20px;",
    "    transition: .25s;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "    .plr-fullw .plr-contents h1 {",
    "      font-size: 30px;",
    "      line-height: 35px;",
    "      margin: 0;",
    "      padding: 0;",
    "      color: white;",
    "      border: none; }",
    "    .plr-fullw .plr-contents p {",
    "      font-size: 15px;",
    "      color: white; }",
    "  .plr-fullw .plr-sponsored {",
    "    font-size: 10px;",
    "    line-height: 20px;",
    "    position: absolute;",
    "    top: 10px;",
    "    left: 10px;",
    "    padding: 0 4px;",
    "    transition: .25s;",
    "    color: white;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "  .plr-fullw:hover .plr-img-wrapper div {",
    "    opacity: .8; }",
    "  .plr-fullw:hover .plr-contents {",
    "    width: 62%; }",
    "  .plr-fullw:hover .plr-sponsored {",
    "    opacity: .8; }",
    "",
    "@media only screen and (max-width: 425px) {",
    "  .plr-fullw .plr-contents {",
    "    top: inherit;",
    "    bottom: 0;",
    "    width: 100%;",
    "    height: 50%; }",
    "    .plr-fullw .plr-contents h1 {",
    "      font-size: 26px;",
    "      position: relative;",
    "      top: 50%;",
    "      transform: translateY(-50%); }",
    "    .plr-fullw .plr-contents p {",
    "      display: none; }",
    "  .plr-fullw .plr-sponsored {",
    "    right: 10px;",
    "    left: inherit; }",
    "  .plr-fullw:hover .plr-contents {",
    "    width: 100%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: hero_3  --------*/

  q().push(["injectCSS", ["",
    ".plr-fullw {",
    "  position: relative;",
    "  overflow: hidden;",
    "  height: 225px;",
    "  margin-bottom: 14px; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 100%;",
    "    padding-bottom: 50%; }",
    "    .plr-fullw .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    width: initial;",
    "    height: 100%; }",
    "  .plr-fullw .plr-contents {",
    "    position: absolute;",
    "    top: 0;",
    "    right: 0;",
    "    width: 60%;",
    "    height: 100%;",
    "    padding: 20px;",
    "    transition: .25s;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "    .plr-fullw .plr-contents h1 {",
    "      font-size: 30px;",
    "      line-height: 35px;",
    "      margin: 0;",
    "      padding: 0;",
    "      color: white;",
    "      border: none; }",
    "    .plr-fullw .plr-contents p {",
    "      font-size: 15px;",
    "      color: white; }",
    "  .plr-fullw .plr-sponsored {",
    "    font-size: 10px;",
    "    line-height: 20px;",
    "    position: absolute;",
    "    top: 10px;",
    "    left: 10px;",
    "    padding: 0 4px;",
    "    transition: .25s;",
    "    color: white;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "  .plr-fullw:hover .plr-img-wrapper div {",
    "    opacity: .8; }",
    "  .plr-fullw:hover .plr-contents {",
    "    width: 62%; }",
    "  .plr-fullw:hover .plr-sponsored {",
    "    opacity: .8; }",
    "",
    "@media only screen and (max-width: 425px) {",
    "  .plr-fullw .plr-contents {",
    "    top: inherit;",
    "    bottom: 20px;",
    "    width: 100%;",
    "    height: 75%;",
    "    padding: 20px 10px; }",
    "    .plr-fullw .plr-contents p {",
    "      margin: 0; }",
    "  .plr-fullw .plr-sponsored {",
    "    top: inherit;",
    "    right: 0;",
    "    bottom: 0;",
    "    left: 0;",
    "    background-color: black; }",
    "  .plr-fullw:hover .plr-contents {",
    "    width: 100%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: hero_4  --------*/

  q().push(["injectCSS", ["",
    ".plr-fullw {",
    "  position: relative;",
    "  overflow: hidden;",
    "  height: 225px;",
    "  margin-bottom: 14px; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 100%;",
    "    padding-bottom: 50%; }",
    "    .plr-fullw .plr-img-wrapper > div:first-child {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      transition: .25s;",
    "      background-size: cover !important; }",
    "  .plr-fullw .plr-img-wrapper {",
    "    width: initial;",
    "    height: 100%; }",
    "  .plr-fullw .plr-contents {",
    "    position: absolute;",
    "    top: 0;",
    "    right: 0;",
    "    width: 60%;",
    "    height: 100%;",
    "    padding: 20px;",
    "    transition: .25s;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "    .plr-fullw .plr-contents h1 {",
    "      font-size: 30px;",
    "      line-height: 35px;",
    "      margin: 0;",
    "      padding: 0;",
    "      color: white;",
    "      border: none; }",
    "    .plr-fullw .plr-contents p {",
    "      font-size: 15px;",
    "      color: white; }",
    "  .plr-fullw .plr-sponsored {",
    "    font-size: 10px;",
    "    line-height: 20px;",
    "    position: absolute;",
    "    top: 10px;",
    "    left: 10px;",
    "    padding: 0 4px;",
    "    transition: .25s;",
    "    color: white;",
    "    background-color: rgba(0, 0, 0, 0.4); }",
    "  .plr-fullw:hover .plr-img-wrapper div {",
    "    opacity: .8; }",
    "  .plr-fullw:hover .plr-contents {",
    "    width: 62%; }",
    "  .plr-fullw:hover .plr-sponsored {",
    "    opacity: .8; }",
    "",
    "@media only screen and (max-width: 425px) {",
    "  .plr-fullw {",
    "    height: 295px; }",
    "    .plr-fullw .plr-contents {",
    "      font-size: 18px;",
    "      top: inherit;",
    "      bottom: 0;",
    "      width: 100%;",
    "      height: 85px;",
    "      padding: 0 10px;",
    "      background-color: rgba(0, 0, 0, 0.8); }",
    "      .plr-fullw .plr-contents h1 {",
    "        font-size: 24px;",
    "        position: relative;",
    "        top: 50%;",
    "        transform: translateY(-50%); }",
    "      .plr-fullw .plr-contents p {",
    "        display: none; }",
    "    .plr-fullw .plr-sponsored {",
    "      top: inherit;",
    "      right: 0;",
    "      bottom: 85px;",
    "      left: inherit;",
    "      background-color: rgba(0, 0, 0, 0.8); }",
    "    .plr-fullw:hover .plr-contents {",
    "      width: 100%; } }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: twitter_carousel  --------*/

  q().push(["injectCSS", ["",
    "/* build ignorefile */",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: threesixty  --------*/

  q().push(["injectCSS", ["",
    "/* build ignorefile */",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: threesixty_huffpo_autoload  --------*/

  q().push(["injectCSS", ["",
    ".plr-360-huffpo-autoload {",
    "  position: relative;",
    "  max-width: 300px;",
    "  margin: auto;",
    "  padding-top: 10px;",
    "  border-top: 1px solid #e5e5e5;",
    "  border-bottom: 1px solid #e5e5e5; }",
    "  @media (max-width: 320px) {",
    "    .plr-360-huffpo-autoload {",
    "      width: 300px;",
    "      margin: -10px; } }",
    "  .plr-360-huffpo-autoload a {",
    "    text-decoration: none;",
    "    color: initial; }",
    "  .plr-360-huffpo-autoload .plr-pnlm-wrapper {",
    "    width: 100%;",
    "    height: 200px; }",
    "  .plr-360-huffpo-autoload .pnlm-load-box {",
    "    height: 100px !important; }",
    "  .plr-360-huffpo-autoload .pnlm-lmsg {",
    "    display: none; }",
    "  .plr-360-huffpo-autoload .plr-pnlm-wrapper {",
    "    overflow: visible; }",
    "  .plr-360-huffpo-autoload .title {",
    "    font-family: \"ProximaNovaCond-Extrabld\", \"NotoKufiArabic-Bold\", \"Helvetica Neue\", \"Helvetica\", Roboto, Arial, sans-serif;",
    "    font-size: 18px;",
    "    font-weight: normal;",
    "    position: relative;",
    "    width: 100%;",
    "    margin: 0;",
    "    padding-top: 5px;",
    "    padding-bottom: 10px;",
    "    text-transform: none;",
    "    color: #2e7061;",
    "    background: white; }",
    "    .plr-360-huffpo-autoload .title img {",
    "      position: absolute;",
    "      top: 50%;",
    "      right: 0;",
    "      float: right;",
    "      width: 60px;",
    "      height: 30px;",
    "      transform: translateY(-50%); }",
    "    .plr-360-huffpo-autoload .title .inner-title {",
    "      display: block;",
    "      width: 235px; }",
    "    .plr-360-huffpo-autoload .title .cta {",
    "      font-size: 14px;",
    "      position: relative;",
    "      top: 3px;",
    "      left: -3px;",
    "      padding: 2px 5px;",
    "      text-transform: none;",
    "      color: grey;",
    "      border-radius: 3px;",
    "      background-color: #f1f1f1; }",
    "  .plr-360-huffpo-autoload .pnlm-load-button {",
    "    top: 0;",
    "    right: 0;",
    "    left: initial;",
    "    width: 100%;",
    "    height: 100%;",
    "    margin: 0;",
    "    border-radius: 0;",
    "    background-color: transparent; }",
    "    .plr-360-huffpo-autoload .pnlm-load-button:hover {",
    "      background-color: transparent; }",
    "    .plr-360-huffpo-autoload .pnlm-load-button p {",
    "      position: absolute;",
    "      top: 10px;",
    "      right: 10px;",
    "      display: block;",
    "      margin: 0;",
    "      padding: 0 10px;",
    "      background-color: rgba(46, 112, 97, 0.6); }",
    "  .plr-360-huffpo-autoload .plr-learn-more {",
    "    line-height: 30px;",
    "    position: absolute;",
    "    right: 5px;",
    "    bottom: 5px;",
    "    display: none;",
    "    height: 30px;",
    "    margin: 0;",
    "    padding: 0 10px;",
    "    background-color: rgba(1, 117, 102, 0.7); }",
    "",
    ""
  ].join("\n"), "head"]);

  /*--------  for layout: threesixty_huffpo_static  --------*/

  q().push(["injectCSS", ["",
    ".plr-threesixty-huffpo-static {",
    "  position: relative;",
    "  width: 300px;",
    "  height: 250px;",
    "  margin: auto;",
    "  transition: .25s;",
    "  text-align: center;",
    "  border-top: 3px solid #2f7362;",
    "  border-bottom: 3px #2f7362 solid; }",
    "  .plr-threesixty-huffpo-static span {",
    "    display: block;",
    "    overflow: hidden; }",
    "  .plr-threesixty-huffpo-static .plr-img-wrapper {",
    "    position: relative;",
    "    position: relative;",
    "    top: 0;",
    "    left: 0;",
    "    overflow: hidden;",
    "    width: 100%;",
    "    margin: auto;",
    "    padding-bottom: 246px; }",
    "    .plr-threesixty-huffpo-static .plr-img-wrapper > div {",
    "      position: absolute;",
    "      top: 0;",
    "      right: 0;",
    "      bottom: 0;",
    "      left: 0;",
    "      overflow: hidden;",
    "      width: 100%;",
    "      padding-bottom: 50%;",
    "      transition: .25s;",
    "      border-radius: 0;",
    "      background-size: cover !important; }",
    "  .plr-threesixty-huffpo-static .plr-sponsored-disclosure {",
    "    font-family: \"ProximaNovaCond-Extrabld\", \"NotoKufiArabic-Bold\", \"Helvetica Neue\", \"Helvetica\", Roboto, Arial, sans-serif;",
    "    font-size: 12px;",
    "    font-weight: 400;",
    "    position: absolute;",
    "    top: -34px;",
    "    right: 5px;",
    "    padding: 4px 8px;",
    "    color: white;",
    "    background-color: rgba(47, 115, 98, 0.6); }",
    "  .plr-threesixty-huffpo-static a {",
    "    font-family: \"ProximaNovaCond-Extrabld\", \"NotoKufiArabic-Bold\", \"Helvetica Neue\", \"Helvetica\", Roboto, Arial, sans-serif;",
    "    text-decoration: initial;",
    "    color: #2f7362; }",
    "  .plr-threesixty-huffpo-static h2 {",
    "    font-family: \"ProximaNovaCond-Extrabld\", \"NotoKufiArabic-Bold\", \"Helvetica Neue\", \"Helvetica\", Roboto, Arial, sans-serif;",
    "    font-size: 24px;",
    "    line-height: 20px;",
    "    position: absolute;",
    "    bottom: 0;",
    "    display: block;",
    "    width: 100%;",
    "    margin: 0;",
    "    padding: 10px 0;",
    "    text-transform: initial;",
    "    background-color: white; }",
    "  .plr-threesixty-huffpo-static:hover h2 {",
    "    color: #2f7362; }",
    "",
    ""
  ].join("\n"), "head"]);


  /*=======================================
  =            Insert Previews            =
  =======================================*/

  /*-------  on root page  -------*/

  if (location.hash === "") {
    Construct.vstack({
      "location": ".article:eq(0) p:eq(2)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "circle",
        "summary": true
      },
      template: templates.vstack
    });
    Construct.hstack({
      "location": ".article:eq(0) p:eq(7)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "rectangle",
        "summary": true
      },
      template: templates.hstack
    });
    Construct.hero({
      "location": ".article:eq(0) p:eq(12)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.hero
    });
    Construct.carousel({
      "location": ".article:eq(0) p:eq(13)",
      "ads": [{
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "f278c44c9f11494ca9c57714599054c6"
      }, {
        "server": "mvdirect",
        "id": "ceff856877e94c3d9b1fe825be40a650"
      }, {
        "server": "mvdirect",
        "id": "afc61bcb3d6e4995a92b632d02f4e03f"
      }, {
        "server": "mvdirect",
        "id": "e190767536954f418c789fc19347b240"
      }, {
        "server": "mvdirect",
        "id": "0de95dc78ab64551af129ea1a6c7bca2"
      }],
      template: templates.carousel
    });
    Construct.blog({
      "location": ".article:last",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.blog
    });
    Construct.hero({
      "location": ".article:last p:eq(3)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      effect: function($element) {
        ken_burns_effect($element);
      },
      onRender: function($element) {
        console.log("custom onRender");
      },
      template: templates.hero
    });
    Construct.blog({
      "location": ".article:last p:eq(10)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      effect: function($element) {
        scroll_to_expand($element);
      },
      template: templates.blog
    });
    Construct.blog({
      "location": ".article:last p:eq(15)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      effect: function($element) {
        tap_to_expand($element);
      },
      template: templates.blog
    });
    Construct.infographic({
      "location": ".article:last p:eq(18)",
      "ad": {
        "server": "mvdirect",
        "id": "dee7b01db5bc41ed8da84b4437bc37ea"
      },
      effect: function($element) {
        tap_to_expand($element);
      },
      template: templates.infographic
    });
    Construct.collection({
      "location": ".bottom-anchor",
      "title": "Indy racing like you’ve never seen it before!",
      "ads": [{
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }],
      "display": "hero",
      template: templates.collection
    });
  }

  /*-------  on #blog  -------*/

  if (location.hash === "#blog") {
    Construct.blog({
      "location": ".article:eq(0) p:eq(2)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      onRender: function($element) {
        $element.find(".plr-img-wrapper").remove();
      },
      template: templates.blog
    });
    Construct.blog({
      "location": ".article:last",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.blog
    });
  }

  /*-------  on #carousel  -------*/

  if (location.hash === "#carousel") {
    Construct.carousel({
      "location": ".article:eq(0) p:eq(8)",
      "ads": [{
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }],
      template: templates.carousel
    });
  }

  /*-------  on #collection  -------*/

  if (location.hash === "#collection") {
    Construct.collection({
      "location": ".article:last",
      "title": "Indy racing like you’ve never seen it before!",
      "ads": [{
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }],
      "display": "hero",
      template: templates.collection
    });
    Construct.collection({
      "location": ".bottom-anchor",
      "title": "Indy racing like you’ve never seen it before!",
      "ads": [{
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }, {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      }],
      "display": "bigThumb",
      template: templates.collection
    });
  }

  /*-------  on #expandable  -------*/

  if (location.hash === "#expandable") {
    Construct.blog({
      "location": ".article p:eq(2)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      effect: function($element) {
        scroll_to_expand($element);
      },
      template: templates.blog
    });
    Construct.blog({
      "location": ".article p:eq(5)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      effect: function($element) {
        tap_to_expand($element);
      },
      template: templates.blog
    });
    Construct.infographic({
      "location": ".article p:eq(8)",
      "ad": {
        "server": "mvdirect",
        "id": "dee7b01db5bc41ed8da84b4437bc37ea"
      },
      effect: function($element) {
        tap_to_expand($element);
      },
      template: templates.infographic
    });
  }

  /*-------  on #hero  -------*/

  if (location.hash === "#hero") {
    Construct.hero({
      "location": ".article:eq(0) p:eq(2)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.hero
    });
    Construct.hero_2({
      "location": ".article:eq(0) p:eq(6)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.hero_2
    });
    Construct.hero_3({
      "location": ".article:eq(0) p:eq(10)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.hero_3
    });
    Construct.hero_4({
      "location": ".article:eq(0) p:eq(14)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.hero_4
    });
  }

  /*-------  on #hstack  -------*/

  if (location.hash === "#hstack") {
    Construct.hstack({
      "location": ".article:eq(0) p:eq(3)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "square",
        "summary": true
      },
      template: templates.hstack
    });
    Construct.hstack({
      "location": ".article:eq(0) p:eq(8)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "circle",
        "summary": true
      },
      template: templates.hstack
    });
    Construct.hstack({
      "location": ".article:eq(0) p:eq(16)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "none",
        "summary": true
      },
      template: templates.hstack
    });
  }

  /*-------  on #interactive  -------*/

  if (location.hash === "#interactive") {
    Construct.hero({
      "location": ".article p:eq(3)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      effect: function($element) {
        ken_burns_effect($element);
      },
      template: templates.hero
    });
  }

  /*-------  on #lab  -------*/

  if (location.hash === "#lab") {
    Construct.twitter_carousel({
      "location": ".article:eq(0) p:eq(3)",
      "collection_ad": {
        "server": "mvdirect",
        "id": "collection_a478cfee2ce749c78c9d020ce0cce377"
      },
      "num_tweets": 12,
      "show_sponsor": true,
      template: templates.twitter_carousel
    });
    Construct.twitter_carousel({
      "location": ".article:eq(0) p:eq(6)",
      "collection_ad": {
        "server": "mvdirect",
        "id": "collection_30d7536d97b54f37b2800ab8869fcc38"
      },
      "num_tweets": 12,
      "show_sponsor": true,
      template: templates.twitter_carousel
    });
    Construct.threesixty({
      "location": ".article:first p:eq(10)",
      "ad": {
        "server": "mvdirect",
        "id": "759b77783e0a4db18fb363dd2e1aa3be"
      },
      template: templates.threesixty
    });
  }

  /*-------  on #pratik  -------*/

  if (location.hash === "#pratik") {
    Construct.vstack({
      "location": ".article:eq(0) p:eq(2)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "rectangle",
        "summary": true
      },
      template: templates.vstack
    });
    Construct.hero({
      "location": ".article:eq(0) p:eq(8)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      template: templates.hero
    });
    Construct.hero({
      "location": ".article:eq(0) p:eq(13)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      effect: function($element) {
        ken_burns_effect($element);
      },
      template: templates.hero
    });
  }

  /*-------  on #ryot  -------*/

  if (location.hash === "#ryot") {
    Construct.threesixty_huffpo_autoload({
      "location": ".article:first p:eq(5)",
      "ad": {
        "server": "mvdirect",
        "id": "2913cfc8aabb4d20a1d052c07badb450"
      },
      onRender: function($element) {
        // $element.find(".pnlm-load-button").click();
        console.log("asd")
      },
      template: templates.threesixty_huffpo_autoload
    });
    Construct.threesixty_huffpo_static({
      "location": ".article:first p:eq(10)",
      "ad": {
        "server": "mvdirect",
        "id": "2913cfc8aabb4d20a1d052c07badb450"
      },
      effect: function($element) {
        ken_burns_effect($element);
      },
      onRender: function($element) {

      },
      template: templates.threesixty_huffpo_static
    });
  }

  /*-------  on #vstack  -------*/

  if (location.hash === "#vstack") {
    Construct.vstack({
      "location": ".article:eq(0) p:eq(2)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "rectangle",
        "summary": true
      },
      template: templates.vstack
    });
    Construct.vstack({
      "location": ".article:eq(0) p:eq(8)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "circle",
        "summary": true
      },
      template: templates.vstack
    });
    Construct.vstack({
      "location": ".article:eq(0) p:eq(13)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "square",
        "summary": true
      },
      template: templates.vstack
    });
    Construct.vstack({
      "location": ".article:eq(0) p:eq(16)",
      "ad": {
        "server": "mvdirect",
        "id": "dc2b73ff3a184cf5b4fc5ad33517a017"
      },
      "display": {
        "thumb": "none",
        "summary": true
      },
      template: templates.vstack
    });
  }

  /* eslint-disable */
  function populate_templates() {


    /*=================================
    =            Templates            =
    =================================*/
    templates = {

      /*--------  vstack.handlebars  --------*/

      /*

      Original template
      -----------------

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

      /*--------  hstack.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-hstack">
          <a href="{{link}}" style="border-bottom: none;box-shadow: none;">
              <div class="plr-sponsored-disclosure">sponsor content</div>
              <h2>{{title}}</h2>
              <div class="plr-img-wrapper">
                  <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
              </div>

              <p style="color: #666666;margin-bottom: 0;">{{summary}}</p>
          </a>
      </div>

      */

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

      /*--------  hero.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-fullw">
        <a href="{{link}}" rel="nofollow">
          <div class="plr-img-wrapper">
            <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
          </div>
          <div class="plr-contents" style="">
            <h1>{{title}}</h1>
            <p>{{summary}}</p>
          </div>
          <div class="plr-sponsored" data-sponsor-name="{{sponsor.name}}">Sponsor Content</div>
        </a>
      </div>

      */

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
          "</p>\n    </div>\n    <div class=\"plr-sponsored\" data-sponsor-name=\"" +
          escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
          "\">Sponsor Content</div>\n  </a>\n</div>";
        return buffer;
      },

      /*--------  carousel.handlebars  --------*/

      /*

      Original template
      -----------------

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

      carousel: function(Handlebars, depth0, helpers, partials, data) {
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

      /*--------  blog.handlebars  --------*/

      /*

      Original template
      -----------------

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

      /*--------  infographic.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-btwn-art">
          <div class="topic">sponsored</div>
          <a href="{{link}}"><h1>{{title}}</h1></a>
          <div class="plr-sponsor">Presented by <b>{{sponsor.name}}</b></div>
          <img src="{{getThumbHref width=425}}" style="width:100%">
          <p>{{summary}}</p>
          <a href="{{link}}" style="text-decoration: underline;">
              <p>Learn More...</p>
          </a>
      </div>

      */

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

      /*--------  collection.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-collection-item">
          <a href="{{link}}">
              <div class="plr-img-wrapper">
                  <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
              </div>
              <h2>{{title}}</h2>
          </a>
          <p>{{summary}}</p>
        <div class="sponsor-logo-href" style="display:none;">{{sponsor.logo.href}}</div>
      </div>

      */

      collection: function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
          stack1, functionType = "function",
          escapeExpression = this.escapeExpression;


        buffer += "<div class=\"plr-collection-item\">\n    <a href=\"";
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

      /*--------  hero_2.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-fullw">
        <a href="{{link}}" rel="nofollow">
          <div class="plr-img-wrapper">
            <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
          </div>
          <div class="plr-contents" style="">
            <h1>{{title}}</h1>
            <p>{{summary}}</p>
          </div>
          <div class="plr-sponsored" data-sponsor-name="{{sponsor.name}}">Sponsor Content</div>
        </a>
      </div>

      */

      hero_2: function(Handlebars, depth0, helpers, partials, data) {
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
          "</p>\n    </div>\n    <div class=\"plr-sponsored\" data-sponsor-name=\"" +
          escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
          "\">Sponsor Content</div>\n  </a>\n</div>";
        return buffer;
      },

      /*--------  hero_3.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-fullw">
        <a href="{{link}}" rel="nofollow">
          <div class="plr-img-wrapper">
            <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
          </div>
          <div class="plr-contents" style="">
            <h1>{{title}}</h1>
            <p>{{summary}}</p>
          </div>
          <div class="plr-sponsored" data-sponsor-name="{{sponsor.name}}">Sponsor Content</div>
        </a>
      </div>

      */

      hero_3: function(Handlebars, depth0, helpers, partials, data) {
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
          "</p>\n    </div>\n    <div class=\"plr-sponsored\" data-sponsor-name=\"" +
          escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
          "\">Sponsor Content</div>\n  </a>\n</div>";
        return buffer;
      },

      /*--------  hero_4.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-fullw">
        <a href="{{link}}" rel="nofollow">
          <div class="plr-img-wrapper">
            <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
          </div>
          <div class="plr-contents" style="">
            <h1>{{title}}</h1>
            <p>{{summary}}</p>
          </div>
          <div class="plr-sponsored" data-sponsor-name="{{sponsor.name}}">Sponsor Content</div>
        </a>
      </div>

      */

      hero_4: function(Handlebars, depth0, helpers, partials, data) {
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
          "</p>\n    </div>\n    <div class=\"plr-sponsored\" data-sponsor-name=\"" +
          escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
          "\">Sponsor Content</div>\n  </a>\n</div>";
        return buffer;
      },

      /*--------  twitter_carousel.handlebars  --------*/

      /*

      Original template
      -----------------

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

      /*--------  threesixty.handlebars  --------*/

      /*

      Original template
      -----------------

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
      </div>

      */

      threesixty: function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
          stack1, stack2, functionType = "function",
          escapeExpression = this.escapeExpression;


        buffer += "<div class=\"plr-360\">\n    <div class=\"plr-pnlm-wrapper\"></div>\n    <div class=\"plr-ad-info\" style=\"display:none;\">\n        <div class=\"sponsor-name\">" +
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
          "</div>\n    </div>\n</div>";
        return buffer;
      },

      /*--------  threesixty_huffpo_autoload.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-360-huffpo-autoload">
          <div class="plr-pnlm-wrapper"></div>
          <div class="plr-ad-info" style="display:none;">
              <div class="pnlm-img-url">{{custom.panorama_img_url}}</div>
              <div class="preview-img-url">{{getThumbHref}}</div>
          </div>
          <a href="{{link}}">
              <div class="title">
                  <img src="{{sponsor.logo.href}}">
                  <div class="inner-title">
                      {{title}}
                      <br>
                      <span class="cta">View full experience</span>
                  </div>
              </div>
          </a>
      </div>


      */

      threesixty_huffpo_autoload: function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
          stack1, stack2, functionType = "function",
          escapeExpression = this.escapeExpression;


        buffer += "<div class=\"plr-360-huffpo-autoload\">\n    <div class=\"plr-pnlm-wrapper\"></div>\n    <div class=\"plr-ad-info\" style=\"display:none;\">\n        <div class=\"pnlm-img-url\">" +
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
          "</div>\n    </div>\n    <a href=\"";
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
          "\">\n        <div class=\"title\">\n            <img src=\"" +
          escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.logo)), stack1 == null || stack1 === false ? stack1 : stack1.href)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) +
          "\">\n            <div class=\"inner-title\">\n                ";
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
          "\n                <br>\n                <span class=\"cta\">View full experience</span>\n            </div>\n        </div>\n    </a>\n</div>\n";
        return buffer;
      },

      /*--------  threesixty_huffpo_static.handlebars  --------*/

      /*

      Original template
      -----------------

      <div class="plr-threesixty-huffpo-static">
          <a href="{{link}}" style="border-bottom: none; box-shadow: none;" rel="nofollow">
              <span>
                  <div class="plr-img-wrapper">
                      <div style="background: url('{{getThumbHref}}') no-repeat center center;"></div>
                  </div>
              </span>
              <h2>
                  {{title}}
                  <div class="plr-sponsored-disclosure">HUFFPOST RYOT</div>
              </h2>
          </a>
      </div>

      */

      threesixty_huffpo_static: function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
          stack1, functionType = "function",
          escapeExpression = this.escapeExpression;


        buffer += "<div class=\"plr-threesixty-huffpo-static\">\n    <a href=\"";
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
          "\" style=\"border-bottom: none; box-shadow: none;\" rel=\"nofollow\">\n        <span>\n            <div class=\"plr-img-wrapper\">\n                <div style=\"background: url('";
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
          "') no-repeat center center;\"></div>\n            </div>\n        </span>\n        <h2>\n            ";
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
          "\n            <div class=\"plr-sponsored-disclosure\">HUFFPOST RYOT</div>\n        </h2>\n    </a>\n</div>";
        return buffer;
      },
    }

  }
  /* eslint-enable */
})();


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    p = d.location.protocol;
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.type = "text/javascript";
  js.async = true;
  js.src = ((p === "https:") ? p : "http:") + "//plugin.mediavoice.com/plugin.js";
  fjs.parentNode.insertBefore(js, fjs);

  // Inject jQuery
  var jq = document.createElement('script');
  jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  document.getElementsByTagName('head')[0].appendChild(jq);
})(document, "script", "nativeads-plugin");