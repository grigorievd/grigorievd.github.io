// $(window).load(function() {
//   $('.loader').fadeOut(400, function() {
//   	setTimeout(function(){
//   	  $(window).trigger('scroll');
//   	}, 200)
//   	$('.slider-section__slider li, .owl-dots').addClass('revealed');
//   });
// });
$(document).ready(function() {
	setTimeout(function() {
		$('.loader').fadeOut(300, function() {
			$(window).trigger('scroll');
			$('.slider-section__slider li, .dots').addClass('revealed');
		});
	},200)
	
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
  $('.owl-carousel').owlCarousel({
  	items:1.3,
  	center: true,
  	dots: false,
  	slideBy: 'page',
    loop:true,
    margin:0,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 1500,
    responsive:{
          0:{
              items:1.2
          },
          1023:{
              items:1.3
          }
      }
  })
  $('.owl-carousel').on('changed.owl.carousel', function(event) {
  	var index = event.page.index,
  			color = $($('.owl-item:not(.cloned) li')[index]).attr('data-color'),
  			videoSrc = $($('.owl-item:not(.cloned) li')[index]).attr('data-src');
  	$('.slider-section__background video').fadeOut(300, function(){
  		$('.slider-section__background video source').attr('src', videoSrc);
  		$('.slider-section__background video').load().delay(500).fadeIn(300);
  	})
  	$('.slider-section__background-color').css({'background': color});
  	$('.dot-' + index).addClass('active').siblings().removeClass('active');
	})

	$('.owl-item.center .thumbnail').mouseenter(function(){
		$('.owl-carousel').trigger('stop.owl.autoplay');
	})
	$('.owl-item.center .thumbnail').mouseleave(function(){
		$('.owl-carousel').trigger('play.owl.autoplay');
	})

	$('.dot').click(function() {
		var index = $(this).attr('data-dot');
		$('.dot-' + index).addClass('active').siblings().removeClass('active');
		setTimeout(function(){
			$('.owl-carousel').trigger('to.owl.carousel', [index, 1500]);
		},5000)
		
	})

	var isTouchDevice = (('ontouchstart' in window)
	        || (navigator.MaxTouchPoints > 0)
	        || (navigator.msMaxTouchPoints > 0));
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      isTouchDevice = true;
  } else {
    isTouchDevice = false;
  }

	var player;
	$('.open-video').click(function() {
		var src = $(this).attr('data-src'),
				mobSrc = $(this).attr('data-mob-src');

		$('.popup').fadeIn(300);
		if (isTouchDevice) {
			$('.popup .mob-iframe').attr('src', mobSrc);
		} else {
			$('#player').attr('data-plyr-embed-id', src);
			player = new Plyr('#player', {
	    	"autoplay": true,
	    	"volume": 1,
	    	"muted": false
			});
		}
	})
	$('.popup .close').click(function() {
		$('.popup').fadeOut(300);
		if (isTouchDevice) {
			$('.popup .mob-iframe').attr('src', '');
		} else {
			player.destroy();
		}
	})

	$(window).scroll(function() {
		scrolled = $(window).scrollTop();

		if (isTouchDevice) {
			$('.slider-section__slider .thumbnail button').css({"opacity": 1})
		}

		if(isInView($('.info-section__videos-container'))) {
			$('.info-section__videos, .footer_btm, .info-section__partnership').addClass('revealed');
			// $('.footer_btm').addClass('revealed')
		} else {
			$('.footer_btm').removeClass('revealed');
		}

		if(scrolled + $(window).height() > $('.info-section__partnership a').offset().top) {
			 $('.info-section__partnership a').addClass('revealed');
		}

		function isInView(el) {
			if (scrolled + $(window).height()/2 > $(el).offset().top) {
			  return true;
			}
		}

	})
})