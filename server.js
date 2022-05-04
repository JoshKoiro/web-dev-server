// Standard Packages for express server
const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const server = express();

//Package for using Prince XML
// const Prince = require('prince');

//Set up express server
const port = 5000;
const publicDir = path.join(__dirname,'public');
server.use(express.static(publicDir));

//Setup the front-end files to be notified of the reload
server.use(require('connect-livereload')({
    port: 35729
}));

// Set up live reload server
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDir, publicDir + '/css', publicDir + '/markdown', publicDir + '/images');

server.get('/', function(req,res,next) {
    res.sendFile('./public/index.html')
})

server.listen(port, () => {
    console.log('Express Server Running on port ' + port)
});