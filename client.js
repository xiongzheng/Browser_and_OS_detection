(function() {
	var BrowserDetect = {
		init : function() {
			this.browser = this.searchString(this.dataBrowser) || 'Unknown';
			this.browserVersion = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion) || "Unknown";
			this.os = this.searchString(this.dataOs) || 'Unknown';
			this.osVersion = this.searchString(this.dataOsVersion) || 'Unknown';
		},
		searchString : function(data) {
			for ( var i = 0; i < data.length; i++) {
				var dataIdentityRegExGroups = data[i].identityRegExGroups;
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch
						|| data[i].identity;
				if (dataIdentityRegExGroups) {
					var matches = dataIdentityRegExGroups.exec(dataString);
					if (matches) {
						return matches[1];
					}
				} else if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				} else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion : function(dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1)
				return;
			return parseFloat(dataString.substring(index
					+ this.versionSearchString.length + 1));
		},
		dataBrowser : [ {
			string : navigator.userAgent,
			subString : "Chrome",
			identity : "Chrome"
		}, {
			string : navigator.userAgent,
			subString : "OmniWeb",
			versionSearch : "OmniWeb/",
			identity : "OmniWeb"
		}, {
			string : navigator.vendor,
			subString : "Apple",
			identity : "Safari",
			versionSearch : "Version"
		}, {
			prop : window.opera,
			identity : "Opera"
		}, {
			string : navigator.vendor,
			subString : "iCab",
			identity : "iCab"
		}, {
			string : navigator.vendor,
			subString : "KDE",
			identity : "Konqueror"
		}, {
			string : navigator.userAgent,
			subString : "Firefox",
			identity : "Firefox"
		}, {
			string : navigator.vendor,
			subString : "Camino",
			identity : "Camino"
		}, { // for newer Netscapes (6+)
			string : navigator.userAgent,
			subString : "Netscape",
			identity : "Netscape"
		}, {
			string : navigator.userAgent,
			subString : "MSIE",
			identity : "Internet Explorer",
			versionSearch : "MSIE"
		}, {
			string : navigator.userAgent,
			subString : "Gecko",
			identity : "Mozilla",
			versionSearch : "rv"
		}, { // for older Netscapes (4-)
			string : navigator.userAgent,
			subString : "Mozilla",
			identity : "Netscape",
			versionSearch : "Mozilla"
		} ],
		dataOs : [ {
			string : navigator.platform,
			subString : "Win",
			identity : "Windows"
		}, {
			string : navigator.platform,
			subString : "Mac",
			identity : "Mac"
		}, {
			string : navigator.userAgent,
			subString : "iPhone",
			identity : "iPhone/iPod"
		}, {
			string : navigator.platform,
			subString : "Linux",
			identity : "Linux"
		} ],
		dataOsVersion : [ {
			string : navigator.userAgent,
			subString : "Windows NT 5.0",
			identity : "Windows NT"
		}, {
			string : navigator.userAgent,
			subString : "Windows NT 5.1",
			identity : "Windows XP"
		}, {
			string : navigator.userAgent,
			subString : "Windows NT 6.0",
			identity : "Windows Vista"
		}, {
			string : navigator.userAgent,
			subString : "Windows NT 6.1",
			identity : "Windows 7"
		}, {
			string : navigator.userAgent,
			subString : "Windows NT 6.2",
			identity : "Windows 8"
		}, {
			string : navigator.userAgent,
			subString : "Mac OS X",
			identityRegExGroups : /Mac OS X ([^_|^.)]+)/gi
		}, {
			string : navigator.userAgent,
			subString : "Linux",
			identityRegExGroups : /X11; ([^\)]+)/gi
		} ]
	};
	BrowserDetect.init();
	window.client = {
		browser : BrowserDetect.browser,
		browserVersion : BrowserDetect.browserVersion,
		os : BrowserDetect.os,
		osVersion : BrowserDetect.osVersion
	};
})();