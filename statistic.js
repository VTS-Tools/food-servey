const fs = require('fs-extra');
const util = require('util');


['', 'coffee', 'cafe'].forEach(q => {
    var filename = './result-format' + (q !== "" ? "-" + q : "") + '.json';
    console.log(filename);
    var data = fs.readJSONSync(filename);
    var total = 0;
    var filters = [];
    try {
		let tmp = [];
        data.forEach(it => {
            total += it.value;
            if (it.value >= 700) {
                filters.push(util.format('%s: %d', it.key, it.value));
				tmp.push({ 'key': it.key, 'value': it.value });
            }
        })

        console.log("=========== %s", q)
        console.log("Total: %d cửa hàng", total);
        console.log(filters);
		fs.outputFileSync(`./result-${q}-top500.json`, JSON.stringify(tmp, null, 4));
    } catch (e) {
        console.error(e);
    }
})