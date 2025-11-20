const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const mysql = require('mysql');

// Charger les certificats SSL
const options = {
  key: fs.readFileSync('/tmp/certs/privkey.pem'),
  cert: fs.readFileSync('/tmp/certs/fullchain.pem')
};

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'sqlasantero',
    password : 'savary',
    database : 'asantero_miniblog',
    ssl  : {
      rejectUnauthorized: false
    }
  });

connection.connect(function(err){
    if(err)throw err;
    console.log("Connection ok")
});


/********************/
/******* API  *******/
/********************/


// Lancer le serveur HTTPS
https.createServer(options, app).listen(10000, () => {
  console.log('Serveur HTTPS démarré sur le port 10000');
});  