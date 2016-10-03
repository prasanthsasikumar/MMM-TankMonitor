'use strict';

/* Magic Mirror
 * Module: MMM-TankMonitor
 *
 * By prasanthsasikumar http://www.github.com/prasanthsasikumar/MMM-TankMonitor
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	/*readSensor: function() {
		var self = this;
		var readout = dht.read();
		self.sendSocketNotification("DATA", readout);
		setTimeout(function() {
			self.readSensor();
		}, this.config.refreshInterval);
	},*/

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.started = true;
		}
	}
});
