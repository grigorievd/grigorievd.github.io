$(document).ready(function() {
	var $win = $(window);
	var winHeight = $(window).height();

	function isInView($el, scrollTop){
		var elTop = $el.offset().top;
		return scrollTop <= elTop + $el.outerHeight() && scrollTop + winHeight >= elTop;
	}

	$win.scroll(function(){
		var scrolled = $(window).scrollTop();

        //animated
        $('.animated').each(function(){
			if(isInView($(this), scrolled)) {
				// $(window).trigger('resize');
				$(this).addClass('in-view');
			}
		})
	});

	var animation = ($(window).width() >= 768) ? animationData : animationMob;

	var params = {
	    container: document.getElementById('lottie'),
	    renderer: 'svg',
	    loop: true,
	    autoplay: true,
	    animationData: animation
	};

	var anim = lottie.loadAnimation(params);
})

$(window).load(function() {
 
});