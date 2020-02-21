$(document).ready(function() {
	var $win = $(window);
	var winHeight = $(window).height();

	function isInView($el, scrollTop){
		var elTop = $el.offset().top;
		return scrollTop <= elTop + $el.outerHeight() && scrollTop + winHeight >= elTop;
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
})

$(window).load(function() {
 
});