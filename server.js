// Standard Packages for express server
const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const server = express();

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
liveReloadServer.watch(publicDir);

// Set up the markdown converter
const md = require('markdown-it')({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
    linkify:      true,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer:  true,
})

server.get('/', function(req,res,next) {
    res.sendFile('./public/index.html')
})

server.listen(port, () => {
    console.log('Express Server Running on port ' + port)
});