$(function() {
	function noscroll() {
	  window.scrollTo( 0, scrollTopAmount );
	}

	var bool = false;
	var flag = false;
	var counter = 0;
	var stucked = false;

	$('.welcome-section').addClass('ready');

	$('.scores-section__dots-nav li').click(function(event) {
		$('.scores-section__dots-nav li').removeClass('active');
		$(this).addClass('active');
		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + $(this).index()*$('.col.scroll-box').height() + 'px, 0)'});
	});

	var isFirefox = (/Firefox/i.test(navigator.userAgent));
	var mousewheelevt = isFirefox ? "DOMMouseScroll" : "mousewheel";

	 $('body').on(mousewheelevt, function(e){
	 	// var delta = isFirefox ? (e.originalEvent.detail < 0) : (e.originalEvent.wheelDelta > 0);

   //      if(delta) {
   //      	console.log('up');
   //          if(!flag && (counter > 0) && stucked) {
   //      		flag = true;
   //      		$('.scores-section__dots-nav li').removeClass('active');
   //      		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + --counter*$('.col.scroll-box').height() + 'px, 0)'});
			// 	$('.scores-section__dots-nav li').eq(counter).addClass('active');
   //      		setTimeout(function() {
   //      			flag = false;
   //      		},500)
   //      	} else if(counter <= 0) {
   //      		$(window).disablescroll("undo");
   //      		stucked = false;
   //      	}
   //      }
   //      else { 
   //      	console.log('down');
   //      	if(!flag && (counter < 4) && stucked) {
   //      		flag = true;
   //      		$('.scores-section__dots-nav li').removeClass('active');
			// 	$(this).addClass('active');
   //      		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + ++counter*$('.col.scroll-box').height() + 'px, 0)'});
   //      		$('.scores-section__dots-nav li').eq(counter).addClass('active');
   //      		setTimeout(function() {
   //      			flag = false;
   //      		},500)
   //      	}
   //      }
    });

	// //scores scroll
	var headerHeight = $('.page-header').outerHeight();
	var windowHeight = $(window).height();
	var scoresOffsetTop = $("#scores-section").offset().top;
	var scoresHeight = $("#scores-section").outerHeight();
	var scrollTopAmount = scoresOffsetTop - ((windowHeight - scoresHeight) / 2) - 75/2;
	console.log(scrollTopAmount);

	//fixed header
	$(window).scroll(function(event) {
		if($(window).scrollTop() > 50) {
			$('.page-header').addClass('sticky');
		} else {
			$('.page-header').removeClass('sticky');
		}

		if($(window).scrollTop() > $('.welcome-section__join-btn').offset().top+50) {
			$('.mobile-join-link').addClass('active');
		} else {
			$('.mobile-join-link').removeClass('active');
		}

		if($(window).scrollTop() > scrollTopAmount) {
			/*$(window).disablescroll({
			    handleScrollbar: true
			});

			stucked = true;*/

			// window.onscroll = function () { console.log(22) };
			// console.log($(window).scrollTop());

			// add listener to disable scroll
			// if(!bool) {
			// 	window.addEventListener('scroll', noscroll);
			// 	bool = true;
			// }
		}

		if(bool) {

		}

		//console.log(11);
	});

	//delayed youtube video loading
    // setTimeout(function() { 
    //     $('iframe.delayed').attr('src', $('iframe.delayed').attr('data-src')); 
    // }, 500);

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
	    $('.faq-section__videos').slick({
	    	arrows: false,
	    	swipeToSlide: true,
	    	variableWidth: true,
    		infinite: false
	    });
    }
    $('.about-section .about-section__video iframe').height($('.about-section .about-section__video iframe').width()*0.56);
    $('.faq-section .faq-section__videos li iframe').height($('.faq-section .faq-section__videos li iframe').width()*0.56);


    //mobile illustartion slider
    $('.illustrations-mobile__list').slick({
    	arrows: false,
    	swipeToSlide: true,
    	centerMode: true,
    	variableWidth: true,
    	infinite: false
    });

    //MSE abbreviation
    if($(window).width() < 768) $('.scores-list-item__title__MSE').text('MSE');
});
    