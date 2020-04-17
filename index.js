//creating node http module
const http = require('http');

const hostname= 'localhost';
const port = 3000

//setting up the server
//req->request from any browser to this server which is created below , res-> response from server
const server = http.createServer((req,res) => {
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');//text/html-->response body will contain data in for of html
    res.end('<html><body><h1>Hello , World!</h1></body></html>')//when res ended this html is send to client

})

//As above server is set-up and we need to start the server

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`)
});//this will start listining port from which server will listen to incomming request
