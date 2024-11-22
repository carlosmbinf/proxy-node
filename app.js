// const proxy = require('@ucipass/proxy')
// const proxyPort = 80
// proxy(proxyPort)
// .then(()=>{
//   // Use it for a while....
//   console.log("Puerto iniciado por: "+ proxyPort );
// })
// .then((server) => {
//   // console.log(server);
//   // server.stop() 
// })

var fs = require("fs");
var appRoot = require("app-root-path");
var httpProxy = require('http-proxy');

var PATH_TO_KEY = appRoot.path + '/conf/28459803_srv5119-206152.vps.etecsa.cu.key';
 var PATH_TO_CERT = appRoot.path + '/conf/28459803_srv5119-206152.vps.etecsa.cu.cert';

var options = {
 ssl: {
 key: fs.readFileSync(PATH_TO_KEY, 'utf8'),
 cert: fs.readFileSync(PATH_TO_CERT, 'utf8')
 },
 target : 'http://localhost:6000',
 ws: true,
 xfwd: true,
};
var server = httpProxy.createProxyServer(options).listen(443);
console.log('httpProxy running with target at ' + options.target);
