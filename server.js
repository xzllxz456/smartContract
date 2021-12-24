const express = require("express");
const http = require("http");
const https = require("https");
const path = require("path");
const fs = require('fs');

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

app.use(express.static(path.join(__dirname, "/static")));
app.use(express.static(path.join(__dirname, "/static/js")));
app.use(express.json());
app.use('/payment', require('./static/js/payment'));
//app.use('/calculate', require('./static/js/calculate'));
//app.use('/license', require('./static/js/license'));

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

app2.use(express.static(path.join(__dirname, "/static")));

app2.use(express.json());

app2.use('/payment', require('./static/js/payment'));
//app2.use('/calculate', require('./static/js/calculate'));
//app2.use('/license', require('./static/js/license'));

