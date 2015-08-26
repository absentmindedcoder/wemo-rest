var W = new require('wemo-client');
var express = require('express');
var wemo = new W();
var clients = {};
var app = express();

var TOTAL_DEVICES = 1; //HACK since using UPnP you con't know the total devices
var devicesFound = 0;

console.log('init')

app.post('/automate', function(req, res){
  var device = req.query.device;
  var state = req.query.state;
  
  console.log('Request received: ', req.query);

  if(device && clients[device] && state){
    clients[device].setBinaryState(state);
    res.status(200).json({msg: 'success'});
  } else {
    res.status(400).json({msg: 'invlaid input'});
  }
});


wemo.discover(function(deviceInfo) {
  console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
  clients[deviceInfo.friendlyName] = wemo.client(deviceInfo);
  devicesFound++;
  
  if(devicesFound === TOTAL_DEVICES){
    startServer();
  }
});

function startServer(){
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}
