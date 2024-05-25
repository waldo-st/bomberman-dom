const WebServer = require("./controllers/websocketController")
// const config = require("./config/config")
const webServer = new WebServer();
webServer.start()