/*
 *    Copyright 2015 Dzmitry Lazerka
 *
 *    This file is part of Click Through.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 2 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 *    Home: https://github.com/dlazerka/clickthrough
 */

'use strict';
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var catchers = [
		/^https?:\/\/(www\.)?googleadservices\.com.*?&adurl=(http[^&]*)/,
		/^https?:\/\/(www\.)?clickserve\.dartsearch\.net.*?&ds_dest_url=(http[^&]*)/,
		/^https?:\/\/(www\.)?click\.icptrack\.com.*?&destination=(http[^&]*)/
	];

	catchers.forEach(function(regexp) {
		var match = regexp.exec(tab.url);
		if (match) {
			console.info('Detected click-through, redirecting...');

			var newUrl = decodeURIComponent(match[2]);
			chrome.tabs.update(tabId, {url: newUrl}, function() {
				console.trace('Redirect successful');
			});
		}
	});

});
