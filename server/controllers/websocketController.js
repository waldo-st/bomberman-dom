const WebSocket = require("ws");
const fs = require("fs");
const http = require("http");
const config = require("../config/config")
const server = require("./httpControllers")

// const server = http.createServer()

class WebServer {
    constructor() {
        // this.port = port;
        this.server = server;
        this.socket = new WebSocket.Server({ server: this.server });
        // this.setupSocket();
        this.initConn = this.initConn.bind(this)
        this.receiveMsg = this.receiveMsg.bind(this)
        this.sendMsg = this.sendMsg.bind(this)
        this.socket.on("connection", this.initConn)
        this.clients = this.socket.clients
    }

    // requestHandler(req, res) {
    //     console.log(req.url, req.method);

    //     // Set default file to index.html
    //     let filePath = path.join(config.viewsDir);

    //     // Set file path for requested static files
    //     if (req.url !== "/") {
    //         filePath = path.join(config.staticDir, req.url);
    //     }

    //     // Get the file extension
    //     const extname = path.extname(filePath);
    //     // Set initial content type
    //     let contentType = "text/html";

    //     // Check the file extension and set the appropriate content type
    //     switch (extname) {
    //         case ".js":
    //             contentType = "text/javascript";
    //             break;
    //         case ".css":
    //             contentType = "text/css";
    //             break;
    //         case ".json":
    //             contentType = "application/json";
    //             break;
    //         case ".png":
    //             contentType = "image/png";
    //             break;
    //         case ".jpg":
    //             contentType = "image/jpg";
    //             break;
    //         case ".ico":
    //             contentType = "image/x-icon";
    //             break;
    //     }

    //     // Read the file and serve it
    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             if (err.code === "ENOENT") {
    //                 res.writeHead(404, { "Content-Type": "text/html" });
    //                 res.end("<h1>404 Not Found</h1>", "utf-8");
    //             } else {
    //                 res.writeHead(500);
    //                 res.end(`Server Error: ${err.code}`, "utf-8");
    //             }
    //         } else {
    //             res.writeHead(200, { "Content-Type": contentType });
    //             res.end(data, "utf-8");
    //         }
    //     });
    // }

    initConn(socket){
        socket.on("message", this.receiveMsg)
    }

    receiveMsg(msg){
        this.clients.forEach(client=>{
            if (client.readyState===WebSocket.OPEN){
                // Convertir le Buffer en chaîne de caractères
                const jsonString = msg.toString('utf8');
                console.log(JSON.parse(jsonString));
                this.sendMsg(client, jsonString)
            }
        })
    }

    sendMsg(socket, msg){
        socket.send(msg)
    }

    start() {
        this.server.listen(config.port, config.host, () => {
            console.log("Listening for requests on port", config.port);
        });
    }
}
module.exports = WebServer
