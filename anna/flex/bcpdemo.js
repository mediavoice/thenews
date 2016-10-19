function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	if (name !== "_ga" || name !== "_gat" || !name.startsWith("__utm")) {
    		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    	}
    }

    console.log('deleted cookies');
}

function htmlbodyHeightUpdate(){
	var height3 = $( window ).height()
	var height1 = $('.nav').height()+50
	height2 = $('.main').height()
	if(height2 > height3){
		$('html').height(Math.max(height1,height3,height2)+10);
		$('body').height(Math.max(height1,height3,height2)+10);
	}
	else
	{
		$('html').height(Math.max(height1,height3,height2));
		$('body').height(Math.max(height1,height3,height2));
	}

}

function linkRedirect(link_class, pageURL, el) {

	//deleteAllCookies();

	if (link_class === "desktop") {
    	$("#sitewindow").css("width", "100%");
	}
	else if (link_class === "mobile") {
    	$("#sitewindow").css("width", "400px");

	}
	else if (link_class === "tablet") {
    	$("#sitewindow").css("width", "600px");

	}
	else if (link_class === "facebookia") {
    	$("#sitewindow").css("width", "420px");

	}
	else if (link_class === "newsletter") {
    	$("#sitewindow").css("width", "80%");
	}

	$("#sitewindow").attr('src', pageURL);
	$(".nav li").removeClass("active");
	$(el).parent().addClass("active");

	ga('send', 'pageview', pageURL);
}

$(document).ready(function () {
	htmlbodyHeightUpdate()
	$( window ).resize(function() {
		htmlbodyHeightUpdate()
	});
	$( window ).scroll(function() {
		height2 = $('.main').height()
			htmlbodyHeightUpdate()
	});

	// $('#PremiumNative_Desktop').on('click', function(){
 //    	$("#sitewindow").attr('src',"bcpdemo_gqbmw.html");
 //    	$("#sitewindow").css("width", "80%");
 //    	$("#sitewindow").css("height", "80%");
 //    	$("#PremiumNative_Mobile").parent().removeClass("active");
	// });
	// $('#PremiumNative_Mobile').on('click', function(){
	// 	$("#sitewindow").attr('src',"bcpdemo_gqbmw.html");
 //    	$("#sitewindow").css("width", "400px");
 //    	$("#sitewindow").css("height", "80%");
 //    	$("#PremiumNative_Mobile").parent().addClass("active");
	// });
	// $('#AMP').on('click', function(){
	// 	$("#sitewindow").attr('src',"bcpdemo_ampfocus.html");
 //    	$("#sitewindow").css("width", "400px");
 //    	$("#sitewindow").css("height", "80%");
	// });
	// $('#FacebookIA').on('click', function(){
	// 	$("#sitewindow").attr('src',"bcpdemo_fbiaarticle.html");
 //    	$("#sitewindow").css("width", "420px");
 //    	$("#sitewindow").css("height", "80%");
	// });
	// $('#Newsletters').on('click', function(){
	// 	$("#sitewindow").attr('src',"bcpdemo_newsletteradweek.html");
 //    	$("#sitewindow").css("width", "70%");
 //    	$("#sitewindow").css("height", "80%");
	// });


	// document.domain = "www.gq.com";
	// console.log("doc domain: ", document.domain);
});

// $(function(){
//     $('#sitewindow').on('load', function(){
//         var myIframe = document.getElementById("sitewindow");
//         var script = myIframe.contentWindow.document.createElement("script");
// 		script.type = "text/javascript";
// 		script.charset = "UTF-8";
// 		script.src = "http://cdn.mediavoice.com/nativeads/script/demopolargo/brandmeasure.js?instance=eb806b8b2a9640b3b4aff8baa7411017";
// 		myIframe.contentWindow.document.body.appendChild(script);
// 		console.log("iframe doc window: ", myIframe.contentWindow.document.body);
//     });
// });