var wemo = new require('wemo-client');
var wemoClient = new wemo();
var express = require('express');
var jsonFile = require('jsonfile');
var clients = {};
var app = express();

console.log('init');

var clients = {};

app.post('/automate', function(req, res){
  var device = req.query.device;
  var state = req.query.state;

  console.log('Request received: ', req.query);

  if(device && clients[device.toLowerCase()] && state){
    clients[device].setBinaryState(state);
    res.status(200).json({msg: 'success'});
  } else {
    res.status(400).json({msg: 'invlaid input'});
  }
});

function startServer(){
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
  });
}

jsonFile.readFile(__dirname + '/wemo-devices.json', function(err, config){
  if(err){
    return console.error(err);
  }

  if(config &&config.length){
    config.forEach(function(device){
      clients[device.name.toLowerCase()] = wemoClient.client(device.setup);
      console.log('created client for: ' + device.name);
    });
    console.log('starting server');
    startServer();
  } else {
    console.error('Invalid config or config has no devices');
  }
});
