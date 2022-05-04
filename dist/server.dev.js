"use strict";

// Standard Packages for express server
var express = require('express');

var _require = require('fs'),
    appendFile = _require.appendFile;

var path = require('path');

var server = express(); //Package for using Prince XML
// const Prince = require('prince');
//Set up express server

var port = 5000;
var publicDir = path.join(__dirname, 'public');
server.use(express["static"](publicDir)); //Setup the front-end files to be notified of the reload

server.use(require('connect-livereload')({
  port: 35729
})); // Set up live reload server

var livereload = require('livereload');

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDir, publicDir + '/css', publicDir + '/markdown', publicDir + '/images');
server.get('/', function (req, res, next) {
  res.sendFile('./public/index.html');
});
server.listen(port, function () {
  console.log('Express Server Running on port ' + port);
});