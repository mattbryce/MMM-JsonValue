/* Magic Mirror
 * Module: MMM-JsonValue
 *
 * By Chris Klinger, http://chrisklinger.de
 * MIT Licensed.
 */

Module.register("MMM-JsonValue", {
	defaults: {
		apiBase: 'https://api.quotable.io/random',
		method: "GET",

		title: "MM API TEST",
		icon: "fa-quote-right",
		prefix: "Quote: \"",
		suffix: "\" (from https://api.quotable.io/random)",
		jsonPath: "content",
		headers: {},
		iconTally: false, // If set to true, the value will be processed as a tally of the configured icon.
		financial: false, // If set to true, value will be processed via Intl.NumberFormat object according to set style, currency and minorUnit  
		style: 'currency', // Intl.NumberFormat style option
		currency: 'GBP', // aIntl.NumberFormat currency option
		minorUnits: true, // Set to true if value returned is in pence for example, 250 will be set 2.50 before passing into Intl.NumberFormat
								
		refreshInterval: 1000 * 60, // refresh every minute
	},

	getStyles: function () {
	  return ["font-awesome.css"];
	},

	start: function () {
		this.loaded = false;
		this.value = "";
		this.config.instanceID = this.identifier
		this.sendSocketNotification('CONFIG', this.config);
	},

	getHeader: function () {
		return this.config.title ? this.config.title : "";
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
			return wrapper;
		}
        //Process as financial data if set in config
        if (this.config.financial) {
			//Treat the value as a minorUnit e.g pence. "250" will be converted to "2.50" or "25000" wil>
if (this.config.minorUnits){
	var value = this.value / 100;
}
else {
	var value = this.value;
}

// Create the number formatter.
var formatter = new Intl.NumberFormat(undefined, {
style: this.config.style,
currency: this.config.currency,
});

var amount = formatter.format(value); // e.g.£2,500.00

wrapper.innerHTML = this.config.prefix + amount + this.config.suffix;
}

//Create the icon tally
else if(this.config.iconTally){
	  var intValue = parseInt(this.value); //convert value from string to integer for the for loop
	  wrapper.innerHTML = wrapper.innerHTML + this.config.prefix;
	for (let i = 0; i < intValue; i++) {
	  wrapper.innerHTML = wrapper.innerHTML + "<span class=\"" + this.config.icon + "\"></span>";
  }
	wrapper.innerHTML = wrapper.innerHTML + this.config.suffix;
}
else { //otherwise process value as normal
	wrapper.innerHTML = this.config.prefix + this.value + this.config.suffix;
	if(this.config.icon) {
		wrapper.innerHTML = "<span class=\"" + this.config.icon + "\"></span>" + wrapper.innerHTML;
	} 
}
		if(this.config.skipPadding) {
			wrapper.style = "margin-block-end: -30px;";
		}
		return wrapper;
	},

	notificationReceived: function() {},

 	socketNotificationReceived: function(notification, payload) {
		if(payload.instanceID === this.config.instanceID) {
    		if (notification === "STARTED") {
				this.updateDom();
			}
			else if (notification === "DATA") {
				this.loaded = true;
				Log.info(payload);
				this.value = payload.data;
				this.updateDom();
    		}
    	}
	}
})