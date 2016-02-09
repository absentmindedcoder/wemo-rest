var wemo = new require('wemo-client');
var wemoClient = new wemo();
var jsonFile = require('jsonfile');

var devices = [];

wemoClient.discover(function(deviceInfo) {
    console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
    devices.push({
      name: deviceInfo.friendlyName,
      setup: deviceInfo
    });
});

setTimeout(function(){
  jsonFile.writeFile('wemo-devices.json', devices, function(err){
    if(err){
      console.error(err);
    }

    console.log('Finished, found ' + devices.length + ' devices');
    process.exit(1);
  });
}, 60 *1000);
