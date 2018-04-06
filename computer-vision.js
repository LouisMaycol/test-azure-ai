let https = require('https');
let config = require('./config.json');

let accessKey = config.access_key_1_cv;

let uri = 'southeastasia.api.cognitive.microsoft.com';
let path = '/vision/v1.0/analyze?visualFeatures=Categories,Description,Color&language=en';

let response_handler = function (response) {
	let body = '';
	response.on('data', function (d) {
		body += d;
	});
	response.on('end', function () {
		let body_ = JSON.parse(body);
		let body__ = JSON.stringify(body_, null, '  ');
		console.log(body__);
	});
	response.on('error', function (e) {
		console.log('Error: ' + e.message);
	});
};

let analyzeImage = function (documents) {
	let body = JSON.stringify(documents);

	let request_params = {
		method: 'POST',
		hostname: uri,
		path: path,
		headers: {
			'Ocp-Apim-Subscription-Key': accessKey,
		}
	};

	let req = https.request(request_params, response_handler);
	req.write(body);
	req.end();
}

let documents = {
	url: 'http://d2pa5gi5n2e1an.cloudfront.net/global/images/product/cars/Toyota_Vios/Toyota_Vios_L_1.jpg'
};

analyzeImage(documents);