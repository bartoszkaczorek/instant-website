/* global module */

var browserUtil = require('browser-util');

var nodeStatic = require('node-static');

var util = require('util');

var portfinder = require('portfinder');

var http = require('http');

var defaults = require('../config/defaults.json');

var log4js = require('log4js');

var logger = log4js.getLogger();


function InstantWebsiteApp(config) {
	this.config = config;

	portfinder.basePort = defaults.basePort;

	logger.info('basePort: %s', defaults.basePort);
	logger.info('websiteDir: %s', this.config.websiteDir);
}

InstantWebsiteApp.prototype.start = function() {
	'use strict';

	var file = new nodeStatic.Server(this.config.websiteDir);

	var indexPath = this.config.indexPath;
	

	portfinder.getPort(function (err, port) {

		logger.info('Found free port: %s', port);

		http.createServer(function (request, response) {
			request.addListener('end', function () {
				file.serve(request, response);
			}).resume();

		}).listen(port);

		logger.info('Listening on: %s', port);
		
		var pageUrl = util.format('http://localhost:%s/%s', port, indexPath);

		logger.info('Opening url: %s', pageUrl);

		browserUtil.start('chrome', pageUrl);
	});

}

module.exports = InstantWebsiteApp;