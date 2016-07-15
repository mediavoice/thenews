BUILD.pages["pratik"] = [{
    layout: "vstack",
    props: {
        location: ".article:eq(0) p:eq(2)",
        ad: "standard_ad",
        display: {
            thumb: "rectangle",
            summary: true
        }
    }
}, {
    layout: "hero",
    props: {
        location: ".article:eq(0) p:eq(8)",
        ad: "standard_ad"
    }
}, {
    layout: "hero",
    props: {
        location: ".article:eq(0) p:eq(13)",
        ad: "standard_ad",
        effect: "ken burns"
    }
}];
