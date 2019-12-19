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

	// var rays = new TimelineMax({repeat:-1});

	// rays
		// .to('.rays', 2, {rotation:0, ease: Power0.easeNone, y:"-50%", x: '-50%'})
		// .to('.rays', 2, {rotation:360, ease: Power0.easeNone, y:"-50%", x: '-50%'})
})