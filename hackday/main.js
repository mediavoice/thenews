var adCount = 0;
var adInterval = setInterval(exec, 500);

function pullJSON() {
    console.log("Pulling JSON");
    // go through every ID in the JSON
    // grab info from meraxes: http://meraxes.polarmobile.com/nativeads/v1.4.0/json/creative/ + ID 
    
};

function insertAds() {
    var thumbnails = [];
    thumbnails.push('http://shushi168.com/data/out/193/37281782-random-image.png');
    thumbnails.push('http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD');
    thumbnails.push('https://pbs.twimg.com/profile_images/619270171035856896/8Eu522G0.jpg');
    var randomIndex = Math.floor(Math.random() * 3);
    console.log("Inserting Ads");
    var html_template = ["",
        "<div class=\"plr-ad\">",
        "    <a href=\"http://www.wikipedia.org/\" target=\"showPreview\" class=\"link\">",
        "        <div class=\"plr-img-wrapper\">",
        "            <div style=\"background: url('" + thumbnails[randomIndex] + "') no-repeat center center;\"></div>",
        "        </div>",
        "        <div class=\"plr-ad-content\">",
        "            <div class=\"plr-ad-content-title\">These 8 Real-Life Dads Are Secretly Superheroes</div>",
        "            <div class=\"plr-ad-content-banner\">Sponsored</div>",
        "        </div>",
        "    </a>",
        "</div>",
        "",
        ""
    ].join("\n");
    $('.outer-container').prepend(html_template);
    adCount++;
    console.log(adCount);
}

function exec() {
	var links = $('a.link').click(function() {
   	console.log("working");
       $('iframe').css('opacity', '1');
   });
    console.log("exec");
    if (adCount < 10) {
        pullJSON();
        insertAds();
    } else {
        stop();
    }
}

function stop() {
    clearInterval(adInterval);
}
