/*
 * Parallax Transform Controller
 * -----------------------------
 * (C) Jasper Linsen 2017 - Updated 9/12/2017
 * -----------------------------
 * This controller is a Map Object to which you can add elements. It has the additional method `add` for semantic use, but it is just a shim of 'set';
 *
 * @method add( element: HTMLElement )
 * Adds the element to be evaluated for parallax transformation. The element should have at least
 * a `data-parallax` attribute, and can also have `data-parallax-easing`.
 * The values will be transformed from when the element appears onscreen to when it leaves (vertical scroll only).
 *
 * <HTMLElement>
 * -------------
 * @attribute data-parallax
 * Comma separated list of any number based CSS property of the structure:
 * property:min(unit)->max(unit) --- example: margin-top:0px->10px
 * If no unit is specified, % is used. 
 * If no property is specified transform translateX, then transform translateY will be used.
 * To specify translations, use translate-x or translate-y. Otherwise see rule above.
 */

const parallaxTransformController = function(){
	
	var all = new Map;
	var cssUnitList = ['px','em','vw','vh','vmin','vmax','rem','%'];
	var easingFunctions = {
		linear: v => v,
		cubic: v =>  v * v
	};
	
	function getCSSProperty( property ){
		
		// Turn any JS Style Property (ex. backgroundPosition) into a CSS only property (ex. background-position );
		
		return property.replace( /[A-Z]/g, function( capital ){
			
			return '-' + capital.toLowerCase();
			
		});
		
	}
	function getJSProperty( property ){
		
		// Turn any CSS only Property (ex. background-position) into a JS Style property (ex. backgroundPosition );
		
		return property.split( '-' ).map((w,i) => i == 0 ? w : w[0].toUpperCase() + w.slice(1)).join('');
		
	}
	function getUnit( args ){
		
		// Evaluate all the strings in argument and find any units matched in the cssUnitList
		// Return the first unit, or '%' if no match is found.
		
		return args.map(arg => {
			
			return arg.replace( /[0123456789\-\.]+/g, '' );
			
		}).filter( unit => cssUnitList.indexOf( unit ) >= 0 )[ 0 ] || '%';
		
	}
	function getValues( element ){
		
		// Create an array of object with values to transform
		
		var easing = easingFunctions[ element.getAttribute( 'data-parallax-easing' ) || 'cubic' ];
		var values = element.getAttribute( 'data-parallax' ).split( ',' ).map((string, index) => {
			
			var args = string.replace( /:|(\-\>)/g, ',' ).split( ',' );
			var prop = args.length >= 3 ? getJSProperty(args[ 0 ]) : 'translate' + (index ? 'Y' : 'X');
			var cssProp = getCSSProperty(args[ 0 ]);
			
			if( prop.indexOf( 'translate' ) === 0 ){
				
				cssProp = 'transform';
				
			}
			
			return {
				_css_property: cssProp,
				property: prop,
				unit: getUnit( args ),
				from: parseFloat( args.length >= 3 ? args[ 1 ] : args[ 0 ] ),
				to: parseFloat( args.length >= 3 ? args[ 2 ] : args[ 1 ] ),
				easing
			}
			
		});
		
		element.style.willChange = values.map( v => v._css_property ).join( ',' );
		
		return values;
		
	}
	function apply( values, element ){
		
		var bb = element.getBoundingClientRect();
		var delta = clamp( (bb.top + bb.height) / (innerHeight + bb.height), 0, 1 );
		
		values.forEach(value => {
			
			var propValue = (value.from + (value.to - value.from) * value.easing( delta )) + value.unit;
			
			switch( value.property ){
				
				case 'translateX':
				case 'translateY':
					
					// Only replace the 'translate' value of the transform
					
					let transform = element.style.transform || element.style.webkitTransform || element.style.mozTransform || element.style.msTransform;
					
					if( transform && transform.indexOf( 'translate(' ) >= 0 ){
						
						let split = transform.split('translate(');
						let before = split[ 0 ];
							split = split[ 1 ].split( ')' );
						let after = split.slice( 1 ).join( ')' );
						
						transform = before + 'translate(' + split[ 0 ].split( ',' ).map((v,i) => {
							
							if( value.property === 'translateX' && i === 0 ){ return propValue; }
							if( value.property === 'translateY' && i === 1 ){ return propValue; }
							
							return v;
							
						}).join( ',' ) + ')' + after;
					
					} else {
						
						transform = ((transform || '') + ` translate(${propValue},0)`).trim();
						
					}
					
					element.style.webkitTransform = transform;
					element.style.mozTransform = transform;
					element.style.msTransform = transform;
					element.style.transform = transform;
					
					break;
				
				default:
					
					element.style[ value.property ] = propValue;
			
			}
			
		});
		
	}
	function clamp( value, min, max ){
		
		return value < min ? min : (value > max ? max : value);
		
	}
	function applyAll(){
		
		all.forEach( apply );
		
	}
	
	all.add = function( element ){
		
		all.set( element );
		
	}
	
	all.set = function( element ){
		
		return Map.prototype.set.call( all, element, getValues( element ) );
		
	}
	
	eventThrottleController.add( window, 'scroll', applyAll );
	eventThrottleController.add( window, 'resize', applyAll );
	
	return all;
	
}();