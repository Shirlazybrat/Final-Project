// Angular routes are considers cross-origin. Cross-origin is
// only supported for: HTTP, https, ftp. Our propttcol is
// "file://". This requires something with http, https ftp etc. at the beginning for the route.
// Node js is our answer! With the connect module and the serStatic module, we can serve pages
// This involves:
// 1. npm init -- this will create a package.json file in your folder. Package.json
// 2.
// 3.
// 4.
// THIS FILE!!
// Node wil then serve up anythin it finds like usual via, http, at http:: localhost:8000
// solving our problem!

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8000, function(){
    console.log("Listening on port 8000");    
});
