(function() {
    templates();

    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];

    var q = function() {
        return window.NATIVEADS_QUEUE;
    };
    q().push(["setPropertyID", "NA-DANITEST-11237996"]);

    var standard_ad = { "server": "mvdirect", "id": "dc2b73ff3a184cf5b4fc5ad33517a017" };
    var inofgraphic_ad = { "server": "mvdirect", "id": "dee7b01db5bc41ed8da84b4437bc37ea" };
    var panorama_ad = { "server": "mvdirect", "id": "759b77783e0a4db18fb363dd2e1aa3be" };

    /*=========================================
    =            Utility Functions            =
    =========================================*/

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

    // rolled my own trunc
    function trunc(x, d) {
        d = Math.pow(10, d);
        return (x * d | 0) / d;
    }

    // from http://stackoverflow.com/a/11410079
    function clamp(num, min, max) {
        return num < min ? min : num > max ? max : num;
    }

    /*=======================================
    =            Spooky JS Magic            =
    =======================================*/

    /*----------  Kenny Burns  ----------*/

    function ken_burns_effect($element) {
        /* beautify ignore:start */
        /* jshint ignore:start */
        !function(a){function b(a){return a=+a,0===a||isNaN(a)?a:a>0?1:-1}function c(a){var b=new Promise(function(b,c){var d=function(e){setTimeout(function(){a&&a.data?b():e>=20?c():d(++e)},50)};d(0)});return b}function d(){o=n?(a.screen.orientation.angle||0)*j:(a.orientation||0)*j}function e(a){l.orientation.data=a;for(var b in l.orientation.callbacks)l.orientation.callbacks[b].call(this)}function f(a){l.motion.data=a;for(var b in l.motion.callbacks)l.motion.callbacks[b].call(this)}if(void 0===a.FULLTILT||null===a.FULLTILT){var g=Math.PI,h=g/2,i=2*g,j=g/180,k=180/g,l={orientation:{active:!1,callbacks:[],data:void 0},motion:{active:!1,callbacks:[],data:void 0}},m=!1,n=a.screen&&a.screen.orientation&&void 0!==a.screen.orientation.angle&&null!==a.screen.orientation.angle?!0:!1,o=(n?a.screen.orientation.angle:a.orientation||0)*j,p=h,q=g,r=i/3,s=-h,t={};t.version="0.5.3",t.getDeviceOrientation=function(a){var b=new Promise(function(b,d){var e=new t.DeviceOrientation(a);e.start();var f=new c(l.orientation);f.then(function(){b(e)})["catch"](function(){e.stop(),d("DeviceOrientation is not supported")})});return b},t.getDeviceMotion=function(a){var b=new Promise(function(b,d){var e=new t.DeviceMotion(a);e.start();var f=new c(l.motion);f.then(function(){b(e)})["catch"](function(){e.stop(),d("DeviceMotion is not supported")})});return b},t.Quaternion=function(a,c,d,e){var f;this.set=function(a,b,c,d){this.x=a||0,this.y=b||0,this.z=c||0,this.w=d||1},this.copy=function(a){this.x=a.x,this.y=a.y,this.z=a.z,this.w=a.w},this.setFromEuler=function(){var a,b,c,d,e,f,g,h,i,k,l,m;return function(n){return n=n||{},c=(n.alpha||0)*j,a=(n.beta||0)*j,b=(n.gamma||0)*j,f=c/2,d=a/2,e=b/2,g=Math.cos(d),h=Math.cos(e),i=Math.cos(f),k=Math.sin(d),l=Math.sin(e),m=Math.sin(f),this.set(k*h*i-g*l*m,g*l*i+k*h*m,g*h*m+k*l*i,g*h*i-k*l*m),this.normalize(),this}}(),this.setFromRotationMatrix=function(){var a;return function(c){return a=c.elements,this.set(.5*Math.sqrt(1+a[0]-a[4]-a[8])*b(a[7]-a[5]),.5*Math.sqrt(1-a[0]+a[4]-a[8])*b(a[2]-a[6]),.5*Math.sqrt(1-a[0]-a[4]+a[8])*b(a[3]-a[1]),.5*Math.sqrt(1+a[0]+a[4]+a[8])),this}}(),this.multiply=function(a){return f=t.Quaternion.prototype.multiplyQuaternions(this,a),this.copy(f),this},this.rotateX=function(a){return f=t.Quaternion.prototype.rotateByAxisAngle(this,[1,0,0],a),this.copy(f),this},this.rotateY=function(a){return f=t.Quaternion.prototype.rotateByAxisAngle(this,[0,1,0],a),this.copy(f),this},this.rotateZ=function(a){return f=t.Quaternion.prototype.rotateByAxisAngle(this,[0,0,1],a),this.copy(f),this},this.normalize=function(){return t.Quaternion.prototype.normalize(this)},this.set(a,c,d,e)},t.Quaternion.prototype={constructor:t.Quaternion,multiplyQuaternions:function(){var a=new t.Quaternion;return function(b,c){var d=b.x,e=b.y,f=b.z,g=b.w,h=c.x,i=c.y,j=c.z,k=c.w;return a.set(d*k+g*h+e*j-f*i,e*k+g*i+f*h-d*j,f*k+g*j+d*i-e*h,g*k-d*h-e*i-f*j),a}}(),normalize:function(a){var b=Math.sqrt(a.x*a.x+a.y*a.y+a.z*a.z+a.w*a.w);return 0===b?(a.x=0,a.y=0,a.z=0,a.w=1):(b=1/b,a.x*=b,a.y*=b,a.z*=b,a.w*=b),a},rotateByAxisAngle:function(){var a,b,c=new t.Quaternion,d=new t.Quaternion;return function(e,f,g){return a=(g||0)/2,b=Math.sin(a),d.set((f[0]||0)*b,(f[1]||0)*b,(f[2]||0)*b,Math.cos(a)),c=t.Quaternion.prototype.multiplyQuaternions(e,d),t.Quaternion.prototype.normalize(c)}}()},t.RotationMatrix=function(a,b,c,d,e,f,g,h,i){var k;this.elements=new Float32Array(9),this.identity=function(){return this.set(1,0,0,0,1,0,0,0,1),this},this.set=function(a,b,c,d,e,f,g,h,i){this.elements[0]=a||1,this.elements[1]=b||0,this.elements[2]=c||0,this.elements[3]=d||0,this.elements[4]=e||1,this.elements[5]=f||0,this.elements[6]=g||0,this.elements[7]=h||0,this.elements[8]=i||1},this.copy=function(a){this.elements[0]=a.elements[0],this.elements[1]=a.elements[1],this.elements[2]=a.elements[2],this.elements[3]=a.elements[3],this.elements[4]=a.elements[4],this.elements[5]=a.elements[5],this.elements[6]=a.elements[6],this.elements[7]=a.elements[7],this.elements[8]=a.elements[8]},this.setFromEuler=function(){var a,b,c,d,e,f,g,h,i;return function(k){return k=k||{},c=(k.alpha||0)*j,a=(k.beta||0)*j,b=(k.gamma||0)*j,d=Math.cos(a),e=Math.cos(b),f=Math.cos(c),g=Math.sin(a),h=Math.sin(b),i=Math.sin(c),this.set(f*e-i*g*h,-d*i,e*i*g+f*h,e*i+f*g*h,f*d,i*h-f*e*g,-d*h,g,d*e),this.normalize(),this}}(),this.setFromQuaternion=function(){var a,b,c,d;return function(e){return a=e.w*e.w,b=e.x*e.x,c=e.y*e.y,d=e.z*e.z,this.set(a+b-c-d,2*(e.x*e.y-e.w*e.z),2*(e.x*e.z+e.w*e.y),2*(e.x*e.y+e.w*e.z),a-b+c-d,2*(e.y*e.z-e.w*e.x),2*(e.x*e.z-e.w*e.y),2*(e.y*e.z+e.w*e.x),a-b-c+d),this}}(),this.multiply=function(a){return k=t.RotationMatrix.prototype.multiplyMatrices(this,a),this.copy(k),this},this.rotateX=function(a){return k=t.RotationMatrix.prototype.rotateByAxisAngle(this,[1,0,0],a),this.copy(k),this},this.rotateY=function(a){return k=t.RotationMatrix.prototype.rotateByAxisAngle(this,[0,1,0],a),this.copy(k),this},this.rotateZ=function(a){return k=t.RotationMatrix.prototype.rotateByAxisAngle(this,[0,0,1],a),this.copy(k),this},this.normalize=function(){return t.RotationMatrix.prototype.normalize(this)},this.set(a,b,c,d,e,f,g,h,i)},t.RotationMatrix.prototype={constructor:t.RotationMatrix,multiplyMatrices:function(){var a,b,c=new t.RotationMatrix;return function(d,e){return a=d.elements,b=e.elements,c.set(a[0]*b[0]+a[1]*b[3]+a[2]*b[6],a[0]*b[1]+a[1]*b[4]+a[2]*b[7],a[0]*b[2]+a[1]*b[5]+a[2]*b[8],a[3]*b[0]+a[4]*b[3]+a[5]*b[6],a[3]*b[1]+a[4]*b[4]+a[5]*b[7],a[3]*b[2]+a[4]*b[5]+a[5]*b[8],a[6]*b[0]+a[7]*b[3]+a[8]*b[6],a[6]*b[1]+a[7]*b[4]+a[8]*b[7],a[6]*b[2]+a[7]*b[5]+a[8]*b[8]),c}}(),normalize:function(a){var b=a.elements,c=b[0]*b[4]*b[8]-b[0]*b[5]*b[7]-b[1]*b[3]*b[8]+b[1]*b[5]*b[6]+b[2]*b[3]*b[7]-b[2]*b[4]*b[6];return b[0]/=c,b[1]/=c,b[2]/=c,b[3]/=c,b[4]/=c,b[5]/=c,b[6]/=c,b[7]/=c,b[8]/=c,a.elements=b,a},rotateByAxisAngle:function(){var a,b,c=new t.RotationMatrix,d=new t.RotationMatrix,e=!1;return function(f,g,h){return d.identity(),e=!1,a=Math.sin(h),b=Math.cos(h),1===g[0]&&0===g[1]&&0===g[2]?(e=!0,d.elements[4]=b,d.elements[5]=-a,d.elements[7]=a,d.elements[8]=b):1===g[1]&&0===g[0]&&0===g[2]?(e=!0,d.elements[0]=b,d.elements[2]=a,d.elements[6]=-a,d.elements[8]=b):1===g[2]&&0===g[0]&&0===g[1]&&(e=!0,d.elements[0]=b,d.elements[1]=-a,d.elements[3]=a,d.elements[4]=b),e?(c=t.RotationMatrix.prototype.multiplyMatrices(f,d),c=t.RotationMatrix.prototype.normalize(c)):c=f,c}}()},t.Euler=function(a,b,c){this.set=function(a,b,c){this.alpha=a||0,this.beta=b||0,this.gamma=c||0},this.copy=function(a){this.alpha=a.alpha,this.beta=a.beta,this.gamma=a.gamma},this.setFromRotationMatrix=function(){var a,b,c,d;return function(e){a=e.elements,a[8]>0?(b=Math.atan2(-a[1],a[4]),c=Math.asin(a[7]),d=Math.atan2(-a[6],a[8])):a[8]<0?(b=Math.atan2(a[1],-a[4]),c=-Math.asin(a[7]),c+=c>=0?-g:g,d=Math.atan2(a[6],-a[8])):a[6]>0?(b=Math.atan2(-a[1],a[4]),c=Math.asin(a[7]),d=-h):a[6]<0?(b=Math.atan2(a[1],-a[4]),c=-Math.asin(a[7]),c+=c>=0?-g:g,d=-h):(b=Math.atan2(a[3],a[0]),c=a[7]>0?h:-h,d=0),0>b&&(b+=i),b*=k,c*=k,d*=k,this.set(b,c,d)}}(),this.setFromQuaternion=function(){var a,b,c;return function(d){var e=d.w*d.w,f=d.x*d.x,j=d.y*d.y,l=d.z*d.z,m=e+f+j+l,n=d.w*d.x+d.y*d.z,o=1e-6;if(n>(.5-o)*m)a=2*Math.atan2(d.y,d.w),b=h,c=0;else if((-.5+o)*m>n)a=-2*Math.atan2(d.y,d.w),b=-h,c=0;else{var p=e-f+j-l,q=2*(d.w*d.z-d.x*d.y),r=e-f-j+l,s=2*(d.w*d.y-d.x*d.z);r>0?(a=Math.atan2(q,p),b=Math.asin(2*n/m),c=Math.atan2(s,r)):(a=Math.atan2(-q,-p),b=-Math.asin(2*n/m),b+=0>b?g:-g,c=Math.atan2(-s,-r))}0>a&&(a+=i),a*=k,b*=k,c*=k,this.set(a,b,c)}}(),this.rotateX=function(a){return t.Euler.prototype.rotateByAxisAngle(this,[1,0,0],a),this},this.rotateY=function(a){return t.Euler.prototype.rotateByAxisAngle(this,[0,1,0],a),this},this.rotateZ=function(a){return t.Euler.prototype.rotateByAxisAngle(this,[0,0,1],a),this},this.set(a,b,c)},t.Euler.prototype={constructor:t.Euler,rotateByAxisAngle:function(){var a=new t.RotationMatrix;return function(b,c,d){return a.setFromEuler(b),a=t.RotationMatrix.prototype.rotateByAxisAngle(a,c,d),b.setFromRotationMatrix(a),b}}()},t.DeviceOrientation=function(b){this.options=b||{};var c=0,d=200,e=0,f=10;if(this.alphaOffsetScreen=0,this.alphaOffsetDevice=void 0,"game"===this.options.type){var g=function(b){return null!==b.alpha&&(this.alphaOffsetDevice=new t.Euler(b.alpha,0,0),this.alphaOffsetDevice.rotateZ(-o),++e>=f)?void a.removeEventListener("deviceorientation",g,!1):void(++c>=d&&a.removeEventListener("deviceorientation",g,!1))}.bind(this);a.addEventListener("deviceorientation",g,!1)}else if("world"===this.options.type){var h=function(b){return b.absolute!==!0&&void 0!==b.webkitCompassAccuracy&&null!==b.webkitCompassAccuracy&&+b.webkitCompassAccuracy>=0&&+b.webkitCompassAccuracy<50&&(this.alphaOffsetDevice=new t.Euler(b.webkitCompassHeading,0,0),this.alphaOffsetDevice.rotateZ(o),this.alphaOffsetScreen=o,++e>=f)?void a.removeEventListener("deviceorientation",h,!1):void(++c>=d&&a.removeEventListener("deviceorientation",h,!1))}.bind(this);a.addEventListener("deviceorientation",h,!1)}},t.DeviceOrientation.prototype={constructor:t.DeviceOrientation,start:function(b){b&&"[object Function]"==Object.prototype.toString.call(b)&&l.orientation.callbacks.push(b),m||(n?a.screen.orientation.addEventListener("change",d,!1):a.addEventListener("orientationchange",d,!1)),l.orientation.active||(a.addEventListener("deviceorientation",e,!1),l.orientation.active=!0)},stop:function(){l.orientation.active&&(a.removeEventListener("deviceorientation",e,!1),l.orientation.active=!1)},listen:function(a){this.start(a)},getFixedFrameQuaternion:function(){var a=new t.Euler,b=new t.RotationMatrix,c=new t.Quaternion;return function(){var d=l.orientation.data||{alpha:0,beta:0,gamma:0},e=d.alpha;return this.alphaOffsetDevice&&(b.setFromEuler(this.alphaOffsetDevice),b.rotateZ(-this.alphaOffsetScreen),a.setFromRotationMatrix(b),a.alpha<0&&(a.alpha+=360),a.alpha%=360,e-=a.alpha),a.set(e,d.beta,d.gamma),c.setFromEuler(a),c}}(),getScreenAdjustedQuaternion:function(){var a;return function(){return a=this.getFixedFrameQuaternion(),a.rotateZ(-o),a}}(),getFixedFrameMatrix:function(){var a=new t.Euler,b=new t.RotationMatrix;return function(){var c=l.orientation.data||{alpha:0,beta:0,gamma:0},d=c.alpha;return this.alphaOffsetDevice&&(b.setFromEuler(this.alphaOffsetDevice),b.rotateZ(-this.alphaOffsetScreen),a.setFromRotationMatrix(b),a.alpha<0&&(a.alpha+=360),a.alpha%=360,d-=a.alpha),a.set(d,c.beta,c.gamma),b.setFromEuler(a),b}}(),getScreenAdjustedMatrix:function(){var a;return function(){return a=this.getFixedFrameMatrix(),a.rotateZ(-o),a}}(),getFixedFrameEuler:function(){var a,b=new t.Euler;return function(){return a=this.getFixedFrameMatrix(),b.setFromRotationMatrix(a),b}}(),getScreenAdjustedEuler:function(){var a,b=new t.Euler;return function(){return a=this.getScreenAdjustedMatrix(),b.setFromRotationMatrix(a),b}}(),isAbsolute:function(){return l.orientation.data&&l.orientation.data.absolute===!0?!0:!1},getLastRawEventData:function(){return l.orientation.data||{}},ALPHA:"alpha",BETA:"beta",GAMMA:"gamma"},t.DeviceMotion=function(a){this.options=a||{}},t.DeviceMotion.prototype={constructor:t.DeviceMotion,start:function(b){b&&"[object Function]"==Object.prototype.toString.call(b)&&l.motion.callbacks.push(b),m||(n?a.screen.orientation.addEventListener("change",d,!1):a.addEventListener("orientationchange",d,!1)),l.motion.active||(a.addEventListener("devicemotion",f,!1),l.motion.active=!0)},stop:function(){l.motion.active&&(a.removeEventListener("devicemotion",f,!1),l.motion.active=!1)},listen:function(a){this.start(a)},getScreenAdjustedAcceleration:function(){var a=l.motion.data&&l.motion.data.acceleration?l.motion.data.acceleration:{x:0,y:0,z:0},b={};switch(o){case p:b.x=-a.y,b.y=a.x;break;case q:b.x=-a.x,b.y=-a.y;break;case r:case s:b.x=a.y,b.y=-a.x;break;default:b.x=a.x,b.y=a.y}return b.z=a.z,b},getScreenAdjustedAccelerationIncludingGravity:function(){var a=l.motion.data&&l.motion.data.accelerationIncludingGravity?l.motion.data.accelerationIncludingGravity:{x:0,y:0,z:0},b={};switch(o){case p:b.x=-a.y,b.y=a.x;break;case q:b.x=-a.x,b.y=-a.y;break;case r:case s:b.x=a.y,b.y=-a.x;break;default:b.x=a.x,b.y=a.y}return b.z=a.z,b},getScreenAdjustedRotationRate:function(){var a=l.motion.data&&l.motion.data.rotationRate?l.motion.data.rotationRate:{alpha:0,beta:0,gamma:0},b={};switch(o){case p:b.beta=-a.gamma,b.gamma=a.beta;break;case q:b.beta=-a.beta,b.gamma=-a.gamma;break;case r:case s:b.beta=a.gamma,b.gamma=-a.beta;break;default:b.beta=a.beta,b.gamma=a.gamma}return b.alpha=a.alpha,b},getLastRawEventData:function(){return l.motion.data||{}}},a.FULLTILT=t}}(window);
        /* jshint ignore:end */
        /* beautify ignore:end */

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
    }

    /*----------  Scroll To Expand  ----------*/

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
            $element.css({ "height": "initial" });

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
                $element.css({ "height": new_h + "px" });
            } else {
                $element.css({ "height": default_h + "px" });
            }

            requestAnimationFrame(expand);
        }
        expand();
    }

    /*----------  Tap To Expand  ----------*/

    function tap_to_expand($element, time) {
        $element.css({
            "overflow": "hidden"
        });

        var sponsor_text_initial = $element.find(".plr-sponsor").first().html();
        $element.find(".plr-sponsor").html("<em>Tap</em> to learn more! <br> " + sponsor_text_initial);

        $element.find("h1").unwrap().css({ cursor: "pointer" });

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

            if (!been_clicked) $element.css({ "height": default_h + "px" });
            else $element.css({ "height": initial_h + "px" });
        }


        window.addEventListener("resize", onresize);
        $element.find("img").load(onresize);
        onresize();


        $element.css({
            "transition": time + "s",
            "height": default_h + "px"
        });

        $element.find("h1").click(function() {
            if (!been_clicked) {
                $element.css({ "height": initial_h + "px" });
                been_clicked = true;
            } else {
                $element.css({ "height": default_h + "px" });
                been_clicked = false;
            }
        });
    }










    /*==========================================
    =            Template "Classes"            =
    ==========================================*/

    /*----------  Carousel  ----------*/

    var total_carousels = 0;

    function Carousel(props) {
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
        q().push(function() {
            $carousel = $(props.location).before(interpolate_str(["",
                "<div class=\"plr-crsl-outer plr-crsl--{0}\">",
                "    <div class=\"plr-crsl-inner\">",
                "        {1}", // slots are inserted programatically here
                "    </div>",
                "</div>",
                ""
            ].join("\n"), [total_carousels, slots])).next();
        });

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
            incfaliure = function() { faliures++; };

        for (var j in props.ads) {
            q().push(["insertPreview", {
                label: interpolate_str("Carousel {0} - Slot {1}", [total_carousels, j]),
                unit: props.ads[j],
                location: interpolate_str(".plr-crsl--{0} .plr-slot--{1}", [total_carousels, j]),
                infoText: "",
                infoButtonText: "",
                template: carousel_item,
                onRender: ((props.onRender && props.onRender[j]) ? props.onRender[j] : null),
                onFill: function(data) {},
                onError: incfaliure
            }]);
        }

        // Make sure that if all the ads failed, don't even show the carousel
        if (faliures == props.ads.length) $carousel.remove();
        else total_carousels++;
    }

    /*----------  Collection  ----------*/

    var total_collections = 0;

    function Collection(props) {
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
        q().push(function() {
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
        });

        /*----------  Inject CSS  ----------*/
        // Varies depending on what style collection the user wants

        // These are the base properties that never change, so we inject them *ONCE*
        if (total_collections === 0) {
            q().push(["injectCSS", ["",
                /* On Mobile */
                "@media only screen and (max-width: 426px) {",
                "  .plr-collection p:not(:nth-child(1)) {", // hide the summary
                "    display: none; }",
                "  .plr-collection h2 {", // make font smaller on mobile
                "    font-size: 18px; }",
                "  .plr-collection .plr-img-wrapper {", // make images big on mobile
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
                ".plr-collection--{0} .plr-collection:not(:nth-child(2)) .plr-img-wrapper", // hide the image
                "{ display: none; }",
                /* Mobile */
                "@media only screen and (max-width: 426px) {",
                "    .plr-collection--{0} .plr-collection:nth-child(2) p:not(:nth-child(1))", /* For the first */
                "    { display: block; }", // show the summary
                "}"
            ].join("\n"), [total_collections]);
        } else if (props.display === "noThumb") {
            style += interpolate_str(["",
                ".plr-collection--{0} .plr-collection .plr-img-wrapper", // hide the image
                "{ display: none; }"
            ].join("\n"), [total_collections]);
        }
        // bigThumb is implied

        q().push(["injectCSS", style, "head"]);

        /*----------  Add some onRender code to the first fill  ----------*/
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
            incfaliure = function() { faliures++; };

        for (var i = 0; i < props.ads.length; i++) {
            var location = ".plr-collection--" + total_collections + " .plr-collection-anchor";
            if (i === 0) location += "--top";

            q().push(["insertPreview", {
                label: "Landing Page",
                unit: props.ads[i],
                location: location,
                infoText: "",
                infoButtonText: "",
                template: collection_item,
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
    }

    /*----------  Vertical Stack  ----------*/

    function VerticalStack(props) {
        /*
        props = {
            location: jQuery Selector | where to put the ad
            ad: Creative ID           | which creative
            onRender: function        | onRender function
            display: {                | Options related to how it looks
                thumb:    "circle"    |
                       OR "square"    |     What the thumb should look like
                       OR "none"      |
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
            template: verticalStack,
            onRender: function($element) {
                /* THUMB OPTIONS */
                var img = $element.find(".plr-img-wrapper").first();

                // circle by default
                switch (props.display.thumb) {
                    case "rectangle":
                        img.find("div").first().css({ "border-radius": "0" });
                        img.css({ "width": "100%", "padding-bottom": "50%" });
                        break;
                    case "square":
                        img.find("div").first().css({ "border-radius": "0" });
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

                if (typeof props.onRender !== "undefined") props.onRender();
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*----------  Horizontal Stack  ----------*/

    function HorizontalStack(props) {
        /*
        props = {
            location: jQuery Selector | where to put the ad
            ad: Creative ID           | which creative
            onRender: function        | onRender function
            display: {                | Options related to how it looks
                thumb:    "circle"    |
                       OR "square"    |     What the thumb should look like
                       OR "none"      |
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
            template: horizontalStack,
            onRender: function($element) {
                /* THUMB OPTIONS */
                var img = $element.find(".plr-img-wrapper").first();

                // circle by default
                switch (props.display.thumb) {
                    case "rectangle":
                        img.find("div").first().css({ "border-radius": "0" });
                        img.css({ "width": "50%", "padding-bottom": "50%" });
                        break;
                    case "square":
                        img.find("div").first().css({ "border-radius": "0" });
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

                if (typeof props.onRender !== "undefined") props.onRender();
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*----------  Twitter Carousel  ----------*/

    var total_twitter_carousels = 0;

    function TwitterCarousel(props) {
        /*
        
        props = {
            location: jQuery selector
            campaign_collection_unit: collection unit object

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
            previews_array.push({ name: "plr-tweet--" + i });
        }

        q().push(["insertPreviewCollection", {
            label: "Home",
            unit: props.campaign_collection_unit,
            location: props.location,
            previews: previews_array,
            infoText: "",
            infoButtonText: "",
            template: twtr_crsl,
            onRender: function($element) {
                if (props.show_sponsor === false) {
                    $element.find("h2").remove();
                }

                var sponsor_name = $element.find(".plr-sponsor-name").first().text();
                $element.find("h2").text("Sponsored By " + sponsor_name);

                if (props.onRender) props.onRender();
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        total_twitter_carousels++;
    }

    /*----------  360  ----------*/

    function ThreeSixty_Pano(props) {
        /*
        
        props = {
            location:  jquery selector
            unit:      unit object
        }
        
        */

        q().push(["insertPreview", {
            label: "360 Pano",
            unit: props.unit,
            location: props.location,
            infoText: "",
            infoButtonText: "",
            template: pano360,
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
    }




























    /*=======================================
    =            Insert Previews            =
    =======================================*/

    /*==========  default  ==========*/

    if (location.hash === '') {
        console.log("Load - All");


        /*----------  Vertical Stack  ----------*/

        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: standard_ad,
                display: {
                    thumb: "circle",
                    /* OR "square" OR "none" OR "rectangle" */
                    summary: true
                }
            });
        });
        /*----------  Horizontal Stack  ----------*/
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(7)",
                ad: standard_ad,
                display: {
                    thumb: "rectangle",
                    /* OR "square" OR "none" OR "rectangle" */
                    summary: true
                }
            });
        });
        /*----------  Hero  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(12)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Carousel 1  ----------*/

        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(13)",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad
                ]
            });
        });

        /*----------  Carousel 2  ----------*/

        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(15)",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                onRender: [function($element) {
                    /* DIRTY DIRTY FIX */
                    $element
                        .find(".plr-sponsored-disclosure")
                        .text("sponsored by honda");
                }],
                hero: true
            });
        });

        /*----------  In Between Article  ----------*/


        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Parallax Hero  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last p:eq(3)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {
                ken_burns_effect($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  In-Article Pullout  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last p:eq(10)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                scroll_to_expand($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Tap To Expand Article  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last p:eq(15)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                tap_to_expand($element, 1);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Tap To Expand Infographic  ----------*/

        q().push(["insertPreview", {
            label: "Landing Page",
            unit: inofgraphic_ad,
            location: ".article:last p:eq(18)",
            infoText: "",
            infoButtonText: "",
            template: infographic,
            onRender: function($element) {
                tap_to_expand($element, 2);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);

        /*----------  Collection 1 ----------*/

        q().push(function() {
            new Collection({
                location: ".bottom-anchor",
                title: "Indy racing like you’ve never seen it before!",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                display: "hero" /* OR bigThumb OR noThumb */
            });
        });
    }



    /*==========  #vstack  ==========*/
    if (location.hash == "#vstack") {
        console.log("Load - Vertical Stack");
        //rectangle
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: standard_ad,
                display: {
                    thumb: "rectangle",
                    summary: true
                }
            });
        });
        //circle
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(8)",
                ad: standard_ad,
                display: {
                    thumb: "circle",
                    summary: true
                }
            });
        });
        //square
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(13)",
                ad: standard_ad,
                display: {
                    thumb: "square",
                    summary: true
                }
            });
        });
        //none
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(16)",
                ad: standard_ad,
                display: {
                    thumb: "none",
                    summary: true
                }
            });
        });
    }
    /*==========  #hstack  ==========*/
    if (location.hash == "#hstack") {
        console.log("Load - Horizontal Stack");
        //square
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(3)",
                ad: standard_ad,
                display: {
                    thumb: "square",
                    summary: true
                }
            });
        });
        //circle
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(8)",
                ad: standard_ad,
                display: {
                    thumb: "circle",
                    summary: true
                }
            });
        });

        //none
        q().push(function() {
            new HorizontalStack({
                location: ".article:eq(0) p:eq(16)",
                ad: standard_ad,
                display: {
                    thumb: "none",
                    summary: true
                }
            });
        });
    }

    /*==========  #hero  ==========*/
    if (location.hash == "#hero") {
        console.log("Load - Hero");
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(2)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*==========  #carousel  ==========*/
    if (location.hash == "#carousel") {
        console.log("Load - Carousel");
        q().push(function() {
            new Carousel({
                location: ".article:eq(0) p:eq(8)",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad,
                    standard_ad
                ]
            });
        });
    }
    /*==========  #blog  ==========*/
    //without image
    if (location.hash == "#blog") {
        console.log("Load - Blog");
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(2)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) { $(".plr-img-wrapper").remove(); },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    //with image
    if (location.hash == "#blog") {
        console.log("Load - Blog");
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:last",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*==========  #collection  ==========*/
    if (location.hash == "#collection") {
        console.log("Load - Collection");
        q().push(function() {
            new Collection({
                location: ".bottom-anchor",
                title: "Indy racing like you’ve never seen it before!",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                display: "bigThumb" /* OR bigThumb OR noThumb */
            });
        });
        q().push(function() {
            new Collection({
                location: ".article:last",
                title: "Indy racing like you’ve never seen it before!",
                ads: [
                    standard_ad,
                    standard_ad,
                    standard_ad
                ],
                display: "hero" /* OR bigThumb OR noThumb */
            });
        });

    }
    /*==========  #interactive  ==========*/
    if (location.hash == "#interactive") {
        console.log("Load - Interactive");
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(3)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {
                ken_burns_effect($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*==========  #expandable  ==========*/
    if (location.hash == "#expandable") {
        console.log("Load - Expandable");
        //scroll-to-expand
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(2)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                scroll_to_expand($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
        //tap-to-expand
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(5)",
            infoText: "",
            infoButtonText: "",
            template: inbetween_article,
            onRender: function($element) {
                tap_to_expand($element, 1);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
        //infographic
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: inofgraphic_ad,
            location: ".article p:eq(8)",
            infoText: "",
            infoButtonText: "",
            template: infographic,
            onRender: function($element) {
                tap_to_expand($element, 2);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }
    /*==========  #video  ==========*/
    if (location.hash == "#video") {
        console.log("Load - Video");

    }

    /*==========  #lab  ==========*/
    if (location.hash == "#lab") {
        console.log("Load - Dexter's Lab");

        /*----------  Tweets Standard  ----------*/

        q().push(function() {
            new TwitterCarousel({
                location: ".article:eq(0) p:eq(3)",
                campaign_collection_unit: {
                    "server": "mvdirect",
                    "id": "collection_a478cfee2ce749c78c9d020ce0cce377"
                },
                num_tweets: 12,
                show_sponsor: true
            });
        });

        /*----------  Tweets Text Only  ----------*/

        q().push(function() {
            new TwitterCarousel({
                location: ".article:eq(0) p:eq(6)",
                campaign_collection_unit: {
                    "server": "mvdirect",
                    "id": "collection_30d7536d97b54f37b2800ab8869fcc38"
                },
                num_tweets: 12,
                show_sponsor: true
            });
        });

        /*----------  360 Panorama  ----------*/
        q().push(function() {
            new ThreeSixty_Pano({
                location: ".article:first p:eq(10)",
                unit: panorama_ad
            });
        });

    }

    /*==========  #pratik  ==========*/
    if (location.hash == "#pratik") {
        console.log("Load - helloPratik");
        q().push(function() {
            new VerticalStack({
                location: ".article:eq(0) p:eq(2)",
                ad: standard_ad,
                display: {
                    thumb: "rectangle",
                    summary: true
                }
            });
        });
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article:eq(0) p:eq(8)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {},
            onFill: function(data) {},
            onError: function(error) {}
        }]);
        q().push(["insertPreview", {
            label: "Landing Page",
            unit: standard_ad,
            location: ".article p:eq(13)",
            infoText: "",
            infoButtonText: "",
            template: imageHero,
            onRender: function($element) {
                ken_burns_effect($element);
            },
            onFill: function(data) {},
            onError: function(error) {}
        }]);
    }













    /*=================================
    =            Templates            =
    =================================*/

    /* jshint ignore:start */
    function templates() {
        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-fullw">
          <a href="{{link}}" rel="nofollow">
            <div class="plr-img-wrapper">
              <div style="background: url('{{getThumbHref width=1500 height=1000}}') no-repeat center center;"></div>
            </div>
            <div class="plr-contents" style="">
              <h1>{{title}}</h1>
              <p>{{summary}}</p>
            </div>
            <div class="plr-sponsored">Sponsor Content</div>
          </a>
        </div>

        */

        imageHero = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, options, functionType = "function",
                escapeExpression = this.escapeExpression,
                helperMissing = helpers.helperMissing;
            buffer += "<div class=\"plr-fullw\">\n  <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\" rel=\"nofollow\">\n    <div class=\"plr-img-wrapper\">\n      <div style=\"background: url('";
            options = { hash: { 'width': (1500), 'height': (1000) }, data: data };
            buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) + "') no-repeat center center;\"></div>\n    </div>\n    <div class=\"plr-contents\" style=\"\">\n      <h1>";
            if (stack2 = helpers.title) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.title;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</h1>\n      <p>";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n    </div>\n    <div class=\"plr-sponsored\">Sponsor Content</div>\n  </a>\n</div>";
            return buffer;
        };


        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

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

        verticalStack = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-halfw\">\n            <a href=\"";
            if (stack1 = helpers.link) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\" style=\"border-bottom: none;box-shadow: none;\">\n                <div class=\"plr-img-wrapper\">\n                    <div style=\"background: url('";
            if (stack1 = helpers.getThumbHref) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.getThumbHref;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "') no-repeat center center;\"></div>\n                </div>\n                <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n                <h2>";
            if (stack1 = helpers.title) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h2>\n                <p style=\"color: #666666;margin-bottom: 0;\">";
            if (stack1 = helpers.summary) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.summary;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</p>\n            </a>\n        </div>";
            return buffer;
        };
        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

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

        horizontalStack = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, options, functionType = "function",
                escapeExpression = this.escapeExpression,
                helperMissing = helpers.helperMissing;
            buffer += "        <div class=\"plr-hstack\">\n                        <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\" style=\"border-bottom: none;box-shadow: none;\">\n                                                      <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n                            <h2>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h2>\n                            <div class=\"plr-img-wrapper\">\n                                <div style=\"background: url('";
            options = { hash: { 'width': (1500), 'height': (1000) }, data: data };
            buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) + "') no-repeat center center;\"></div>\n                            </div>\n\n                            <p style=\"color: #666666;margin-bottom: 0;\">";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n                        </a>\n                    </div>";
            return buffer;
        };

        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

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

        inbetween_article = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-btwn-art\">\n  <div class=\"topic\">sponsored</div>\n  <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\"><h1>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h1></a>\n    <div class=\"plr-sponsor\">Presented by <b>" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</b></div>\n    <div class=\"plr-img-wrapper\">\n        <div style=\"background: url('";
            if (stack2 = helpers.getThumbHref) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.getThumbHref;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "') no-repeat center center;\"></div>\n    </div>\n    <p>";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n    <a href=\"";
            if (stack2 = helpers.link) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.link;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "\" style=\"text-decoration: underline;\">\n        <p>Continue Reading...</p>\n    </a>\n</div>";
            return buffer;
        };

        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

        <div class="plr-collection">
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

        collection_item = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-collection\">\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\">\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
            if (stack1 = helpers.getThumbHref) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.getThumbHref;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "') no-repeat center center;\"></div>\n        </div>\n        <h2>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h2>\n    </a>\n    <p>";
            if (stack1 = helpers.summary) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.summary;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</p>\n    <div class=\"sponsor-logo-href\" style=\"display:none;\">" + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.logo)), stack1 == null || stack1 === false ? stack1 : stack1.href)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n</div>";
            return buffer;
        };




        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

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

        carousel_item = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, options, functionType = "function",
                escapeExpression = this.escapeExpression,
                helperMissing = helpers.helperMissing;
            buffer += "<div class=\"plr-crsl-item\">\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\" style=\"border-bottom: none;box-shadow: none;\">\n        <div class=\"plr-img-wrapper\">\n            <div style=\"background: url('";
            options = { hash: { 'width': (1500), 'height': (1000) }, data: data };
            buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) + "') no-repeat center center;\"></div>\n        </div>\n        <div class=\"plr-sponsored-disclosure\">sponsor content</div>\n        <h2>";
            if (stack2 = helpers.title) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.title;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</h2>\n        <p style=\"color: #666666;margin-bottom: 0;\">";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n    </a>\n</div>";
            return buffer;
        };

        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

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

        twtr_crsl = function(Handlebars, depth0, helpers, partials, data) {
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
                buffer += "\n            <div class=\"plr-twtr-crsl-slot plr-tweet--" + escapeExpression(((stack1 = ((stack1 = data), stack1 == null || stack1 === false ? stack1 : stack1.index)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "\">\n                <blockquote class=\"twitter-tweet\" data-lang=\"en\">\n                    <a href=\"";
                if (stack2 = helpers.link) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                    stack2 = depth0.link;
                    stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
                }
                buffer += escapeExpression(stack2) + "\"></a>\n                </blockquote>\n                <script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n            </div>\n            <div class=\"plr-sponsor-name\" style=\"display:none\">" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n            ";
                return buffer;
            }
            buffer += "<div class=\"plr-twtr-crsl\">\n    <h1>#StuporTuesday</h1>\n    <div class=\"plr-twtr-crsl-outer\">\n        <div class=\"plr-twtr-crsl-inner\">\n            ";
            stack1 = helpers.each.call(depth0, depth0.creatives, { hash: {}, inverse: self.noop, fn: self.program(1, program1, data), data: data });
            if (stack1 || stack1 === 0) { buffer += stack1; }
            buffer += "\n        </div>\n    </div>\n    <h2>Sponsored By Our Sponsors</h2>\n</div>";
            return buffer;
        };


        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

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

        infographic = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, options, functionType = "function",
                escapeExpression = this.escapeExpression,
                helperMissing = helpers.helperMissing;
            buffer += "<div class=\"plr-btwn-art\">\n    <div class=\"topic\">sponsored</div>\n    <a href=\"";
            if (stack1 = helpers.link) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.link;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\"><h1>";
            if (stack1 = helpers.title) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else {
                stack1 = depth0.title;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "</h1></a>\n    <div class=\"plr-sponsor\">Presented by <b>" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</b></div>\n    <img src=\"";
            options = { hash: { 'width': (425) }, data: data };
            buffer += escapeExpression(((stack1 = helpers.getThumbHref || depth0.getThumbHref), stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "getThumbHref", options))) + "\" style=\"width:100%\">\n    <p>";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</p>\n    <a href=\"";
            if (stack2 = helpers.link) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.link;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "\" style=\"text-decoration: underline;\">\n        <p>Learn More...</p>\n    </a>\n</div>";
            return buffer;
        };




        /*

           This function represents a pre-compiled Handlebars template. Pre-compiled
           templates are not pretty, but they provide a very significant performance
           boost, especially on mobile devices. For more information, see
           http://handlebarsjs.com/precompilation.html.

           Note that this code has been generated from the following markup:

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

        pano360 = function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [4, '>= 1.0.0'];
            helpers = this.merge(helpers, Handlebars.helpers);
            data = data || {};
            var buffer = "",
                stack1, stack2, functionType = "function",
                escapeExpression = this.escapeExpression;
            buffer += "<div class=\"plr-360\">\n    <div class=\"plr-pnlm-wrapper\"></div>\n    <div class=\"plr-ad-info\" style=\"display:none;\">\n        <div class=\"sponsor-name\">" + escapeExpression(((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.name)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n        <div class=\"sponsor-logo\">" + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor), stack1 == null || stack1 === false ? stack1 : stack1.logo)), stack1 == null || stack1 === false ? stack1 : stack1.href)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n        <div class=\"link\">";
            if (stack2 = helpers.link) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.link;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</div>\n        <div class=\"title\">";
            if (stack2 = helpers.title) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.title;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</div>\n        <div class=\"summary\">";
            if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.summary;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</div>\n        <div class=\"pnlm-img-url\">" + escapeExpression(((stack1 = ((stack1 = depth0.custom), stack1 == null || stack1 === false ? stack1 : stack1.panorama_img_url)), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n        <div class=\"preview-img-url\">";
            if (stack2 = helpers.getThumbHref) { stack2 = stack2.call(depth0, { hash: {}, data: data }); } else {
                stack2 = depth0.getThumbHref;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + "</div>\n    </div>\n</div>";
            return buffer;
        };







    }
    /* jshint ignore:end */
})();


(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = d.location.protocol;
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.type = "text/javascript";
    js.async = true;
    js.src = ((p == "https:") ? p : "http:") + "//plugin.mediavoice.com/plugin.js";
    fjs.parentNode.insertBefore(js, fjs);

    // Inject jQuery
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
})(document, "script", "nativeads-plugin");
