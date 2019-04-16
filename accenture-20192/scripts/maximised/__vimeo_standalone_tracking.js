/* Use `addCNNVimeoTracking( <iframe>|Player )` to add tracking to a vimeo iframe.
 * Be aware that the Vimeo API needs to be loaded on the page for this to work.
 * For more info on the Vimeo API go to: https://github.com/vimeo/player.js
 * To tie this in with other APIs (like plyr), just make sure you 
 * can get the API from Vimeo through the other API.
 * @arg iframeOrAPI:<iframe>|Player
 * Pass in either the vimeo <iframe> element, or an already available API
 */

function DispatchAdobeTagEvent( detail ){
	
	/* Try to dispatch an event */
	
	try {

		window.dispatchEvent( new CustomEvent( 'adobetagevent', { detail } ) );
		return true;
		
	} catch(e){
		
		return false;
		
	}

}
function addCNNVimeoTracking( iframeOrAPI ){

	if( DispatchAdobeTagEvent({ action: 'event-tracking-check' }) === false ){
		
		/* Tracking is not supported on this browser as no custom events can be fired. */
		return;
		
	}
	
	var title = 'Awaiting title...';
	var id = 'Awaiting url...';
	var duration = 0;
	var API = iframeOrAPI instanceof HTMLElement
		? new Vimeo.Player( iframe ) : iframeOrAPI;

	API.ready().then(function(){

		/* Get some video info */
		
		API.getDuration().then(number => {

			duration = number;

		});
		
		API.getVideoTitle().then(string => {

			title = string;
			console.log( 'Added tracking to video ' + title );

		});
		
		API.getVideoId().then(string => {

			id = string;

		});
		
		/* Listen for some common events and dispatch a more global event */
		
		API.on('ended', event => DispatchAdobeTagEvent({
			source: id,
			title: title,
			action: 'ended'
		}));

		API.on('play', event => DispatchAdobeTagEvent({
			source: id,
			title: title,
			action: 'play'
		}));

		API.on('pause', event => DispatchAdobeTagEvent({
			source: id,
			title: title,
			action: 'pause'
		}));

		var lastMilestone = 0;
		
		/* Calculate an dispatch milestones (25%, 50%, ...) */

		API.on('timeupdate', event => DispatchAdobeTagEvent({
			source: id,
			title: title,
			action: 'time',
			milestone: ((event.percent - (event.percent % .25)) || 0),
			isMilestone: function(){

				var m = ((event.percent - (event.percent % .25)) || 0);

				if( m - lastMilestone > .25 || m - lastMilestone < 0 ){

					lastMilestone = m;
					return true;

				} else {

					return false;

				}

			}(),
			value: event.percent,
			duration
		}));

	});

};