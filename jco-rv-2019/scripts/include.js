/*
 * To allow finding matches in IE11, here is a rough poylfill
 */
 
Array.prototype.find = Array.prototype.find || function( handler ){

	for( var i = 0; i < this.length; i++ ){
	
		if( handler( this[ i ], i, this ) != false ){
		
			return this[ i ];
		
		}
	
	}

	return null;

}

 /*
 * String.trim polyfill, again for IE
 */
 
String.prototype.trim = String.prototype.trim || function(){
	
	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

}

/*
 * Here are some rough parameters you can check against for decisions on which files to include.
 */

var DEVELOPMENT = [ 'localhost', 'development=true', 'file://' ].find(function( key ){

	return location.href.indexOf( key ) >= 0;
	
}) && ![ 'production' ].find(function( key ){

	return (location.href.split('?')[1] || '').indexOf( key ) >= 0;
	
});

var IE = [ 'trident', 'msie' ].find(function( key ){

	return navigator.userAgent.toLowerCase().indexOf( key ) >= 0;
	
});

var ES6 = function(){
	
	try {
		
		eval('const map = new WeakMap; const template = `1 + 2 = ${1+2}`; if( map instanceof WeakMap ){ let object = {}; map.set( object, `yes` ); map.delete( object );  }; const generator = function*( i ){ while( i < 5 ){ yield i++; } };');
		return true;
		
	} catch( e ){
		
		return false;
		
	}
	
}();

/*
 * include( url:String [, callback:Function ] );
 * Updated version on 04/10/2017
 * 
 * Load a script file, fire callback after load.
 * All scripts will be loaded sequentially. When an error occurs, the next script will be loaded
 * and the callback will not be called.
 */

var include = function(){
	
	var queue = [];
	var current = 0;
	var cachebusting = [ 'cache', 'bust' ].find(function( key ){

		return (location.href.split('?')[1] || '').indexOf( key ) >= 0;
	
	}) ? '?cachebuster=' + Date.now() : '';
	
	function log(){
		
		//console.log( ...arguments );
		return;
		
	}
	
	function start(){
		
		var script;
		
		if( queue[ current ].completed !== false && current + 1 < queue.length ){
			
			current++;
			start();
			
		} else if( queue[ current ].started === false ){
			
			queue[ current ].started = Date.now();
			
			script = document.createElement('script');
			
			script.addEventListener('load', function(){
			
				queue[ current ].completed = Date.now();
				queue[ current ].status = script;
				
				if( queue[ current ].callback ){
					queue[ current ].callback();
					
				}
				
				log( 'Load', queue[ current ] );
				start();
				
			});
			script.addEventListener('error', function( error ){
			
				queue[ current ].status = error;
				
				log( 'Error', queue[ current ] );
				start();
				
			});
			
			script.type = 'text/javascript';
			script.src = queue[ current ].source + cachebusting;
			
			document.body.appendChild( script );
			
		}
		
	}
	
	function add( source, callback ){
		
		queue.push({ source: source, started: false, status: null, completed: false, callback: callback });
		
		start();
		
	}
	
	add.queue = queue;
	
	return add;
	
}();