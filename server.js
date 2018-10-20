const fs = require('fs');
const readline = require('readline');
const mime = require('mime');
const url = require('url');
const util = require('util');

const PORT = 8001;

let server = require('http').createServer(function(req, res) {
  console.log("Got request!", req.method, req.url);
  
  let path = url.parse(req.url, true).pathname;

  let safePath = path.split('/').filter(function(e) { return ! e.startsWith('.'); }).join('/')
  if (safePath === '/') {
    safePath = '/index.html';
  }
  try {
    let fullPath = 'public' + safePath;
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      res.writeHead(200, {'Content-Type': mime.getType(safePath)});
      fs.createReadStream(fullPath).pipe(res);
    } else {
      console.log("No such file for request", path);
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end("Couldn't find file for", path);
    }
  } catch (err) {
    console.log("Error reading static file?", err);
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.end("Failed to load something...try again later?");
  }
});

server.listen(PORT);
console.log("Listening on port", PORT);
