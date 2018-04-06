let https = require('https');
let config = require('./config.json');

let accessKey = config.access_key_1_face;

let uri = 'southeastasia.api.cognitive.microsoft.com';
let path = '/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise';

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
	url: 'https://lignumdraco.files.wordpress.com/2015/09/all-the-lonely-people-3.jpg'
};

analyzeImage(documents);