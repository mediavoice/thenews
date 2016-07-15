BUILD.pages["_root_"] = [{
    layout: "vstack",
    props: {
        location: ".article:eq(0) p:eq(2)",
        ad: "standard_ad",
        display: {
            thumb: "circle",
            summary: true
        }
    }
}, {
    layout: "hstack",
    props: {
        location: ".article:eq(0) p:eq(7)",
        ad: "standard_ad",
        display: {
            thumb: "rectangle",
            summary: true
        }
    }
}, {
    layout: "hero",
    props: {
        location: ".article:eq(0) p:eq(12)",
        ad: "standard_ad"
    }
}, {
    layout: "carousel",
    props: {
        location: ".article:eq(0) p:eq(13)",
        ads: [
            "standard_ad",
            "c2",
            "c3",
            "c4",
            "c5",
            "c6"
        ]
    }
}, {
    layout: "blog",
    props: {
        location: ".article:last",
        ad: "standard_ad"
    }
}, {
    layout: "hero",
    props: {
        location: ".article:last p:eq(3)",
        ad: "standard_ad",
        effect: "ken burns",
        onRender: function($element) {
            console.log("custom onRender");
        }
    }
}, {
    layout: "blog",
    props: {
        location: ".article:last p:eq(10)",
        ad: "standard_ad",
        effect: "scroll to expand"
    }
}, {
    layout: "blog",
    props: {
        location: ".article:last p:eq(15)",
        ad: "standard_ad",
        effect: "tap to expand"
    }
}, {
    layout: "infographic",
    props: {
        location: ".article:last p:eq(18)",
        ad: "inofgraphic_ad",
        effect: "tap to expand"
    }
}, {
    layout: "collection",
    props: {
        location: ".bottom-anchor",
        title: "Indy racing like you’ve never seen it before!",
        ads: [
            "standard_ad",
            "standard_ad",
            "standard_ad"
        ],
        display: "hero" /* OR bigThumb OR noThumb */
    }
}];