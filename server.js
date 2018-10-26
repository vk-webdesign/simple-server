const fs = require('fs');
const readline = require('readline');
const mime = require('mime');
const url = require('url');
const util = require('util');

const PORT = 8001;

function isSafeComponent(pathComponent) {
  return ! pathComponent.startsWith('.');
}

function handleRequest(req, res) {
  console.log("REQ:", req.method, req.url);
  
  let path = url.parse(req.url, true).pathname;

  let safePath = path.split('/').filter(isSafeComponent).join('/')
  if (safePath === '/') {
    safePath = '/index.html';
  }
  
  try {
    let fullPath = 'public' + safePath;
    
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      res.writeHead(200, {'Content-Type': mime.getType(safePath)});
      fs.createReadStream(fullPath).pipe(res);
    } else {
      console.log("RES: 404, No such file for request", path);
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end("Couldn't find file for", path);
    }
  } catch (err) {
    console.log("RES: 500, Error reading static file", err);
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.end("Failed to load something...try again later?");
  }  
}

let server = require('http').createServer(handleRequest);

server.listen(PORT);
console.log("Listening on port", PORT);
