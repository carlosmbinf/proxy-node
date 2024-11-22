const Greenlock = require("greenlock-express");
const httpProxy = require("http-proxy");

// Crear el servidor proxy reverso
const proxy = httpProxy.createProxyServer({
    target: "http://127.0.0.1:6000", // Servidor Meteor
    changeOrigin: true,
    ws: true,
    xfwd: true,
});

// Manejar eventos del proxy
proxy.on("error", (err, req, res) => {
    console.error("Error en el proxy:", err.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error en el servidor proxy.");
});

// Configuración de Greenlock
Greenlock.init({
    packageRoot: __dirname,
    configDir: "./greenlock.d",
    maintainerEmail: "carlosmbinf@gmail.com", // Reemplaza con tu correo
    cluster: false,
    sites: [
        {
            subject: "vidkar.ddns.net", // Cambia esto por tu dominio
            altnames: ["vidkar.ddns.net"], // Alias adicionales
        },
    ],
})
    .serve((req, res) => {
        // Redirigir todas las solicitudes HTTPS al proxy reverso
        proxy.web(req, res);
    });
