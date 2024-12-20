"use strict";
 
var app = function(req, res) {
  res.end("Hello, Encrypted World!");
};
 
require("greenlock-express")
    .init({
        packageRoot: __dirname,
        configDir: "./greenlock.d",
 
        // contact for security and critical bug notices
        maintainerEmail: "carlosmbinf@gmail.com",
 
        // whether or not to run at cloudscale
        cluster: false
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);