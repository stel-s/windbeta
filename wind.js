var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);
var fire = require('./fire.js');
fire.init();
var wpi = require('wiring-pi');
wpi.setup('wpi');
wpi.pinMode(25, wpi.INPUT);
wpi.pullUpDnControl(25, wpi.PUD_UP);
wpi.wiringPiISR(25, wpi.INT_EDGE_BOTH, function(delta) {
  console.log('Pin 7 changed to LOW (', delta, ')');
	spin();
	
});
var count = 0;
var calc_speed = function (r_cm,time_sec){

	 circ_cm = (2 * Math.PI) * r_cm
    rot = count / 2.0
    dist_km = (circ_cm * rot) / 100000.0 
    km_per_sec = dist_km / time_sec
    km_per_hour = km_per_sec * 3600 
count = 0;
if(km_per_hour > 0 ) fire.save(km_per_hour);

    return km_per_hour


}
var s = function () { setInterval(function() { console.log(calc_speed(9.0,5)) },5000 ) } ;
s();
function spin () {
  count += 1;
  
}
