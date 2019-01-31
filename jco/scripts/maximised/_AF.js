/* 
 * AnimationFrameController v3.0 (AF)
 * ----------------------------------
 * (C) Jasper Linsen 2017
 * ----------------------------------
 * The AF is an extended Map object containing functions that 
 * need to be called every animation frame.
 *
 * The following methods have been added to the Map:
 *
 * @method add( handler:Function )
 * Add a function to call every animation frame. Return false to remove the function.
 * @method remove( handler: Function )
 * Remove a handler from the animation frame. 
 * Called internally when the handler returns false.
 *
 * The following properties have been added to the Map:
 *
 * @get time: Number
 * Returns the running total of uptime on the AF
 * @get @set paused: Bool
 * Returns the current running state of the AF. 
 * Set the current running state of the AF.
 * 
 * The following arguments will be passed to every handler when running:
 *
 * @arg delta: Number
 * The time (in milliseconds) since the last call
 * @arg progress: Number
 * The time (in milliseconds) since the handler was added to the AF
 * @arg time: Number
 * The total uptime (in milliseconds) the AF has been running. (Equivalent to AF.time)
 *
 */
 
const AF = function(){
	
	/* The class based implementation of Map */
	
	
	/* The actual looping function */
	
	function loop( time ){
		
		var delta = time - (timeRunning + timePaused);
		
		if( paused ){
			
			timePaused += delta;
			
		} else {
			
			timeRunning += delta;
			
			controller.forEach(( data, handler ) => {
				
				if( handler( delta, timeRunning - data.start, timeRunning ) === false || --data.repeat < 0 ){
					
					controller.delete( handler );
					
				}
				
			});
			
		}
		
		window.requestAnimationFrame( loop );
		
	}
	
	var timeRunning = 0;
	var timePaused = 0;
	var paused = false;
	var controller = new Map;
	
	Object.defineProperties(controller, {
		time: {
			get time(){
			
				return timeRunning;
			
			}
		},
		paused: {
		
			get(){
			
				return paused;
			
			},
			set( bool ){
			
				return (paused = !!_paused);
			
			}
		
		}
	});
	
	controller.add = function(){
		
		this.set( ...arguments );
		
	}
	
	controller.set = function( handler, repetitions = Infinity ){
	
		if( !this.has( handler ) ){
			
			Map.prototype.set.call( controller, handler, { start: timeRunning, repeat: repetitions } );
		
		} else if( handlers.get( handler ).repeat !== repetitions ){
			
			Map.prototype.get.call( controller, handler ).repeat = repetitions;
			
		}
		
		return this;
		
	}
	
	controller.remove = function( handler ){
		
		this.delete( handler );
		
		return this;
		
	}
	
	window.requestAnimationFrame( loop );
	
	return controller;
	
}();