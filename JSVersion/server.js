let http = require('http');


let obj = create("notplayer");

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(obj.name);
    response.end();
}

http.createServer(onRequest).listen(10000);
httpGet();

console.log("http://localhost:10000/");



