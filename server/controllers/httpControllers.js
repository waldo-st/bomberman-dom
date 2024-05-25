const http = require('http');
const url = require('url');
const fs = require('fs');
const config = require('../config/config');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method.toUpperCase();

    // Logique de routage
    if (method === 'GET') {
        let filePath;

        // Si l'URL est '/', servir index.html par défaut
        if (pathname === '/') {
            filePath = path.join(config.viewsReg);
        } else {
            // Sinon, construire le chemin du fichier demandé
            filePath = path.join(config.staticReg, pathname);
        }

        // Lire le fichier demandé et le servir
        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // Fichier non trouvé
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>', 'utf-8');
                } else {
                    // Erreur interne du serveur
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`, 'utf-8');
                }
            } else {
                // Déterminer le type MIME en fonction de l'extension du fichier
                let contentType = 'text/html';
                const ext = path.extname(filePath);
                if (ext === '.js') {
                    contentType = 'text/javascript';
                } else if (ext === '.css') {
                    contentType = 'text/css';
                }else if(ext === ".ico"){
                    contentType = "image/x-icon";
                }

                // Servir le fichier avec le bon type MIME
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data, 'utf-8');
            }
        });
    }else {
        // Méthode non prise en charge
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed', 'utf-8');
    }
});

module.exports = server;

// Démarrer le serveur si ce n'est pas déjà fait ailleurs
if (require.main === module) {
    server.listen(config.port, config.host, () => {
        console.log(`Server is running on http://${config.host}:${config.port}`);
    });
}
