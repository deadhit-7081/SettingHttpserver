//creating node http core module
const http = require('http');
//file system core module
const fs = require('fs');//allow you to read and write file in local file system
//path core module
const path = require('path');//allow you to get path of file in local file system

const hostname= 'localhost';
const port = 3000

//setting up the server
//req->request from any browser to this server which is created below , res-> response from server
/*const server = http.createServer((req,res) => {
    console.log("Request of " +req.url + " by method " + req.method);

    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');//text/html-->response body will contain data in for of html
    res.end('<html><body><h1>Hello , World!</h1></body></html>')//when res ended this html is send to client

})*/
const server = http.createServer((req,res) => {
    console.log("Request of " +req.url + " by method " + req.method);

    if(req.method == 'GET')
    {
        var fileUrl;
        if(req.url == '/')
        {
            fileUrl='/index.html';
        }
        else{
            fileUrl=req.url;
        }

        var filePath = path.resolve('./public'+fileUrl);//find the path of file

        const fileExt=path.extname(filePath);//gives the extension of file
        if(fileExt == '.html')
        {
            fs.exists(filePath,(exists) => 
            {
                if(!exists)
                {
                    res.statusCode= 404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404 :' + fileUrl + ' not Found</h1></body></html>')

                    return;
                }
            })//check the file exists or not (*exists 2nd parameter is callback fn 
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            //reading the file and send the file out
            fs.createReadStream(filePath).pipe(res);
        }
        else{
            res.statusCode= 404;
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>Error 404 :' + fileUrl + ' not an html file</h1></body></html>')
    
            return;
        }


    }
    else{
        res.statusCode= 404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Error 404 :' + req.method + ' not Supported</h1></body></html>')

        return;
    }
})

//As above server is set-up and we need to start the server

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`)
});//this will start listining port from which server will listen to incomming request
