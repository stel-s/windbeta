// http://nodejs.org/api.html#_child_processes
// var sys = require('sys')
// var exec = require('child_process').exec;
// var child;
// // executes `pwd`
// child = exec("pwd", function (error, stdout, stderr) {
//   sys.print('stdout: ' + stdout);
//   sys.print('stderr: ' + stderr);
//   if (error !== null) {
//     console.log('exec error: ' + error);
//   }
// });
// // or more concisely
// var sys = require('sys')
// var exec = require('child_process').exec;
// function puts(error, stdout, stderr) { sys.puts(stdout) }
// exec("git status", puts);

var config = require('./config.json');
config.time = "sdssdsds"
console.log(config);

var fs, configurationFile;

configurationFile = 'config.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);
var parseJson = {
   "time" : "34343"
}
fs.writeFile('config.json',JSON.stringify(parseJson),function(err){
    if(err) throw err;
  })