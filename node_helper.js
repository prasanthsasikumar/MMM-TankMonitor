'use strict';

/* Magic Mirror
 * Module: MMM-TankMonitor
 *
 * By prasanthsasikumar http://www.github.com/prasanthsasikumar/MMM-TankMonitor
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var statistics = require('math-statistics');
var usonic = require('mmm-usonic');

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	initialize: function() {
		var self = this;
		usonic.init(function(error) {
			if (error) {
				console.log(error);
			} else {
				self.readSensor();
			}
		});
	},

	readSensor: function() {
		var self = this;
		var sensor = usonic.createSensor(self.config.echoPin, self.config.triggerPin,
			self.config.timeout);

		console.log('Config: ' + JSON.stringify(self.config));

		var distances;

		(function measure() {
			if (distances) {}
			if (!distances || distances.length === self.config.rate) {
				if (distances) {
					self.print(distances);
				}

				distances = [];
			}

			setTimeout(function() {
				distances.push(sensor());

				measure();
			}, self.config.delay);
		}());
	},

	print: function(distances) {
		var self = this;
		var distance = statistics.median(distances);

		if (distance < 0) {
			console.log('Error: Measurement timeout.\n');
		} else {
			console.log('Distance: ' + distance.toFixed(2) + ' cm');
			self.sendSocketNotification('DATA', distance);
		}
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.started = true;
			self.initialize();
		}
	}
});
