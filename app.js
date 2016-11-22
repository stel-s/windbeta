


// var SerialPort = serialport.SerialPort;

// // list serial ports:
// serialport.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//   });
// });

//var SerialPort = require('serialport');
var app = require('express')();
var express = require('express');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var fire = require('./fire.js');
var fs = require('fs');  
var path = require('path');  

var bodyParser = require('body-parser')

var staticBasePath = './build/bundled';

var staticServe = function(req, res) {  
    var fileLoc = path.resolve(staticBasePath);
    fileLoc = path.join(fileLoc, req.url);

        var stream = fs.createReadStream(fileLoc);

        // Handle non-existent file
        stream.on('error', function(error) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            res.end();
        });

        // File exists, stream it to user
        res.statusCode = 200;
        stream.pipe(res);
};

// fire.init();
//app.use(express.static('build/bundled'))
//app.use(express.static('files'))
  app.use(express.static(__dirname + '/build/bundled'));

var fs, configurationFile;

configurationFile = 'config.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

// fs.writeFile('config.json',JSON.stringify(parseJson),function(err){
//     if(err) throw err;
//   })
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());


app.get('/', function(req, res){
  res.sendfile('index.html');
});
postToServer = configuration.url || ""
app.post('/setUrl', function(req, res){
  var parseJson = {
   "url" : req.body.url 
  }
  postToServer = parseJson.url;
  fs.writeFile('config.json',JSON.stringify(parseJson),function(err){
      if(err) throw err;
    })
  console.log(req.body)
      res.json({ message: 'hooray! welcome to our api!' });


});

app.post('/begin',function(req,res){
 
  var request = require('request');
  setInterval(function(){
      request(postToServer, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage.
        }
        console.log(error)
  })
  },3000)
  res.json({ message: 'hooray! fsdswelcome to our api!' });
});

app.post('/pull',function(req,res){
 var sys = require('sys')
 var exec = require('child_process').exec;
 function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("git pull && sudo /home/pi/.nvm/versions/node/v7.1.0/bin/node wind.js ", puts);
  res.json({ message: 'hooray! fsdswelcome to our api!' });
});

io.on('connection', function(socket){
  console.log('a user connected');
   io.emit('chat message', "sds");

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});