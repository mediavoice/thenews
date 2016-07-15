BUILD.pages["hstack"] = [{
    layout: "hstack",
    props: {
        location: ".article:eq(0) p:eq(3)",
        ad: "standard_ad",
        display: {
            thumb: "square",
            summary: true
        }
    }
}, {
    layout: "hstack",
    props: {
        location: ".article:eq(0) p:eq(8)",
        ad: "standard_ad",
        display: {
            thumb: "circle",
            summary: true
        }
    }
}, {
    layout: "hstack",
    props: {
        location: ".article:eq(0) p:eq(16)",
        ad: "standard_ad",
        display: {
            thumb: "none",
            summary: true
        }
    }
}];
