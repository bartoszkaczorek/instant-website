/* global process */

var InstantWebsiteApp = require('./InstantWebsiteApp');

var program = require('commander');

program.version('1.0.0')

.option('--website-dir [path]', 'Website directory path')

.option('--index-path [path]', 'Index page path')

.parse(process.argv);

var app = new InstantWebsiteApp(program);
app.start();
