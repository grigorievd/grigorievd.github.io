$(document).ready(function() {
	var $win = $(window);
	var winHeight = $(window).height();

	function isInView($el, scrollTop){
		var elTop = $el.offset().top;
		return scrollTop <= elTop + $el.outerHeight() && scrollTop + winHeight >= elTop;
	}

	var isTouchDevice = (('ontouchstart' in window)
	        || (navigator.MaxTouchPoints > 0)
	        || (navigator.msMaxTouchPoints > 0));
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isTouchDevice = true;

		$('body').addClass('touch');
	} else {
		isTouchDevice = false;
	}

	//lottie
	// var animation = ($(window).width() >= 768) ? animationData : animationMob;

	var params = {
	    container: document.getElementById('lottie'),
	    renderer: 'svg',
	    loop: true,
	    autoplay: true,
	    animationData: $('.lottie2').length ? animationData2 : animationData
	};

	// console.log(animationData2);
	// console.log($('.lottie2').length);

	if($('#lottie').length) var anim = lottie.loadAnimation(params);

	//on scroll
	$win.scroll(function(){
		var scrolled = $(window).scrollTop();

        //animated
        $('.animated').each(function(){
			if(isInView($(this), scrolled)) {
				// $(window).trigger('resize');
				$(this).addClass('in-view');
			}
		})

		//header
		if(scrolled >= $('.section.hero').offset().top+200) {
			$('.header-copy').addClass('fixed');
			if($('#lottie').length) anim.pause();
		} else {
			$('.header-copy').removeClass('fixed');
			if($('#lottie').length) anim.play();
		}

		$('.section').each(function(index, el) {
			var $section = $(this),
				sectionId = $section.data('section');

			if(isInView($section,scrolled-250)) {
    			$section.addClass('in-view');
    		} else {
    			$section.removeClass('in-view');
    		}

    		sectionId = $('.section.in-view').last().data('section');

    		$('.menu li a').removeClass('active');
    		$('.menu li a[data-section="'+ sectionId +'"]').addClass('active');
		});
	});

	//menu
	$('.menu li a').click(function(event) {
		event.preventDefault();

		var top = $('.section[data-section="'+ $(this).data('section') +'"]').offset().top;
		var offset = $(this).data('section') == 'budbo' ? 0 : $('.header-copy').outerHeight();

		$('html, body').stop().animate({
            scrollTop: top-offset
        }, 1000);
	});

	$(window).trigger('scroll');

	//slider
	var controller = new ScrollMagic.Controller();

	var sliderTL = new TimelineMax({delay:0}).pause();

	sliderTL
		// .staggerTo('.earth-diagram_globe',0.5,{className:"+=show"})
		.addLabel('start')
		.staggerTo($('.slider_content li'), 5, {
	    	className:"+=show",
	    	onUpdate: function(e) {
	    		// console.log(e);
	    		// $('.slider_content li').removeClass('show')
	    	},
	    	onStart: function(){
	    		$('.slider_content li').removeClass('show')
	    	}
	    }, 5, 'start')
	    .to($('.slider_slides'), 5, {
	    	className:"+=show1"
	    },'start')
	    .to($('.slider_slides'), 5, {
	    	className:"+=show2"
	    },'start+=5')
	    .to($('.slider_slides'), 5, {
	    	className:"+=show3"
	    },'start+=10')

	var sliderSM = new ScrollMagic.Scene({triggerHook: 0, triggerElement: '.slider-trigger', duration: 4000})
	.setPin('.slider-wrap')
	.addTo(controller).on("progress", function (state) {

		// console.log(state.progress);
		sliderTL.progress(state.progress);
		// $('.s-hero_animated-graphics_scroll-progress span').width(state.progress*100+'%');

	})
	//slider

	//scrolling
	// if(!isTouchDevice) {
	// 	var halfDuration = 0.7;

	// 	var windowHeight = $(window).height();
 //        var windowMiddle = windowHeight / 2;
 //        var Scrollbar = window.Scrollbar;
	// 	var scrollbar = Scrollbar.init(document.querySelector('.scroller'), { speed: 1 });
	// 	window.scrollbar = scrollbar;
	// 	var scrollbarLimit = scrollbar.limit.y + windowHeight;

	// 	/* slider */
	// 	var verticalSlider = new VerticalSlider($('.slider_content'));
	// 	verticalSlider.init();
	// 	var canLock = true;
	// 	var inSwiper = false;
	// 	/* slider */

	// 	scrollbar.addListener(function (status) {
	// 	    var scrollbarTop = scrollbar.scrollTop;
	//         var scrollbarLimit = scrollbarLimit;
	//         var scrollbarBottom = scrollbarTop + windowHeight;
	//         var scrollbarMiddle = scrollbarTop + windowMiddle;

	//         /* in view */
	//         $('.animated').each(function(){
	        	
	//         	var $target = $(this);
	//         	var scrollBottom = scrollbarBottom;
	//         	var elementOffset = $target.offset().top + scrollbar.scrollTop;
	//         	var elementLimit = elementOffset + $target.outerHeight();

	//         	var inview = (scrollBottom >= elementOffset && scrollbarTop <= elementLimit);

	//         	if (inview) {
	//                 $target.addClass('in-view');
	//             } else {
	//             }
	            
	// 		})
	// 		/* in view */

	// 		/* header */
	// 		if(scrollbarTop >= ($('.section.hero').offset().top+scrollbarTop)+200) {
	// 			$('.header-copy').addClass('fixed');
	// 			if($('#lottie').length) anim.pause();
	// 		} else {
	// 			$('.header-copy').removeClass('fixed');
	// 			if($('#lottie').length) anim.play();
	// 		}
	// 		/* header */

	// 		/* slider */
	//             /*if(scrollbarTop >= 1625 && canLock && !inSwiper) {
	// 		    	canLock = false;
	// 		    	$('html').addClass('scroll-paused');
	// 		    	scrollbar.unregisterEvents(/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/);
	// 		    	scrollbar.stop();
	// 		    	// scrollbar.scrollTo(0, introOffset, 300, function (scrollbar) {});
	// 		    	// console.log(23213);

	// 		    	setTimeout(function(){
	// 	    			verticalSlider.initWheel();
	// 	    		},750)
	// 		    }
	// 		    if(scrollbarTop <= 415 && !inSwiper) {
	// 		    	canLock = true;
	// 		    }*/
	// 	    /* slider */

	//         // console.log(scrollbarBottom);
	// 	});
	// }

	//vertical slider
	var getAverage = function(t, e) {
        for (var n = 0, o = t.slice(Math.max(t.length - e, 1)), r = 0; r < o.length; r++)
            n += o[r];
        return Math.ceil(n / e)
    }

	function isNumeric(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }

	function VerticalSlider($elem) {
    	this.$elem = $elem;
    	this.$items = $elem.find('li');
    	this.currentClass = 'swiper_current';
    	this.outClass = 'swiper_out';
    	this.inClass = 'swiper_in';
    	this.currentIndex = 0;
    	this.length = 3;
    	// this.horizontal = false;
    	// this.horizontalScrolled = 0;
    	this.isActive = false;

    	this.init = function(){

    	}

    	this.destroy = function() {
    		this.isActive = false;

            var t, e, n = "";
            window.removeEventListener ? t = "removeEventListener" : (t = "detachEvent",
            n = "on"),
            "DOMMouseScroll" == (e = "onwheel"in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll") ? document[t](n + "MozMousePixelScroll", this.onWheel) : document[t](n + e, this.onWheel)
        }

        this.addEventListeners = function() {
            var t, e = "";
    		window.addEventListener ? t = "addEventListener" : (t = "attachEvent", e = "on");
			var n = "onwheel"in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll"; 
			"DOMMouseScroll" == n ? document[t](e + "MozMousePixelScroll", this.onWheel) : document[t](e + n, this.onWheel);
        }

	    this.initWheel = function(){
	    	this.isActive = true;
	    	inSwiper = true;

	    	// console.log(123);

	    	this.canScroll = !0;
	    	var l = [], c = (new Date).getTime();
	    	var s = this;
	    	s.onWheel = function(t) {
		        var e = (new Date).getTime()
		          , n = (t = t || window.event).wheelDelta || -t.deltaY || -t.detail
		          , o = Math.max(-1, Math.min(1, n))
		          , r = void 0 !== t.wheelDeltaX || void 0 !== t.deltaX
		          , i = Math.abs(t.wheelDeltaX) < Math.abs(t.wheelDelta) || Math.abs(t.deltaX) < Math.abs(t.deltaY) || !r;
		        149 < l.length && l.shift(),
		        l.push(Math.abs(n));
		        var a = e - c;
		        if (c = e,
		        200 < a && (l = []),
		        s.canScroll) {
		            var u = (0,
		            getAverage)(l, 10);
		            (0,
		            getAverage)(l, 70) <= u && i && (o < 0 ? (console.log('down'), s.next()) : (console.log('up'), s.prev()));
		            
		        }
		        
		        return !1
		    }

		    var t, e = "";
    		window.addEventListener ? t = "addEventListener" : (t = "attachEvent", e = "on");
			var n = "onwheel"in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll"; 
			"DOMMouseScroll" == n ? document[t](e + "MozMousePixelScroll", this.onWheel) : document[t](e + n, this.onWheel);
	    }

	    this.prev = function(){
	    	if(this.currentIndex > 0) {
		    	this.currentIndex--;
		    	var $prev = this.$elem.find('.'+this.currentClass);
		    	var s = this;
		    	$prev
		    		.addClass(this.outClass)
		    		.removeClass(this.currentClass)
					.prev()
					.addClass(this.currentClass + ' ' + this.inClass);

				// horizontal.paused = true;
				console.log('prev')

    		} else {
    			canLock = false;
    			setTimeout(function(){
    				canLock = true;
    			},500)
    			inSwiper = false;
    			$('html').removeClass('scroll-paused')
    			scrollbar.registerEvents(/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/);
	    	// scrollbar.stop();
    			this.destroy();
    		}

	    	this.updateTimer();
	    }

	    this.next = function(){
    		if(this.currentIndex < this.length-1) {
		    	this.currentIndex++;
		    	var $prev = this.$elem.find('.'+this.currentClass);
		    	var s = this;
		    	$prev
		    		.addClass(this.outClass)
		    		.removeClass(this.currentClass)
	    			.next()
	    			.addClass(this.currentClass + ' ' + this.inClass);

				// horizontal.paused = true;

				console.log('next')
	    	} else {
	    		canLock = false;
	    		this.currentIndex = 0;
    			// setTimeout(function(){
    			// 	canLock = true;
    			// },500)
    			inSwiper = false;
    			$('html').removeClass('scroll-paused')
    			scrollbar.registerEvents(/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/);
    			// scroll.start();
    			this.destroy();
	    	}

    		this.updateTimer();
	    	
	    }

	    this.updateTimer = function(){
	    	this.canScroll = false;
	    	var s = this;
	    	setTimeout(function(){
	    		s.$items.removeClass(s.outClass + ' ' + s.inClass);
	    		s.canScroll = true;
	    	}, halfDuration*1000*2)
	    }
    }

})

$(window).load(function() {
 
});