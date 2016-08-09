BUILD.pages["ryot"] = [{
    layout: "threesixty_huffpo_autoload",
    props: {
        location: ".article:first p:eq(5)",
        ad: "panorama_ad_ryot",
        onRender: function($element) {
            // $element.find(".pnlm-load-button").click();
        }
    }
}, {
    layout: "threesixty_huffpo_static",
    props: {
        location: ".article:first p:eq(10)",
        ad: "panorama_ad_ryot",
        effect: "ken burns",
        onRender: function($element) {

        }
    }
}
// {
//     layout: "threesixty_huffpo_2",
//     props: {
//         location: ".article:first p:eq(10)",
//         ad: "panorama_ad_ryot",
//         onRender: function($element) {
//             // This will automatically load the panorama when it is 3/4 of the page down
//             (function loop() {
//                 if ($element[0].getBoundingClientRect().bottom > window.innerHeight * 3 / 4) {
//                     requestAnimationFrame(loop);
//                     return;
//                 }

//                 $element.find(".pnlm-load-button").click();
//             })();
//         }
//     }
// }
];
