# Magic Mirror Module: JSON Value

This extension module for the [Magic Mirror](https://github.com/MichMich/MagicMirror) allows you to show information from any JSON on your mirror using an HTTP Request to an REST API. The module supports multiple instances to e.g. display values from different sources.

## Screenshots
![json_values.png](https://github.com/c-klinger/MMM-JsonValue/raw/main/doc/json_values.png)

![json_values_numfrmt_tally.png](/doc/json_values_numfrmt_tally.png)

The screenshot above shows an example of Pocket Money using numberFormat with minorUnits and Reward Status using iconTally. The value from the source for pocket money is `500` and Reward Status returns  `1` and `2` which in turn displays a tally with icons.

## Installation

- (1) Clone this repository in your `modules` folder, and install dependencies:
```bash
cd ~/MagicMirror/modules # adapt directory if you are using a different one
git clone https://github.com/c-klinger/MMM-JsonValue.git
cd MMM-JsonValue
npm install
```

- (2) Add the module to your `config/config.js` file. The default configuration displays a random quote using [quotable.io](http://quotable.io/).
```js
{
	module: "MMM-JsonValue",
	position: "top_left",
	config: {
		apiBase: 'https://api.quotable.io/random',
		method: "GET",

		title: "MM API TEST",
		icon: "fa-quote-right",
		prefix: "Quote: \"",
		suffix: "\" (from https://api.quotable.io/random)",
		jsonPath: "content",
		headers: {},
		iconTally: false,
		numberFormat: null, // { style: 'currency', currency: 'GBP' },			
		numberFormatLocale: undefined,
		minorUnits: false,					
		refreshInterval: 1000 * 60, // refresh every minute
		
		//skipPadding: true, // yo can un-comment this line if you want to display a related value below; using a second instance.
	}
 },
```

## Additional Configuration

### Custom HTTP Headers
You can add custom HTTP Headers to the configuration of each widget, this might be useful for cache control or authentification:
```js
{
	module: "MMM-JsonValue",
	position: "top_left",
	config: {
		//...
		headers: {'Authorization': 'Bearer SecretToken'}
		//...
	}
 },
```

### Number Formatting with Intl.NumberFormat
The value can be processed via Intl.NumberFormat which enables language-sensitive number formatting.
```js
{
	module: "MMM-JsonValue",
	position: "top_left",
	config: {
		//...
		numberFormat: { style: 'currency', currency: 'GBP' },
		//or "{ style: 'unit', unit: 'miles-per-hour' }"			
		numberFormatLocale: undefined, // undefined - Uses the the implementation's default locale, change this to a BCP 47 language tag if required.
		minorUnits: true // Used by NumberFormat to return minor units. Set to true if value returned is in pence for example, 250 will be set 2.50 before passing into Intl.NumberFormat	
		//...
	}
 },
```

### Display Value as Icon Tally
The value will be processed as a tally of the configured icon. As shown in the screenshot above.
```js
{
	module: "MMM-JsonValue",
	position: "top_left",
	config: {
		//...
		icon: "fa fa-star",
		iconTally: true	
		//...
	}
 },
 ```

## Update

Update this module by navigating into its folder on the command line and using `git pull`:

```bash
cd ~/MagicMirror/modules/MMM-JsonValue # adapt directory if you are using a different one
git pull
npm install # install (new) dependencies
```
