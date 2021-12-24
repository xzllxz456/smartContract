const express = require("express");
const http = require("http");
const https = require("https");
const path = require("path");
const fs = require('fs');

//-------------------------------------------------------------------
//  setting function
//-------------------------------------------------------------------
var setStaticResource = function(exp) {
  exp.use(express.static(path.join(__dirname, "/static")));
  exp.use(express.json());
}

var registerAPI = function(exp) {
  exp.use('/api/payment', require('./static/common/payment'));
  exp.use('/api/calculate', require('./static/common/calculate'));
  exp.use('/api/license', require('./static/common/license'));
}

//-------------------------------------------------------------------
//  variable set
//-------------------------------------------------------------------
// https
const app = express();   // ?
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "private.pem"), "utf-8"),
    cert: fs.readFileSync(path.join(__dirname, "cert", "public.pem"), "utf-8"),
  },
  app
);
sslServer.listen(3000, '0.0.0.0', () => {
  console.log(`Secure server port 3000`);
});

setStaticResource(app);
registerAPI(app);

// http
const app2 = express();  // ?
const httpServer = http.createServer(app2);
httpServer.listen(80, () => {
  console.log(`Secure server port 80`);
});

app2.use("*", (req, res, next) => {
  console.log("req.secure == " + req.secure);
    
  if(req.secure){
      // --- https
      next();
  }else{
      // -- http
      let to = "https://network." + req.headers.host + ":3000" + req.url;
      console.log("to ==> " + to);

      return res.redirect(to);
  }
  next();
});

setStaticResource(app2);
registerAPI(app2);

