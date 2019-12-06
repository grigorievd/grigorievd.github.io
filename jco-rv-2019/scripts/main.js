// import locomotiveScroll from 'locomotive-scroll';

$(document).ready(function() {

	var $win = $(window),
		winHeight = $win.outerHeight();

	/* Footer Share Animation */
	$('.share-click-ico').on('click', function() {
	  $('.foot-social').slideToggle();
	  $('.foot-social').toggleClass("active");
	});
	/* Scroll Up */
	$('.back-to-top').on('click', function(e) {
		e.preventDefault();
	  $('html, body').stop().animate({
	      scrollTop: 0
	  }, 1000);
	});

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

	function isInView($el, scrollTop){
		var elTop = $el.offset().top;
		return scrollTop <= elTop + $el.outerHeight() && scrollTop + winHeight >= elTop;
	}

	var getAverage = function(t, e) {
        for (var n = 0, o = t.slice(Math.max(t.length - e, 1)), r = 0; r < o.length; r++)
            n += o[r];
        return Math.ceil(n / e)
    }

	setTimeout(function(){
		$('.loader').fadeOut();
		setTimeout(function(){
			$('body').addClass('loaded');
		},300)
		$('.hero video')[0].play();
	}, 1000)

	//festivals

	var loadedFestivals = 1;

	var slickOptions = {
		initialSlide:1,
		variableWidth: true,
		centerMode: true,
		slidesToShow: 1,
		centerPadding: '100px',
		arrows: false
	};

	var festivalsCopy = {
		setouchi: 'Setouchi Triennale',
		okayama: 'Triennale Okayama <br> Art Summi',
		'oku-noto': 'Oku-Noto Triennale'
	};

	$('.festival-slider_slides').slick(slickOptions);

	$('.festivals-nav li').click(function(){
		var festival = $(this).data('festival'),
			index = $(this).index();

		if($(this).hasClass('loaded')) {
			Scroll.scrollIntoView($('.festival-'+festival)[0])
		} else {
			$.ajax({
			  method: "GET",
			  url: festival + '.html'
			}).done(function( reponse ) {
				$('.festivals').append(reponse);
				$('.festivals .festival:not(:last-child) .festival-next').hide();
				$('.festival-'+festival).find('.festival_heading_number').text('0' + ++loadedFestivals);
				// $('.festival-'+festival).find('.festival_heading').addClass('in-view');
				$('.festival-'+festival).find('.festival-slider_slides').on('init', function(slick) {
					var cursor = new Mouse($('.festival-'+festival + ' .festival-slider')).init();
		        }).slick(slickOptions);
				Scroll.scrollIntoView($('.festival-'+festival)[0])
				$('.festivals-nav li').eq(index).addClass('loaded');
				$('.festival-next[data-festival="'+ festival +'"]').addClass('loaded');
				if($('.festivals-nav li:not(.loaded)').length) {
					$('.festival-'+festival)
						.find('.festival-next')
						.data('festival', $('.festivals-nav li:not(.loaded)').eq(0).data('festival'))
						.find('.festival-next_title')
						.html(festivalsCopy[$('.festivals-nav li:not(.loaded)').eq(0).data('festival')])
				} else {
					$('.festival-'+festival).addClass('festival--last').find('.festival-next').hide()
				}

				updatePath2();
				setTimeout(function(){
					updatePath2();
				},1000)
			});
		}		
	});

	var canceledNext = true;
	var events = [],
		index = -1;

	$('body').on('click'+ isTouchDevice ? ' mouseenter':'', '.festival-next', function(e){
		canceledNext = false;
		events.push(false);
		index++;
		var $rollover = $(this);

		if($(this).hasClass('loaded')) {
			Scroll.scrollIntoView($('.festival-'+$(this).data('festival'))[0])
		} else {
			if(e.type == "mouseenter") {
				setTimeout(function(){
					console.log(events[index]);
					if (!events[index]) {
						loadNext();
					}
				}, 1950)
			} else {
				loadNext();
			}
		}

		function loadNext() {
			var festival = $('.festivals-nav li:not(.loaded)').eq(0).data('festival');
			// var $rollover = $(this);

			$rollover.slideUp(400).addClass('done');

			$.ajax({
			  method: "GET",
			  url: festival + '.html'
			}).done(function( reponse ) {
				$('.festivals').append(reponse);
				$('.festival-'+festival).find('.festival_heading_number').text('0' + ++loadedFestivals);
				// $('.festival-'+festival).find('.festival_heading').addClass('in-view');
				$('.festival-'+festival).find('.festival-slider_slides').on('init', function(slick) {
					var cursor = new Mouse($('.festival-'+festival + ' .festival-slider')).init();
		        }).slick(slickOptions);
		        setTimeout(function(){
					Scroll.scrollIntoView($('.festival-'+festival)[0])
		        },400)
				// Scroll.scrollIntoView($('.festival-'+festival)[0])
				$('.festivals-nav li[data-festival="'+ festival +'"]').addClass('loaded');
				$rollover.addClass('loaded');
				if($('.festivals-nav li:not(.loaded)').length) {
					$('.festival-'+festival)
						.find('.festival-next')
						.data('festival', $('.festivals-nav li:not(.loaded)').eq(0).data('festival'))
						.find('.festival-next_title')
						.html(festivalsCopy[$('.festivals-nav li:not(.loaded)').eq(0).data('festival')])
				} else {
					$('.festival-'+festival).addClass('festival--last').find('.festival-next').hide()
				}

				updatePath2();
				setTimeout(function(){
					updatePath2();
				},1000)
			});
		}
	});

	$('body').on('mouseleave', '.festival-next', function(e){
		canceledNext =  true;
		events[index] = true;
	})

	var $window = $(window);

	function hovertitle(elem, split){
      $(elem).mouseenter(function() {
        if ($(this).hasClass("active")) {
          var me = new TimelineMax();
              me.staggerTo($(split.chars),0.5,{opacity:0.4},0.03,0)
                .staggerTo($(split.chars),0.5,{opacity:0.8},0.03,0.3)
                .to($(elem).find(".linkring"),0.3,{borderColor: "white"},0)
        }
      });

      // When the mouse leaves the item, set its fill color to black:
      $(elem).mouseleave(function() {
        if ($(this).hasClass("active")) {
          var me = new TimelineMax();
              me.to($(elem).find(".linkring"),0.3,{borderColor: "#474758"},0)
                .staggerTo($(split.chars),0.5,{opacity:1},0.03,0.3)
        }
      });
    }

	function Mouse($el){
		this.$el = $el;
		this.$cursor = $('.festival-slider_cursor', $el);
        this.index = 0;
        this.isLeaving = !1;
        this.isHover = !1;
		this.mouse = {
            x: 0,
            y: this.$el.height() / 2
        };
		this.realMouse = {
            x: 0,
            y: this.$el.height() / 2
        };

        this.init = function() {
            var i = this;
            this.isAvailable = !0,

            window.isMobile || (this.$el.on('mouseenter', function() {
                return i.mouseenter()
            }),
            this.$el.on('mouseleave', function() {
                return i.mouseleave()
            }),
            $window.on('mousemove', function(t) {
                return i.mousemove(t)
            }),
            this.render())
        };

	    this.mouseenter = function() {
	        // this.$el.addClass(CLASS.ISHOVER),
	        this.isHover = !0
	    }
        this.mouseleave = function() {
            var t = this;
            this.isLeaving = !0,
            this.isHover = !1,
            TweenMax.to(this.realMouse, 1, {
                x: 0,
                y: 0,
                onComplete: function() {
                    t.isLeaving = !1
                    // t.$el.removeClass(CLASS.ISHOVER)
                }
            })
        }
        this.mousemove = function(t) {
            this.isHover && (this.realMouse = {
                x: t.clientX - this.$el.offset().left - this.$el.width() / 2,
                y: t.clientY - this.$el.offset().top - this.$el.height() / 2
            })
        }
        this.render = function() {
            var t = this;
            this.raf = requestAnimationFrame(function() {
                return t.render()
            }),
            (this.isHover || this.isLeaving) && (this.mouse.x = this.lerp(this.mouse.x, this.realMouse.x, .2),
            this.mouse.y = this.lerp(this.mouse.y, this.realMouse.y, .2),
            this.$cursor.css({
                "-webkit-transform": "translate3d(".concat(this.mouse.x, "px, ").concat(this.mouse.y, "px, 0px)"),
                "-ms-transform": "translate3d(".concat(this.mouse.x, "px, ").concat(this.mouse.y, "px, 0px)"),
                transform: "translate3d(".concat(this.mouse.x, "px, ").concat(this.mouse.y, "px, 0px)")
            }))
        }
        this.lerp = function(t, e, n) {
            return (1 - n) * t + n * e
        }
    }

    var cursor = new Mouse($('.festival-slider')).init();

	var Scrollbar = window.Scrollbar;

	var $hero = $('.hero');
	var $part5 = $('.part-5');

	//DESKTOP

	if(!isTouchDevice) {
		function SpeedPlugin() {
		  Scrollbar.ScrollbarPlugin.apply(this, arguments);
		}

		SpeedPlugin.prototype = Object.create(Scrollbar.ScrollbarPlugin.prototype);

		SpeedPlugin.prototype.transformDelta = function(delta, fromEvent) {
		  // if (fromEvent.type !== 'touchend') {
		  //   return delta;
		  // }
			
			var speed = !heroAnimated ? 0.6 : this.options.speed;

			// console.log(speed);

		  return {
		    x: delta.x * speed,
		    y: delta.y * speed,
		  };
		};

		SpeedPlugin.pluginName = 'setSpeed';
		SpeedPlugin.defaultOptions = {
		  speed: 0.5,
		};

		function FilterEventPlugin() {
		  Scrollbar.ScrollbarPlugin.apply(this, arguments);
		}

		FilterEventPlugin.prototype = Object.create(Scrollbar.ScrollbarPlugin.prototype);

		FilterEventPlugin.prototype.transformDelta = function(delta, fromEvent) {
		  if (this.shouldBlockEvent(fromEvent)) {
		    return { x: 0, y: 0 };
		  }
		  return delta;
		};

		FilterEventPlugin.prototype.shouldBlockEvent = function(fromEvent) {
			// console.log(fromEvent)
			// console.log(this.options.blacklist);
		  return this.options.blacklist.some(function(rule) {
		  	// console.log(fromEvent.type.match(rule))
		    return fromEvent.type.match(rule);
		  });
		};

		FilterEventPlugin.pluginName = 'filterEvent';
		FilterEventPlugin.defaultOptions = {
		  blacklist: [],
		};

		// Mobile plugin
		Scrollbar.use(SpeedPlugin);
		Scrollbar.use(FilterEventPlugin);

		var Scroll = Scrollbar.init(document.querySelector('.scroller'), {
			delegateTo: document.body, 
			damping: 0.1,
			plugins: {
				setSpeed: {
					speed: 0
				},
				filterEvent: {
				  blacklist: []
				},
				overscroll: {
					effect: 'glow'
				}
			}
		});

		var heroAnimated = false;
		var heroAnimating = false;

		var points = [0.29,0.53];

		Scroll.addListener(function(s) {
			var scrollTop = Math.abs(s.offset.y);

		    if($('.festivals').offset().top-35 < 0 && $('.festivals').offset().top + $('.festivals').height()-200 > 0) {
				$('.festivals-nav').addClass('active');
			} else {
				$('.festivals-nav').removeClass('active');
			}

			if(scrollTop > 50) {
				$hero.addClass('animate-content');
			} else {
				$hero.removeClass('animate-content');
			}

			if(scrollTop > 100) {
				if(!$hero.hasClass('clipped')) {
					$hero.addClass('clipped');
					$('video', $hero)[0].pause();
				}
			} else {
				if($hero.hasClass('clipped')) {
					$hero.removeClass('clipped');
					$('video', $hero)[0].play();
				}
			}

			if(scrollTop >= 1000) {
				// heroAnimated = true;
			}

			//path
			var pathOneOffset = ($window.height()/2-90) / (scrollTop + $('.festivals').offset().top);

			var pathOneLimit = scrollTop + $('.festivals').offset().top,
				patheOneProgress = scrollTop*100/pathOneLimit/100+pathOneOffset;

			var pathTwoLimit = scrollTop + $('.part-4').offset().top-30,
				pathTwoProgress = (scrollTop - pathTwoLimit) * 100 / ($('.part-4').height()+$('.part-5').outerHeight()/2) / 100*0.9;

			patheOneProgress >= 0.996 ? $('.hero .inner').addClass('hidden') : $('.hero .inner').removeClass('hidden');
			(pathTwoProgress >= 0.75 && !$part5.hasClass('clipped')) ? Scroll.scrollTo(0, scrollTop+$part5.offset().top-30, 700, function (scrollbar) {}) : false;
			heroCircle.progress(patheOneProgress >= 1 ? 1 : patheOneProgress);
			circleTween2.progress(pathTwoProgress >= 1 ? 1 : pathTwoProgress);

			if($part5.offset().top-130 < 0 && $part5.offset().top + $part5.outerHeight()-200 > 0) {
				$part5.addClass('clipped');
			}

			//0.29
			//0.53
			//0.84

			for (var i = 0; i < points.length; i++) {
			  if(patheOneProgress >= points[i] - 0.02 && patheOneProgress <= points[i] + 0.02) {
			  	$('.inner').addClass('active');
			  	break;
			  } else {
			  	$('.inner').removeClass('active');
			  }
			}

			//in view animation
			$('.animated').each(function(){
				var $elem = $(this);
				var offset = $elem.data('offset') ? parseInt( $elem.data('offset')) : 0;
				if($elem.offset().top-$window.height()/2-offset < 0 && $elem.offset().top + $elem.height()-200 > 0) {
					$(this).addClass('in-view');
				} else {
					// $(this).removeClass('in-view');
				}
			}) 

			//festivals

			if(Scroll.isVisible($('.festivals')[0])) {
				$('.festival').each(function(i, elem){
					var $festival = $(this),
						festivalTop = $festival.offset().top;

					if(festivalTop-$window.height()/2-200 < 0 && festivalTop + $festival.height() > 0) {
						$('.festivals').css('background-color', $festival.data('section-color'));
						$('.festivals-nav').css('background-color', $festival.data('nav-color'))
							.find('li')
							.removeClass('active')
							.addBack()
							.find('[data-festival="'+ $festival.data('festival') +'"]')
							.addClass('active');

						return false;
					}
				})
			}

			//map

			if(scrollTop >= mapOffsetTop-100 && scrollTop <= mapOffsetTop+100 && canLock && !inSwiper) {
		    	canLock = false;
		    	$('html').addClass('scroll-paused');
				$('.inner').addClass('opacity');
				$('.map-content').addClass('active');

		    	// Scroll.unregisterEvents(/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/);
		  //   	Scroll.updatePluginOptions('filterEvent', {
				//   blacklist: [/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/],
				// });
				Scroll.options.plugins.filterEvent.blacklist = [/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/];
		    	// Scroll.stop();
		    	Scroll.setMomentum(0, 0)
		    	Scroll.scrollTo(0, mapOffsetTop, 300, function (scrollbar) {});

		    	setTimeout(function(){
	    			verticalSlider.initWheel();
	    		},750)
		    }

		});
		
		Scroll.setMomentum(0, 0)
		Scroll.scrollTo(0, 1, 300, function (scrollbar) {});

		//map
		var mapOffsetTop = $('.map-wrap').offset().top;
		var verticalSlider = new VerticalSlider($('.map-content'));
		var canLock = true;
		var inSwiper = false;

		window.verticalSlider = verticalSlider;
	}

	//--- END DESKTOP

	var isMobile = $window.width() < 768;

	var Scroll = Scroll ? Scroll : {scrollTop:0};
	var $pathElem = !isMobile ? $('.path-1-desktop') : $('.path-1-mob'),
		$pathSvg = $pathElem.find('svg'),
		pathOneOffsetTop = isMobile ? ($window.height()-375) : 0;

	if(isMobile) {
		$window.resize(function(){
			$('.hero-wrap').height(window.innerHeight-30);
		});

		if($window.height() > $window.width()) $('.hero-wrap').css('max-height',(window.innerHeight-30)+'px');

		$window.trigger('resize');
	}

	$('.hero_video')[0].play();
	$('.festival-echigo video')[0].play();

	//path

	function updatePath() {
		$pathElem.height(Math.abs(Scroll.scrollTop) + $('.festivals').offset().top-pathOneOffsetTop);
		$pathSvg.css('height',Math.abs(Scroll.scrollTop) + $('.festivals').offset().top-pathOneOffsetTop+'px');
	}

	function updatePath2() {
		var pathTwoOffsetTop = isMobile ? 270 : $part5.outerHeight()/2;

		$('.path-2')
			.css('top', (Math.abs(Scroll.scrollTop) + $('.part-4').offset().top-30) + 'px')
			.height($('.part-4').outerHeight()+30+pathTwoOffsetTop);

	}

	updatePath();
	updatePath2();

	$(window).resize(function(){
		updatePath();
		updatePath2();
	})

	$(window).load(function() {
		updatePath2();
	});

	var path = MorphSVGPlugin.pathDataToBezier($pathSvg.find('.svg-path').selector);
	var path2 = MorphSVGPlugin.pathDataToBezier(isMobile ? '#path-2-mob' : "#path-2");
	// var path2 = path;

	var pathSvgWidth = $pathSvg[0].getAttribute("viewBox").split(' ')[2];
	var pathSvgHeight = $pathSvg[0].getAttribute("viewBox").split(' ')[3];
	var multiplier = $pathElem.height()/pathSvgHeight;

	var heroPath = path.map(function(elem, i){
		return {
			x: elem.x*multiplier-pathSvgWidth/2*multiplier,
			y: elem.y*multiplier
		}
	})

	var circle1 = isTouchDevice ? '.path-1-mob #circle' : '.path-1-desktop #circle'; 
	var circle2 = isTouchDevice ? '.path-2-mob #circle-2' : '.path-2-desktop #circle-2'; 

	var circleTween = new TimelineMax({ paused: true }).to(circle1, 25, {bezier:{values:path, type:"cubic"}, ease:Linear.easeNone});
	var circleTween2 = new TimelineMax({ paused: true }).to(circle2, 25, {bezier:{values:path2, type:"cubic"}, ease:Linear.easeNone});
	var heroCircle = new TimelineMax({ paused: true }).to(".hero", 25, {bezier:{values: isTouchDevice ? path : heroPath, type:"cubic"}, ease:Linear.easeNone});

	//map
	function VerticalSlider($elem) {
    	this.$elem = $elem;
    	this.$items = $elem.find('.part-2_map-copy li');
    	this.currentClass = 'swiper_current';
    	this.outClass = 'swiper_out';
    	this.inClass = 'swiper_in';
    	this.currentIndex = 0;
    	this.length = this.$items.length;
    	this.horizontal = false;
    	this.horizontalScrolled = 0;
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

    		} else {
    			canLock = false;
    			setTimeout(function(){
    				canLock = true;
    			},500)
    			inSwiper = false;
    			$('html').removeClass('scroll-paused');
    			$('.inner').removeClass('opacity');
				$('.map-content').removeClass('active');

				Scroll.options.plugins.filterEvent.blacklist = [];

    // 			Scroll.updatePluginOptions('filterEvent', {
				//   blacklist: [],
				// });
    			// scrollbar.registerEvents(/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/);
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

	    	} else {
	    		canLock = false;
    			setTimeout(function(){
    				canLock = true;
    			},500)
    			inSwiper = false;
    			$('html').removeClass('scroll-paused');
    			$('.inner').removeClass('opacity');
				$('.map-content').removeClass('active');

				Scroll.options.plugins.filterEvent.blacklist = [];

    // 			Scroll.updatePluginOptions('filterEvent', {
				//   blacklist: [/blur/, /click/, /dragend/, /dragover/, /dragstart/, /focus/, /keydown/, /mousedown/, /mousemove/, /mouseup/, /resize/, /scroll/, /selectstart/, /touchend/, /touchmove/, /touchstart/, /wheel/],
				// });
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
	    	}, 0.5*1000*2)
	    }
    }

    //part-5 popup

    var player;

	$('.video-thumb').click(function() {
		var src = $(this).attr('data-src');

		$('.popup').fadeIn(300);

		$('.popup .iframe').hide();
		$('#player').attr('data-plyr-embed-id', src);
		player = new Plyr('#player', {
	    	"autoplay": true,
	    	"volume": 1,
	    	"muted": false
		});
	})
	$('.popup .close').click(function() {
		$('.popup').fadeOut(300);

		player.destroy();
	})

	//MOBILE

	isTouchDevice ? $('.festival-next_action').text('tap') : false;

	if(isTouchDevice) {
		$('.part-5').addClass('clipped');

		$window.scroll(function(){
			var scrollTop = $window.scrollTop();

			$('.animated').each(function(){

				if(isInView($(this), scrollTop-200)) {
					$(this).addClass('in-view');
				}
			})

			//map 
			// if(isInView($('.map-content'), scrollTop-200)) {
				// $('.map-content').addClass('active');
			// }

			//festivals 
			if($('.festivals').offset().top-35-70 < scrollTop && $('.festivals').offset().top + $('.festivals').height()-200 > scrollTop) {
				$('.festivals-nav').addClass('active');
			} else {
				$('.festivals-nav').removeClass('active');
			}

			//path
			// var pathOneOffset = ($window.height()/2-90) / (scrollTop + $('.festivals').offset().top);

			var pathOneLimit = $('.festivals').offset().top,
				patheOneProgress = scrollTop*100/pathOneLimit/100*1.2;

			var pathTwoLimit = $('.part-4').offset().top-30,
				pathTwoProgress = (scrollTop - pathTwoLimit) * 100 / ($('.part-4').height()+$('.part-5').outerHeight()/2) / 100 + 0.2;

			patheOneProgress >= 0.996 ? $('.circle-1').addClass('hidden') : $('.circle-1').removeClass('hidden');

			circleTween.progress(patheOneProgress >= 1 ? 1 : patheOneProgress);
			circleTween2.progress(pathTwoProgress >= 1 ? 1 : pathTwoProgress);
		})

		var controller = new ScrollMagic.Controller();
		new ScrollMagic.Scene({
		  triggerElement: ".map-wrap",
		  triggerHook: "onLeave",
		  duration: "100%",
		  offset:-40
		})
		  .setPin(".map-wrap")
		  .addTo(controller)
		  .on("progress", function (event) {
			    var index = Math.floor(event.progress/0.25)

			    index == 4 ? index = 3 : index = index;

			    $('.part-2_infographics li, .part-2_map span, .part-2_map-copy li').removeClass('swiper_current');
			    $('.part-2_infographics li').eq(index).addClass('swiper_current');
			    $('.part-2_map span').eq(index).addClass('swiper_current');
			    $('.part-2_map-copy li').eq(index).addClass('swiper_current');
			})
		  .on("enter", function (event) {
		  		$('.map-content').addClass('active');
			    $('.circle-1').addClass('opacity');
			})
		  .on("leave", function (event) {
		  	// $('.map-content').removeClass('active');
			    $('.circle-1').removeClass('opacity');
			});

		  new ScrollMagic.Scene({
		  triggerElement: ".map-wrap",
		  triggerHook: 0,
		  duration: "100%",
		  offset:-40
		})
		  .setPin(".path-1-mob")
		  .addTo(controller);
	}
})


