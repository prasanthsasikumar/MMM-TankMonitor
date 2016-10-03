/* Magic Mirror
 * Module: MMM-TankMonitor
 *
 * By prasanthsasikumar http://www.github.com/prasanthsasikumar/MMM-TankMonitor
 * MIT Licensed.
 */

Module.register("MMM-TankMonitor", {

  defaults: {
    echoPin: 17,
    triggerPin: 18,
    timeout: 750,
    delay: 600, //Time before successive readings
    rate: 5,
    tanks: [{
      label: "Tank 1",
      value: 50,
    }, {
      label: "Tank 2",
      value: 150,
    }, ],
    started: false
  },

  getStyles: function() {
    return ["MMM-TankMonitor.css"];
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.sendSocketNotification('CONFIG', this.config);
    var self = this;
    setTimeout(function() {
      self.updateTanks();
    }, 5000);
    this.config.started = true;
  },

  /**since we are updating css directly from here,
  updateDom() call is  not needed for changes to reflect*/
  updateTanks: function() {
    var self = this;
    if (!self.config.started) {
      return false;
    }
    var y = document.getElementsByClassName('wave');
    for (var i = 0; i < self.config.tanks.length; i++) {
      var wave = y[i];
      var value = "200px ";
      value += self.config.tanks[i].value;
      value += "px";
      wave.style["background-size"] = value;
    }
  },

  getDom: function() {

    var wrapper = document.createElement("table");
    wrapper.className = "small";

    var tanks = document.createElement("tr");
    var labels = document.createElement("tr");
    for (var i = 0; i < this.config.tanks.length; i++) {
      var tank = document.createElement("td");
      var label = document.createElement("td");
      tank.innerHTML += "<div class=\"tank wave\">I</div>";
      label.innerHTML = this.config.tanks[i].label;
      tanks.appendChild(tank);
      labels.appendChild(label);
    }
    wrapper.appendChild(tanks);
    wrapper.appendChild(labels);

    return wrapper;
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "DATA") {
      this.config.tanks[0].value = payload;
      console.log(this.config.tanks[0].value);
      this.updateTanks();
    }
  }
});
