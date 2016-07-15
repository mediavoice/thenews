BUILD.pages["blog"] = [
    {
        layout: "blog",
        props: {
            location: ".article:eq(0) p:eq(2)",
            ad: "standard_ad",
            onRender: function($element) {
                $element.find(".plr-img-wrapper").remove();
            }
        }
    },
    {
        layout: "blog",
        props: {
            location: ".article:last",
            ad: "standard_ad"
        }
    }
];
