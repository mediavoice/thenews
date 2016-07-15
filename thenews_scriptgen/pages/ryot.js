BUILD.pages["ryot"] = [{
    layout: "threesixty_huffpo_2",
    props: {
        location: ".article:first p:eq(10)",
        ad: "panorama_ad_ryot",
        onRender: function($element) {
            (function loop() {
                if ($element[0].getBoundingClientRect().bottom > window.innerHeight * 3 / 4) {
                    requestAnimationFrame(loop);
                    return;
                }

                $element.find(".pnlm-load-button").click();
            })();
        }
    }
}, {
    layout: "threesixty_huffpo",
    props: {
        location: ".article:first p:eq(5)",
        ad: "panorama_ad_ryot",
        onRender: function($element) {
            var mainloopid;

            // we skip injecting fulltilt b/c we get it for free

            // this line is KEY
            var $i = $element.find(".pnlm-render-container");

            var SCALE = 1.25;

            $i.css({
                // position: "relative",
                left: "initial",
                bottom: "initial",
                right: 0,
                top: 0,
                transform: "scale(" + SCALE + ")"
            });

            var deviceOrientation;
            new FULLTILT.getDeviceOrientation({
                    'type': 'game'
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
                        x: clamp(trunc(-(rotation.gamma) / 180, 5) * 2, -0.5, 0.5),
                        y: clamp(trunc(-(rotation.beta - 45) / 180, 5) * 2, -0.5, 0.5) // why * 2? It just *feels* better
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
                mainloopid = requestAnimationFrame(parallax);
            })();

            $element.find(".pnlm-load-button").click(function() {
                cancelAnimationFrame(mainloopid);
                $element.find(".pnlm-render-container").css({
                    // position: "relative",
                    left: "initial",
                    bottom: "initial",
                    right: "initial",
                    top: "initial",
                    transform: ""
                });
            });
        }
    }
}];
