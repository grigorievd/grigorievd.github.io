$(function() {

    var $window = $(window),
    	windowWidth = $window.width(),
    	windowHeight = $window.height();

	var isTouchDevice = (('ontouchstart' in window)
	      || (navigator.MaxTouchPoints > 0)
	      || (navigator.msMaxTouchPoints > 0)),
		
		isFirefox = (/Firefox/i.test(navigator.userAgent));

	var $header = $('.page-header'),
		$scoresSection = $("#scores-section"),
		$scoresSectionNavItems = $('.scores-section__dots-nav li');

	//check if in view
    var $animation_elements = $('.animation-element');
    var check_if_in_view = function() {
        var window_height = windowHeight;
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            if ((element_bottom_position >= window_top_position) && (element_top_position + 230 <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
            	if(element_top_position >= window_bottom_position && $element.hasClass('scores-list__item')) {
            		$element.removeClass('in-view');
            	}
            }
        });
    }
    check_if_in_view();

    if(isTouchDevice) {
    	$('html').addClass('touch');
    }

    setTimeout(function() {
    	$('.welcome-section').addClass('in-view');
    }, 100)

	var bool = false;
	var flag = false;
	var counter = -1;
	var stucked = false;

	$scoresSectionNavItems.click(function(event) {
		moveScores($(this).index());
	});

	// //scores scroll
	var headerHeight = $header.outerHeight();
	var scoresOffsetTop = $scoresSection.offset().top;
	var scoresHeight = $scoresSection.outerHeight();
	var scrollTopAmount = Math.round(scoresOffsetTop - ((windowHeight - scoresHeight) / 2) - 75/2);

	var mousewheelevt = isFirefox ? "DOMMouseScroll" : "mousewheel";

    var lastY = $window.scrollTop();

    function moveScores(counter) {
    	$scoresSectionNavItems.removeClass('active');
		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + counter*$('.col.scroll-box').height() + 'px, 0)'});
		$scoresSectionNavItems.eq(counter).addClass('active');
    }

    if(windowWidth >= 1024 && ($window.scrollTop() > (scrollTopAmount+scoresHeight/2)) && !isTouchDevice ) {
    	counter = 5;
    	moveScores(counter - 1);
    }

    var scrollLocked = false;

    function stuckScroll(check) {
    	if(check) {
    		console.log('windowScrollTop: ' + $window.scrollTop());
    		$.scrollLock( true );
    		$header.addClass('sticky-important');
    		scrollLocked = true;
    	} else {
    		console.log('unlock');
			$.scrollLock( false );
    		$header.removeClass('sticky-important');
    		scrollLocked = false;
    	}
    }

    var delta;

    var headerHeight;

    $window.on('scroll touchmove mousewheel DOMMouseScroll', function(e){
    	if(e.type == 'mousewheel') {
    		delta = (e.originalEvent.wheelDelta > 0)
    	} else if(e.type == 'DOMMouseScroll') {
    		delta = (e.originalEvent.detail < 0)
    	}
    	var scrollTop = Math.round($window.scrollTop());
    	//console.log('onscroll: ' + scrollTop);

    	var currY = scrollTop;
        
        // determine current scroll direction
        y = (currY > lastY) ? 'down' : ((currY === lastY) ? 'none' : 'up');

        if(windowWidth >= 1024 && !isTouchDevice) {

        	if(delta /*|| y == 'up'*/) {
				if(scrollTop <= scrollTopAmount && !stucked) {
					stucked = true;	
				}
	            if(!flag && (counter > 0) && stucked) {
	        		flag = true;
	        		if(counter == 7) {
	        			var time = 500
	        			counter = 5;
	        		} else {
	        			var time = 0;
	        		}
	        		setTimeout(function(){
						moveScores(--counter);
		        		setTimeout(function() {
		        			flag = false;
		        		},400)
        			},time)
	        	} else if(counter <= 0) {
	        		// $window.disablescroll("undo");
	        		stucked = false;
	        		counter = -3;
	        	}
	        }
	        else if (!delta /*|| 'down'*/) {
				if(scrollTop >= scrollTopAmount && !stucked) {
					stucked = true;	
				}
	        	if(!flag && (counter < 4) && stucked) {
	        		flag = true;
	        		if(counter == -3) {
	        			var time = 500
	        			counter = -1;
	        		} else {
	        			var time = 0;
	        		}
        			setTimeout(function(){
						moveScores(++counter);
		        		setTimeout(function() {
		        			flag = false;
		        		},400)
        			},time)	
	        	} else if(counter >= 4) {
	        		stucked = false;
	        		counter = 7;
	        	}
	        }
			if(stucked) {
				$window.scrollTop(scrollTopAmount)
				/*$('html, body').stop().animate({
			        scrollTop: scrollTopAmount
			    }, 30);*/
				e.preventDefault();
				e.stopPropagation();
				return false;	
			}

			/*if(!delta) { //down
				if(scrollTop >= scrollTopAmount && counter == -1) {
					stuckScroll(true);
				}
				if(!flag && (counter < 4) && scrollLocked) {
	        		flag = true;
	        		$scoresSectionNavItems.removeClass('active');
					$(this).addClass('active');
	        		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + ++counter*$('.col.scroll-box').height() + 'px, 0)'});
	        		$scoresSectionNavItems.eq(counter).addClass('active');
	        		setTimeout(function() {
	        			flag = false;
	        		},400)
	        	} else if(counter >= 4) {
	        		counter = 5;
	        		stuckScroll(false);
	        	}
			} else { //up
				if(scrollTop <= scrollTopAmount && counter == 5) {
					stuckScroll(true);
				}
				if(!flag && (counter > 0) && scrollLocked) {
	        		flag = true;
	        		$scoresSectionNavItems.removeClass('active');
	        		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + --counter*$('.col.scroll-box').height() + 'px, 0)'});
					$scoresSectionNavItems.eq(counter).addClass('active');
	        		setTimeout(function() {
	        			flag = false;
	        		},400)
	        	} else if(counter <= 0) {
	        		counter = -1;
	        		stuckScroll(false);
	        	}
			}*/
        }

        //new scroller 
       /* if (scrollTop >= scrollTopAmount) {
        	disableScroll.on()
        	$window.scrollTop(scrollTopAmount)
        }*/

		//sticky header
		if(scrollTop > 50) {
			$header.addClass('sticky');
			headerHeight = $header.outerHeight();
		} else {
			$header.removeClass('sticky');
			headerHeight = $header.outerHeight();
		}

		//join link on mobile
		if(scrollTop > $('.welcome-section__join-btn').offset().top+50) {
			$('.mobile-join-link').addClass('active');
		} else {
			$('.mobile-join-link').removeClass('active');
		}

		check_if_in_view();

		lastY = currY;
	})

	if(windowWidth >= 768 && windowWidth <= 1024 && isTouchDevice) {
		console.log(headerHeight);
		var sectionHeaderTopIntitial = (windowHeight
								- 73
								- $('.scores-section .section-header').outerHeight()) / 2
								+ headerHeight;
		var sectionHeaderTopSecond = sectionHeaderTopIntitial - 73;

		var dotsTopIntitial = (windowHeight
								- 73
								- $('.scores-section__dots-nav').outerHeight()) / 2
								+ headerHeight;
		var dotsTopSecond = sectionHeaderTopIntitial - 73;
								
		var marginTop = (windowHeight
						- headerHeight
						- $('.scores-section__scores-list li').outerHeight()) / 2
						+ headerHeight/2;

		
		$('.scores-section .section-header').css({'top': sectionHeaderTopSecond + 'px'});
		$('.scores-section__dots-nav').css({'top': dotsTopSecond + 'px'});
		$('.scores-section__scores-list').css({'margin': marginTop + 'px 0'});
		$('.scores-section__scores-list li').css({'margin-bottom': marginTop-80 + 'px'});

		$window.on('scroll', function(){
	//scrollable on ipad

			$('.scores-list__item').each(function(index, el) {
				if($(this).hasClass('in-view')) {
					$scoresSectionNavItems.eq(index).addClass('active');
				} else {
					$scoresSectionNavItems.eq(index).removeClass('active');
				}
			});
			var bottom = (parseFloat($window.scrollTop()) + parseFloat(windowHeight)) > $('.scores-quote').offset().top - 22;

			if(($window.scrollTop() + $header.outerHeight() + 70) >= $scoresSection.offset().top ) {
				$scoresSection.addClass('fixed');

				$('.scores-section .section-header').css({'top': sectionHeaderTopIntitial + 'px'});
				$('.scores-section__dots-nav').css({'top': dotsTopIntitial + 'px'});

				if (bottom) {
					$scoresSection.addClass('bottom');
					$scoresSection.removeClass('fixed');
					$('.scores-section .section-header').css({'bottom': sectionHeaderTopSecond + 'px','top': 'auto'});
					$('.scores-section__dots-nav').css({'bottom': dotsTopSecond + 'px', 'top': 'auto'});
				} else {
					$scoresSection.removeClass('bottom');
				}
			} else {
				$scoresSection.removeClass('fixed');

				$('.scores-section .section-header').css({'top': sectionHeaderTopSecond + 'px'});
				$('.scores-section__dots-nav').css({'top': dotsTopSecond + 'px'});
			}
		})
	}

    //anchor 
    $('.nav__main-menu a').click(function(event) {
    	event.preventDefault();

    	var headerHeight = (windowWidth >= 768) ? 73 : $header.outerHeight(),
    		top = $($(this).attr('href')).offset().top - headerHeight

    	if($(this).hasClass('scores-anchor')) top = scrollTopAmount

    	if($header.hasClass('menu-opened')) {
    		$('.toggle-mobile-menu').click();
    		setTimeout(function(){
    			$('html, body').stop().animate({
			        scrollTop: top
			    }, 800);
    		}, 450)
    	} else {
    		$('html, body').stop().animate({
		        scrollTop: top
		    }, 800);
    	}
	});

	//mobile menu
	$('.toggle-mobile-menu').click(function (event) {
        $(this).toggleClass('active');
        $header.toggleClass('menu-opened');
        $('.mobile-join-link').toggleClass('active');
        $('.page-header__nav').slideToggle(400);
        $('body').toggleClass('overflow');
    });

    //videos slider
    if(windowWidth < 1024) {
	    /*$('.faq-section__videos').slick({
	    	arrows: false,
	    	swipeToSlide: true,
	    	variableWidth: true,
    		infinite: false
	    });*/

	    $('.faq-section__videos.owl-carousel').owlCarousel({
	    	autoWidth: true,
	    	smartSpeed: 500
	    });
    }
    $('.about-section .about-section__video iframe').height($('.about-section .about-section__video iframe').width()*0.56);
    $('.faq-section .faq-section__videos li iframe').height($('.faq-section .faq-section__videos li iframe').width()*0.56);


    //mobile illustartion slider
    /*$('.illustrations-mobile__list').slick({
    	arrows: false,
    	swipeToSlide: true,
    	centerMode: true,
    	variableWidth: true,
    	infinite: false
    });*/
    /*$('.illustrations-mobile__list').flickity({
    	prevNextButtons: false,
		pageDots: false,
		selectedAttraction: 0.01,
		friction: 0.15
    });*/
    $('.illustrations-mobile__list.owl-carousel').owlCarousel({
    	center: true,
    	autoWidth: true,
    	smartSpeed: 500
    });

    //MSE abbreviation
    if(windowWidth < 768) $('.scores-list-item__title__MSE').text('MSE');
});
    