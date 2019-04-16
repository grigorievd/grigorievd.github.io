/*
 * Event Throttle Controller
 * -----------------------------
 * (C) Jasper Linsen 2017 - Updated 9/12/2017
 * -----------------------------
 * This controller is a Map Object to which you can add elements. It has the additional method `add`, use this to correctly add objects.
 *
 * @method add( object: HTMLElement, event: String, handler:Function )
 * Starts listening and calling handlers when an event is triggered on the object.
 *
 * @method remove( object: HTMLElement, event: String, handler:Function )
 * Removes an event handler from the object, removes global event listening if no handlers remain.
 *
 * @attr throttle
 * The interval (in milliseconds) to fire the events at. If zero, it will use the Animation Frame rate.
 */
 
const eventThrottleController = function(){
	
	var map = new Map;
	var toDispatch = new Set;
	var throttle = 0;
	var throttleDelay = 0;
	
	function __test(){
		
		document.body.style.height = innerHeight * 10 + 'px';
		map.add( document, 'scroll', e => {
			
			console.log(1);
			e.stopImmediatePropagation();
			
		} );
		map.add( document, 'scroll', e => {
			
			// If stopImmediatePropagation(), this should not log
			console.log(2);
			
		} );
		
		// fire overwrites the stopImmediate... as it WILL fire all handlers
		fire( 'scroll' );
		
	}
	function dispatch( delta ){
		
		throttleDelay += delta;
		
		if( throttleDelay > throttle ){
		
			throttleDelay = 0;
			
			toDispatch.forEach(details => {
				
				details.last.stopImmediatePropagation = function(){
					
					details.stoppedImmediatePropagation = true;
					
				};
				
				details.handlers.forEach( handler => {
					details.stoppedImmediatePropagation === false
						? handler( details.last )
						: false
				});
				
				details.last = null;
				toDispatch.delete( details );
				details.stoppedImmediatePropagation = false;
			
			});
		
		}
		
	}
	function add( object, event, handler ){
		
		var list = map.get( object );
		
		if( !list ){
			
			list = {};
			
			Map.prototype.set.call( map, object, list );
			
		}
		
		var details = list[ event ];
		
		if( !details ){
			
			list[ event ] = details = {
				
				last: null,
				handler( event ){
				
					details.last = event;
					toDispatch.add( details );
					
				},
				handlers: new Set,
				stoppedImmediatePropagation: false
				
			};
			
			object.addEventListener( event, details.handler );
			
		}
		
		details.handlers.add( handler );
		
	}
	function remove( object, event, handler ){
		
		var list = map.get( object );
		
		if( list && list[ event ] ){
			
			list[ event ].handlers.delete( handler );
			
			if( list[ event ].handlers.size === 0 ){
				
				delete list[ event ];
				object.removeEventListener( event, list[ event ].handler );
				
			}
			
		}
		
	}
	function fire( customEvent ){
		
		if( typeof customEvent === 'string' ){
			
			customEvent = new CustomEvent( customEvent, {} );
			
		}
		
		map.forEach(( list, object ) => {
			
			if( list[ customEvent.type ] ){
				
				list[ customEvent.type ].handlers.forEach( handler => handler( customEvent ) );
				
			}
			
		})
		
	}
	
	map.set = (...args) => add( ...args );
	map.add = add;
	map.remove = remove;
	map.dispatch = dispatch;
	map.fire = fire;
	
	Object.defineProperty( map, 'throttle', {
		
		get(){
			
			return throttle;
			
		},
		
		set( milliseconds ){
			
			if( typeof milliseconds === 'number' ){
				
				throttle = milliseconds;
				
			}
			
		}
		
	});
	
	AF.add( dispatch );
	
	return map;
	
}();