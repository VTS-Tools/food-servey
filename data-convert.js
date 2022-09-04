const fs = require('fs-extra');

['coffee', 'cafe'].forEach(it => {
	var data = fs.readJSONSync(`./result-${it}.json`);
	var newFormat = [];
	Object.keys(data).forEach(k => {
		newFormat.push({ key: k, value: data[k] });
	})
	fs.outputFileSync(`./result-format-${it}.json`, JSON.stringify(newFormat, null, 4));
});