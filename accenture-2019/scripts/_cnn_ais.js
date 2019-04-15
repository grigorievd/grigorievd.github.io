var AIS_VERSION = "ais.cnn.9:modified";
var cnnad_transactionID = null;
function cnnad_getTransactionID() {
	if (cnnad_transactionID == null) {
		cnnad_transactionID = "";
		cnnad_transactionID = Math.round((new Date).getTime() / 1E3) + "" + Math.floor(Math.random() * 9007199254740992)
	}
	return cnnad_transactionID
}
cnnad_getTransactionID();
function cnnad_readCookie(name) {
	if (document.cookie == "")
		return null;
	else {
		var ca = document.cookie.split(";");
		var nameEQ = name + "=";
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ")
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length, c.length)
		}
		return null
	}
}
function cnnad_haveCookie(a) {
	return document.cookie && (-1 < document.cookie.indexOf("; " + a + "=") || document.cookie.indexOf(a + "=") == 0)
}
function cnnad_ugsync() {
	if (!cnnad_haveCookie("ugs"))
		document.write("<scr" + 'ipt src="http://www.ugdt' + 'urner.com/xd.sjs"></scr' + "ipt>")
}
cnnad_ugsync();
window._jsmd_default= window._jsmd_default || {'map':{"cnn main":{"cnn":{"settings":{"visitorNamespace":"cnn"}}}}};
window.slot = window.slot || [0,0,'cnn_international'];
window.Krux || ((Krux = function () {
		Krux.q.push(arguments)
	}).q = []);
	(function () {
	var confid = "ITb_9Zup";
	var k = document.createElement("script");
	k.type = "text/javascript";
	k.async = true;
	var m,
	src = (m = location.href.match(/\bkxsrc=([^&]+)/)) && decodeURIComponent(m[1]);
	k.src = /^https?:\/\/([^\/]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === "disable" ? "" : (location.protocol === "https:" ? "https:" : "http:") + "//cdn.krxd.net/controltag?confid=" + confid;
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(k, s)
})();
window.Krux || ((Krux = function () {
		Krux.q.push(arguments)
	}).q = []);
window.kvs = [];
(function getKruxData() {
	function retrieve(n) {
		var m,
		k = "kx" + n;
		if (window.localStorage)
			return window.localStorage[k] || "";
		else if (navigator.cookieEnabled) {
			m = document.cookie.match(k + "=([^;]*)");
			return m && unescape(m[1]) || ""
		} else
			return ""
	}
	Krux.user = retrieve("user");
	Krux.segments = retrieve("segs") && retrieve("segs").split(",") || [];
	for (var i = 0; i < Krux.segments.length; i++)
		if (kvs.length < 20)
			kvs.push(Krux.segments[i])
})();
function krux_getDESegments() {
	var segmentString = "&kxid=";
	if (Krux.user)
		segmentString += Krux.user;
	segmentString += "&kxseg=" + kvs.join(",");
	return segmentString
}
function krux_getFWSegments() {
	return "kxseg=" + kvs.join(",kxseg=")
}
function turner_getTransactionId() {
	return cnnad_transactionID
}
function turner_getGuid() {
	return cnnad_readCookie("ug")
}
function krux_getUser() {
	return Krux.user
}
function krux_getFWKeyValues(prefix, limit) {
	var segPrefix = prefix || "_fwu:386123:";
	var segLimit = limit || 35;
	var fwKVP = {};
	for (var x = 0; x < Krux.segments.length; x++)
		if (x < segLimit)
			fwKVP[segPrefix + Krux.segments[x]] = 1;
	return fwKVP
}
var pageHost = window.location.hostname.toLowerCase();
if (pageHost.match(/^(etrain|stage)\.next\.cnn\.com/))
	(function () {
		var a = document,
		b = a.createElement("script"),
		a = a.getElementsByTagName("script")[0];
		b.type = "text/javascript";
		b.async = !0;
		b.src = "http://s.moatads.com/turner817ylrv53/moatcontent.js";
		a.parentNode.insertBefore(b, a)
	})();
	