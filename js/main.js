$(function() {
	// function noscroll() {
	//   window.scrollTo( 0, scrollTopAmount );
	// }

	// var bool = false;
	// var counter = 0;

	$('.scores-section__dots-nav li').click(function(event) {
		$('.scores-section__dots-nav li').removeClass('active');
		$(this).addClass('active');
		$('.scores-section__scores-list').css({'transform' : 'translate3d(0, -' + $(this).index()*$('.col.scroll-box').height() + 'px, 0)'})
	});
	

	// //scores scroll
	// var headerHeight = $('.page-header').outerHeight();
	// var windowHeight = $(window).height();
	// var scoresOffsetTop = $("#scores-section").offset().top;
	// var scoresHeight = $("#scores-section").outerHeight();
	// var scrollTopAmount = scoresOffsetTop - ((windowHeight - scoresHeight) / 2) - 75/2;
	// console.log(scrollTopAmount);

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

		// if($(window).scrollTop() > scrollTopAmount) {
		// 	// $(window).disablescroll({
		// 	//     handleScrollbar: false
		// 	// });

		// 	// window.onscroll = function () { console.log(22) };
		// 	// console.log($(window).scrollTop());

		// 	// add listener to disable scroll
		// 	if(!bool) {
		// 		window.addEventListener('scroll', noscroll);
		// 		bool = true;
		// 	}
		// }

		// if(bool) {

		// }

		//console.log(11);
	});

	//delayed youtube video loading
    setTimeout(function() { 
        $('iframe.delayed').attr('src', $('iframe.delayed').attr('data-src')); 
    }, 500);

    //anchor 
    $('.nav__main-menu a').click(function(event) {
    	event.preventDefault();

    	$('html, body').stop().animate({
	        scrollTop: $( $(this).attr('href') ).offset().top - $('.page-header').outerHeight()
	    }, 800);
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
    // $('.faq-section__videos').slick({
    // 	arrows: false,
    // 	swipeToSlide: true
    // });
    $('.about-section .about-section__video iframe').height($('.about-section .about-section__video iframe').width()*0.56);
});
    