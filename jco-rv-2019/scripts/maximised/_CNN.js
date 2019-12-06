/*
 * Updated version on 14/12/2017
 * A private function to be used with the CNN Header code.
 * It has a private scope and will not interfere with any other code.
 */

void function(){
	
	function checkFixed( event ){ 
		
		var is = header.classList.contains( 'fixed' );
		var should = ((document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop) || document.body.scrollTop) > header.clientHeight / 2;
		
		if( !is && should ){ 
			
			header.classList.add( 'fixed' );
			
		} else if( is && !should ){
		
			header.classList.remove( 'fixed' );
			
		}
		
	}
	
	function toggleMenu( event ){
		
		menu.classList.toggle( 'active' );
		
	}
	
	var header = document.getElementById( 'cnn-header' );
	var menu = header.querySelector( '.cnn-menu' );
	
	// window.addEventListener( 'scroll', checkFixed );
	menu.addEventListener( 'click', toggleMenu );
	
	// checkFixed();
	
	document.getElementById('cnn-year').textContent = 1900 + new Date().getYear();
	
}();