$(document).ready(function() {
	$('.loader').fadeOut();

	function isInView(el) {
		if (scrolled + $(window).height()/1.5 > $(el).offset().top &&
			  scrolled + $(window).height()/1.5 < $(el).offset().top + $(el).innerHeight()) {
		  return true;
		}
	}

	console.log(12312);

	 // $.getJSON('diagram-json.php', function(data){
	 // 	console.log(123);
	 // });

	 // $.ajax({
		//   url: "diagram-json.php",
		//   success: function(data){
		//     console.log( "Прибыли данные: " + data );
		//   }
		// });

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

		if (isInView($('.case-study-map'))) {
			$('.case-study-map__dots-svg').addClass('active');
		}
	})

	$('.risks__box-read-more').click(function(){
		$(this).toggleClass('active');
		$(this).parent().toggleClass('active').find('.hidden-content').slideToggle();
	})

})


