$(document).ready(function() {
	$('.loader').fadeOut();

	function isInView(el) {
		if (scrolled + $(window).height()/1.5 > $(el).offset().top &&
			  scrolled + $(window).height()/1.5 < $(el).offset().top + $(el).innerHeight()) {
		  return true;
		}
	}

	/* Footer Share Animation */
    $('.share-click-ico').on('click', function() {
        $('.foot-social').slideToggle();
        $('.foot-social').toggleClass("active");
    });

    /* Scroll Up */
    $('.scroll-top').on('click', function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

	// $('html, body').scrollTop(0);
	// $(document).scrollTop(0);

	$('.points__point').each(function(){
		// $(this).next().css({'left': ($(this).offset().left+80) + 'px', 'top': $(this).offset().top - $(this).next().outerHeight()/2});
	})

	$('.points__point').on('mouseenter', function(){
		$(this).next().addClass('active');
	})

	$('.points__point').on('mouseleave', function(){
		$(this).next().removeClass('active');
	}) 

	$(".jagged-graphics").paroller({
        factor: -0.15,            // multiplier for scrolling speed and offset
        type: 'foreground',     // background, foreground
        direction: 'vertical' // vertical, horizontal
    });

    $(".smart-ways__jagged").paroller({
        factor: 0.15,            // multiplier for scrolling speed and offset
        type: 'foreground',     // background, foreground
        direction: 'vertical' // vertical, horizontal
    });

    $(".hero__text").paroller({
        factor: 0.1,            // multiplier for scrolling speed and offset
        type: 'foreground',     // background, foreground
        direction: 'vertical' // vertical, horizontal
    });

	$(".case-study__jagged").paroller({
        factor: 0.2,            // multiplier for scrolling speed and offset
        type: 'foreground',     // background, foreground
        direction: 'vertical' // vertical, horizontal
    }); 

    $(".outro__jagged").paroller({
        factor: 0.15,            // multiplier for scrolling speed and offset
        type: 'foreground',     // background, foreground
        direction: 'vertical' // vertical, horizontal
    });

	var interval = setInterval(function(){
  		$(window).trigger('resize');
	}, 200) 

    setTimeout(function(){
  		clearInterval(interval);
	}, 2000)

	$('.case-study-map__hotspots-svg circle').on('mouseenter', function(){
		$('.case-study-map__hotspot-texts li').removeClass('active');
		if($(this).index()%2) {
			$('.case-study-map__hotspot-texts li').eq(($(this).index()-1)/2).addClass('active');
		} else {
			$('.case-study-map__hotspot-texts li').eq($(this).index()/2).addClass('active');
		}
	})

	var arr = [];

	// $('.case-study-map__dots-svg circle').each(function(){
	// 	var r = Math.floor(Math.random() * (24 - 1 + 1)) + 1
 //    	// if(arr.indexOf(r) === -1) {
 //    		// arr.push(r);
 //    		$(this).css('transition-delay', r+'s')
	// 	// }
	// });

	while(arr.length < 18){
		var r = Math.floor(Math.random() * (18 - 1 + 1)) + 1;
		if(arr.indexOf(r) === -1) {
			$('.case-study-map__dots-svg circle').eq(arr.length).css('transition-delay', r*0.5+'s');
			arr.push(r);
		}
	}

	var scrolled;

	$(window).scroll(function() {
		scrolled = $(window).scrollTop();

		if ($('.case-study-map').length && isInView($('.case-study-map'))) {
			$('.case-study-map__dots-svg').addClass('active');
		}
	})

	$('.risks__box-read-more').click(function(){
		$(this).toggleClass('active');
		$(this).parent().toggleClass('active').find('.hidden-content').slideToggle();
	})

	$('.menu-toggle-btn').click(function(){
		$('.menu').toggleClass('active');
	})

	//article2

	$('.switcher__toggler').click(function(){
		$(this).parent().toggleClass('active');
		$('.switcher__options').toggleClass('active');
	})

	var controller = new ScrollMagic.Controller();

	var business = new ScrollMagic.Scene({triggerHook: 0.1,offset: 0, triggerElement:'.business__pin', duration: 2500})
		.setPin('.business__content')
		.addTo(controller)
		// .on('progress', function(e){
		// 	var current = parseInt(((e.progress*(2700)).toFixed(0)/300).toFixed(0));
		// 	console.log((e.progress*(2700)).toFixed(0)/300);
		// 	$('.business-items-counter__current').text('0'+ (current >= 9 ? current : (current+1)));
		// })

	var business = new ScrollMagic.Scene({offset: 0, triggerElement:'.business__pin', duration: 2500})
		// .setPin('.business__content')
		.addTo(controller)
		.on('progress', function(e){
			var current = parseInt((e.progress*(2500)).toFixed(0)/300);
			// console.log(parseInt((e.progress*(2700)).toFixed(0)/300));
			$('.business-items-counter__current').text('0'+ (current >=9 ? current : current+1));
		})

	var business1 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 0, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(1)", "active")
		.addTo(controller);

	var business2 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 300, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(2)", "active")
		.addTo(controller);

	var business3 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 600, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(3)", "active")
		.addTo(controller);

	var business4 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 900, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(4)", "active")
		.addTo(controller);

	var business5 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 1200, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(5)", "active")
		.addTo(controller);

	var business6 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 1500, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(6)", "active")
		.addTo(controller);

	var business7 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 1800, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(7)", "active")
		.addTo(controller);

	var business8 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 2100, duration: 300})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(8)", "active")
		.addTo(controller);

	var business9 = new ScrollMagic.Scene({triggerElement: '.business__pin', offset: 2400})
		// .setVelocity('.city-graphics2', {opacity: 1}, {delay: 0, duration: 400})
		.setClassToggle(".business-items li:nth-child(9)", "active")
		.addTo(controller);

})

$(window).load(function(){
	// $('.case-study-map__dots-svg').addClass('active');
})


