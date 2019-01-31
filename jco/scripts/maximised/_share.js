/*
 * Construct Share v3.1
 * Updated version on 01/07/2017
 *
 * Fill (or create) a dom wrapper filled with the required social links or sharing this page
 *
 * constructShare([div:Node, options:Object]);
 * -> div:Node.childNodes([a:Node, ...]);
 */

const createShareElement = function(){

	var shareText = "I would like to share this page: {articleUrl}";
	var networkUrls = {
		linkedin 	: "http://www.linkedin.com/shareArticle?mini=true&url={articleUrl}&cachabuster={cachebuster}",
		facebook 	: "https://www.facebook.com/sharer/sharer.php?u={articleUrl}",
		twitter 	: "https://twitter.com/home?status={articleUrl}",
		email	 	: "mailto:?subject={subject}&body="+encodeURIComponent(shareText),
		googleplus 	: "https://plus.google.com/share?url={articleUrl}"
	};

	return function shareElements({
		url = location.href,
		type = 'a',
		className = 'share__',
		networks = [ 'facebook' , 'twitter' , 'email', 'linkedin' ],
		title = encodeURIComponent( document.title ),
		wrapper = 'div',
		urls = networkUrls
	}){

		return networks.reduce((wrapper, network) => {
		
			let link = document.createElement( type );
			
			link.className = className + network;
			link.href = urls[ network ]
				.replace('{articleUrl}', url)
				.replace('{subject}', title)
				.replace('{cachebuster}', Date.now());
			link.target = "_blank";
			link.textContent = 'share on ' + network;
			
			wrapper.appendChild( link );
			
			return wrapper;
			
		}, typeof wrapper === 'string' ? document.createElement( wrapper ) : wrapper );

	}

}();
