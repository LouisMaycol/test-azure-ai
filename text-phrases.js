'use strict';

let https = require('https');
let config = require('./config.json');

let accessKey = config.access_key_1;

let uri = 'southeastasia.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/keyPhrases';

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

let get_key_phrases = function (documents) {
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
	'documents': [
		{ 'id': '1', 'languge': 'en', 'text': 'I want my money now!' }
	]
};

get_key_phrases(documents);