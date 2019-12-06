/*
 * In Viewport Class Controller
 * -----------------------------
 * (C) Jasper Linsen 2017 - Updated 9/12/2017
 * -----------------------------
 * This controller is a Map Object to which you can add elements. It has the additional method `add` for semantic use, but it is just a shim of 'set';
 * The element should have at least a `data-viewport-class` attribute. The attribute can be empty, and
 * it will default to the `in-viewport` class for marking the element in view.
 *
 * @method add( element: HTMLElement[, className: String ] )
 * Adds the element to be evaluated for viewport class marking. 
 * Add custom class if the element has no `data-viewport-class` attribute of it's own.
 *
 * <HTMLElement>
 * -------------
 * @attribute data-viewport-class
 * The classname to be added to the element.
 */

const inViewportClassController = function(){
	
	var all = new Map;
	
	function dispatchEvent( element, type ){
		
		try {
			
			element.dispatchEvent( new CustomEvent( type, { detail: { controller: all } } ) );
		
		} catch( e ){}
		
	}
	function check( className, element ){
		
		var bb = element.getBoundingClientRect();
		var should = !(bb.top > innerHeight || bb.bottom < 0);
		var is = element.classList.contains( className );
		
		if( should && !is ){
			
			element.classList.add( className );
			dispatchEvent( element, 'viewport-enter' );
			
		} else if( !should && is ){
			
			element.classList.remove( className );
			dispatchEvent( element, 'viewport-leave' );
						
		}
		
	}
	function checkAll(){
	
		all.forEach( check );
	
	}
	
	all.add = function(){
		
		all.set( ...arguments );
		
	}
		
	all.set = function( element, className ){
		
		className = className || element.getAttribute( 'data-viewport-class' ) || 'in-viewport';
	
		check( className, element );
	
		return Map.prototype.set.call( all, element, className );
		
	}
	
	eventThrottleController.add( window, 'scroll', checkAll );
	
	return all;
	
}();