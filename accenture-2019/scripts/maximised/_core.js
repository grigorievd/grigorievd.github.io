/*
 * CORE useful utilities
 * Updated version on 04/10/2017
 * See inside of functions for short description
 */
 
function userAgent( ...agents ){
	
	// Return true if any string matches the user agent
	
	var ua = navigator.userAgent.toLowerCase();
	return !!( agents.find( a => ua.indexOf( a.toLowerCase() ) >= 0 ) );

} // -> Bool
function select( query, root = document ){

	// Try to select items. If invalid query or root, return an empty array. 
	// Always returns an array.

	try {

		return [].slice.call(root.querySelectorAll( query ));

	} catch( e ){

		return [];

	}

} // -> Array
function clamp( value, min = 0, max = 1 ){

	// Clamp value between min and max
	return value < min ? min : (value > max ? max : value);

} // -> Number
function scrollTo( top, duration = 400, callback = () => {} ){

	// Scroll to number passed as argument
	
	var bod = document.body;
	var doc = document.documentElement || bod;
	
	if( !scrollTo.isScrolling ){
		
		scrollTo.isScrolling = true;
		
	} else {
		
		return;
	
	}
	
	function handle( delta, progress ){

		var d = clamp( progress / duration );

		d *= d;

		if( d === 1 ){
			
			scrollTo.isScrolling = false;
			doc.scrollTop = to;
			bod.scrollTop = to;
			callback();
			return false;

		} else {
			
			let v = d * (to - from) + from;
			
			doc.scrollTop = v;
			bod.scrollTop = v;

		}

	}
	function cancel(){
	
		AF.remove( handle );
		
	}
	
	var from = doc.scrollTop || bod.scrollTop;
	var to = top;

	AF.add( handle );
	
	return cancel;

} // -> Function (cancel scroll)
function scrollToElement( element, duration = 400, callback = () => {}  ){
	
	var bb = element.getBoundingClientRect();
	var top = document.body.scrollTop || (document.documentElement ? document.documentElement.scrollTop : 0);
	
	return scrollTo(
		bb.top + top - 40,
		duration,
		callback
	);
	
} // -> Function (cancel scroll)
function getBounds( element, { left, top, right, bottom } = { left: 0, top: 0, right: innerWidth, bottom: innerHeight } ){

	var bb = element.getBoundingClientRect();
	bb.visible = !(
		bb.left >= right
		|| bb.right <= left
		|| bb.top >= bottom
		|| bb.bottom <= top
	);

	return bb;

} // -> BoundingClientRect + .visible:Bool