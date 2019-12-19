$(document).ready(function() {

	var params = {
	    container: document.getElementById('lottie'),
	    renderer: 'svg',
	    loop: true,
	    autoplay: true,
	    animationData: animationData
	};

	var anim;

	anim = lottie.loadAnimation(params);
})