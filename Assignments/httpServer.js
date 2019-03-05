const http = require('http');
const url = require('url');

function onRequest(req, res) {
    const q = url.parse(req.url, true);
    const pathname = q.pathname;
    if (pathname === "/home") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>Welcome to the Home Page</h1>")

    } else if (pathname === "/getData") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({"name":"Madeline Barlocker","class":"cs313"}));
    } else if (pathname === "/add") {
        const result = parseInt(q.query.var1) + parseInt(q.query.var2);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(result.toString())
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write("<!DOCTYPE html>\n" +
            "<html>\n" +
            "<body>\n" +
            "<h1>Page Not Found</h1>\n" +
            "</body>\n" +
            "</html>");
    }
    res.end();
}

http.createServer(onRequest).listen(8888);
