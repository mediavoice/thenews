BUILD.pages["lab"] = [{
    layout: "twitter_carousel",
    props: {
        location: ".article:eq(0) p:eq(3)",
        collection_ad: "tweets",
        num_tweets: 12,
        show_sponsor: true
    }
}, {
    layout: "twitter_carousel",
    props: {
        location: ".article:eq(0) p:eq(6)",
        collection_ad: "tweets_text_only",
        num_tweets: 12,
        show_sponsor: true
    }
}, {
    layout: "threesixty",
    props: {
        location: ".article:first p:eq(10)",
        ad: "panorama_ad"
    }
}];
