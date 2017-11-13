$(function() {

	//check if in view
    var $animation_elements = $('.animation-element');
    var $window = $(window);
    var check_if_in_view = function() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            if ((element_bottom_position >= window_top_position) && (element_top_position + 230 <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {}
        });
    }
    check_if_in_view();

	var bool = false;
	var flag = false;
	var counter = -1;
	var stucked = false;

	$('.scores-section__dots-nav li').click(function(event) {
		$('.scores-section__dots-nav li').removeClass('active');
		$(this).addClass('active');
		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + $(this).index()*$('.col.scroll-box').height() + 'px, 0)'});
	});

	// //scores scroll
	var headerHeight = $('.page-header').outerHeight();
	var windowHeight = $(window).height();
	var scoresOffsetTop = $("#scores-section").offset().top;
	var scoresHeight = $("#scores-section").outerHeight();
	var scrollTopAmount = Math.round(scoresOffsetTop - ((windowHeight - scoresHeight) / 2) - 75/2);

	var isFirefox = (/Firefox/i.test(navigator.userAgent));
	var mousewheelevt = isFirefox ? "DOMMouseScroll" : "mousewheel";

    var delay = false;
    var $window = $(window);
    var lastY = $window.scrollTop();

    /*if($window.width() >= 768 && ($window.scrollTop() > (scrollTopAmount+scoresHeight/2)) ) {
    	counter = 5;
    	$('.scores-section__dots-nav li').removeClass('active');
		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + --counter*$('.col.scroll-box').height() + 'px, 0)'});
		$('.scores-section__dots-nav li').eq(counter).addClass('active');
    }*/

    $window.on('scroll touchmove mousewheel DOMMouseScroll', function(e){
    	var delta;

    	if(e.type == 'mousewheel') {
    		delta = (e.originalEvent.wheelDelta > 0)
    	} else if(e.type == 'DOMMouseScroll') {
    		delta = (e.originalEvent.detail < 0)
    	}
    	var scrollTop = Math.round($(window).scrollTop());

    	var currY = scrollTop;
        
        // determine current scroll direction
        y = (currY > lastY) ? 'down' : ((currY === lastY) ? 'none' : 'up');

        if(e.type == 'touchmove') {
			//console.log(e.originalEvent.detail);
        }

        $('.scroll-direction').text(delta);

        if($window.width() >= 768) {

        	if(delta || y == 'up') {
				if(scrollTop <= scrollTopAmount && !stucked) {
					stucked = true;	
				}
	            if(!flag && (counter > 0) && stucked) {
	        		flag = true;
	        		$('.scores-section__dots-nav li').removeClass('active');
	        		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + --counter*$('.col.scroll-box').height() + 'px, 0)'});
					$('.scores-section__dots-nav li').eq(counter).addClass('active');
	        		setTimeout(function() {
	        			flag = false;
	        		},400)
	        	} else if(counter <= 0) {
	        		// $(window).disablescroll("undo");
	        		stucked = false;
	        		counter = -1;
	        	}
	        }
	        else if (!delta || 'down') {
				if(scrollTop >= scrollTopAmount && !stucked) {
					stucked = true;	
				}
	        	if(!flag && (counter < 4) && stucked) {
	        		flag = true;
	        		$('.scores-section__dots-nav li').removeClass('active');
					$(this).addClass('active');
	        		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + ++counter*$('.col.scroll-box').height() + 'px, 0)'});
	        		$('.scores-section__dots-nav li').eq(counter).addClass('active');
	        		setTimeout(function() {
	        			flag = false;
	        		},400)
	        	} else if(counter >= 4) {
	        		stucked = false;
	        		counter = 5;
	        	}
	        }
			if(stucked) {
				$window.scrollTop(scrollTopAmount)
				e.preventDefault();
				e.stopPropagation();
				return false;	
			}
        }

        //new scroller 
       /* if (scrollTop >= scrollTopAmount) {
        	disableScroll.on()
        	$window.scrollTop(scrollTopAmount)
        }*/

		//sticky header
		if($(window).scrollTop() > 50) {
			$('.page-header').addClass('sticky');
		} else {
			$('.page-header').removeClass('sticky');
		}

		//join link on mobile
		if($(window).scrollTop() > $('.welcome-section__join-btn').offset().top+50) {
			$('.mobile-join-link').addClass('active');
		} else {
			$('.mobile-join-link').removeClass('active');
		}

		check_if_in_view();

		lastY = currY;
	})

    //anchor 
    $('.nav__main-menu a').click(function(event) {
    	event.preventDefault();
    	var self = $(this);

    	if($('.page-header').hasClass('menu-opened')) {
    		$('.toggle-mobile-menu').click();
    		setTimeout(function(){
    			$('html, body').stop().animate({
			        scrollTop: $( self.attr('href') ).offset().top - $('.page-header').outerHeight()
			    }, 800);
    		}, 450)
    	} else {
    		$('html, body').stop().animate({
		        scrollTop: $( self.attr('href') ).offset().top - $('.page-header').outerHeight()
		    }, 800);
    	}
	});

	//mobile menu
	$('.toggle-mobile-menu').click(function (event) {
        $(this).toggleClass('active');
        $('.page-header').toggleClass('menu-opened');
        $('.mobile-join-link').toggleClass('active');
        $('.page-header__nav').slideToggle(400);
        $('body').toggleClass('overflow');
    });

    //videos slider
    if($(window).width() < 1024) {
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
    if($(window).width() < 768) $('.scores-list-item__title__MSE').text('MSE');
});
    