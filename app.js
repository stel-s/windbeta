


// var SerialPort = serialport.SerialPort;

// // list serial ports:
// serialport.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//   });
// });

var SerialPort = require('serialport');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fire = require('./fire.js');
fire.init();
function initSerial() {
  var port = new SerialPort('/dev/ttyACM1', {
  baudRate: 57600,
  parser: SerialPort.parsers.readline("\n")
});

var i =0;

port.on('data', function (data) {
  console.log('Data: ' + data);
   io.emit('chat message', data);
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})



app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
   io.emit('chat message', "sds");

});

} 

http.listen(3000, function(){
  console.log('listening on *:3000');
});