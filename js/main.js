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

    if(isTouchDevice) {
    	$('html').addClass('touch');
    	if(windowWidth < 1024) {
    		setTimeout(function(){
				$('.scores-section .scores-list__item:nth-child(1), .scores-section .scores-list__item:nth-child(2)').addClass('in-view');
    		}, 700)
    	}
    }

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
            if ((element_bottom_position >= window_top_position) && (element_top_position + 200 <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
            	/*if(element_top_position >= window_bottom_position && $element.hasClass('scores-list__item')) {
            		$element.removeClass('in-view');
            	}*/
            }
        });
    }
    check_if_in_view();

    setTimeout(function() {
    	$('.welcome-section').addClass('in-view');
    }, 100)
    
	//scores scroll
	var bool = false, 
		flag = false,
		counter = -1,
		stucked = false;

	$scoresSectionNavItems.click(function(event) {
		moveScores($(this).index());
	});

	var headerHeight = $header.outerHeight(),
		scoresOffsetTop = $scoresSection.offset().top,
		scoresHeight = $scoresSection.outerHeight(),
		scrollTopAmount = Math.round(scoresOffsetTop - ((windowHeight - scoresHeight) / 2) - 75/2);

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
    		$.scrollLock( true );
    		$header.addClass('sticky-important');
    		scrollLocked = true;
    	} else {
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

    	var currY = scrollTop;
        
        // determine current scroll direction
        y = (currY > lastY) ? 'down' : ((currY === lastY) ? 'none' : 'up');

        //if(windowWidth >= 1024 && !isTouchDevice) {

   //      	if(delta /*|| y == 'up'*/) {
			// 	if(scrollTop <= scrollTopAmount && !stucked) {
			// 		stucked = true;	
			// 	}
	  //           if(!flag && (counter > 0) && stucked) {
	  //       		flag = true;
	  //       		if(counter == 7) {
	  //       			var time = 500
	  //       			counter = 5;
	  //       		} else {
	  //       			var time = 0;
	  //       		}
	  //       		setTimeout(function(){
			// 			moveScores(--counter);
		 //        		setTimeout(function() {
		 //        			flag = false;
		 //        		},400)
   //      			},time)
	  //       	} else if(counter <= 0) {
	  //       		// $window.disablescroll("undo");
	  //       		stucked = false;
	  //       		counter = -3;
	  //       	}
	  //       }
	  //       else if (!delta /*|| 'down'*/) {
			// 	if(scrollTop >= scrollTopAmount && !stucked) {
			// 		stucked = true;	
			// 	}
	  //       	if(!flag && (counter < 4) && stucked) {
	  //       		flag = true;
	  //       		if(counter == -3) {
	  //       			var time = 500
	  //       			counter = -1;
	  //       		} else {
	  //       			var time = 0;
	  //       		}
   //      			setTimeout(function(){
			// 			moveScores(++counter);
		 //        		setTimeout(function() {
		 //        			flag = false;
		 //        		},400)
   //      			},time)	
	  //       	} else if(counter >= 4) {
	  //       		stucked = false;
	  //       		counter = 7;
	  //       	}
	  //       }
			// if(stucked) {
			// 	$window.scrollTop(scrollTopAmount)
			// 	e.preventDefault();
			// 	e.stopPropagation();
			// 	return false;	
			// }
   //      }

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

	$window.trigger('scroll');

    //anchors nav
    $('.nav__main-menu a').click(function(event) {
    	event.preventDefault();

    	var headerHeight = (windowWidth >= 768) ? 73 : $header.outerHeight(),
    		top = $($(this).attr('href')).offset().top - headerHeight

    	// if($(this).hasClass('scores-anchor') && !isTouchDevice) top = scrollTopAmount

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
	$window.resize(function(event) {
		if($(window).width() < 1024) {
	    	//videos slider
		    $('.faq-section__videos').width(($('.faq-section__videos li').width()+10)*($('.faq-section__videos li').length)-5);

	    } else {
	    	$('.faq-section__videos').width('100%');
	    }

	    if($(window).width() < 768) {
		    //MSE abbreviation
		    $('.scores-list-item__title__MSE').text('MSE');
	    }

	    var elements = $('.lazyframe');
		lazyframe(elements, {
		   apikey: 'AIzaSyCVnrhyItngFlAxu_T1BrVazo2yTaxgTBE',
		   lazyload: true
		});	

	    //lazyload youtube videos
	    if($(window).width() >= 1024 && !isTouchDevice) {
	  // 	    var elements = $('.lazyframe');
			// lazyframe(elements, {
			//    apikey: 'AIzaSyCVnrhyItngFlAxu_T1BrVazo2yTaxgTBE',
			//    lazyload: true
			// });	
	    } else {
	    	// $('.faq-section__videos iframe').each(function(index, el) {
	    	// 	$(this).attr('src', $(this).data('src'));
	    	// });
	    }
	});

	$window.trigger('resize');
    
    //youtube video proportions
    $('.about-section .about-section__video iframe').height($('.about-section .about-section__video iframe').width()*0.56);
    $('.faq-section .faq-section__videos li iframe').height($('.faq-section .faq-section__videos li iframe').width()*0.56);


    //mobile illustartion slider
    $('.illustrations-mobile__list.owl-carousel').owlCarousel({
    	center: true,
    	autoWidth: true,
    	smartSpeed: 500
    });
});
    