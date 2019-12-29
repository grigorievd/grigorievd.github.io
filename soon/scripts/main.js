$(document).ready(function() {
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