# wemo-rest
A Belkin Wemo control server written in Node

# Setup
Run `node discovery.js`
This runs for 60 secs to try and find any devices on the network. Once the timer is up a json file is written out with
all of the device configurations

# Run
Run `node server.js` 
This starts a server on port 3000 that is ready to accept commands.

# Usage
Send a POST request to the server at `/automate?device=<deviceName>&state=<state>`. Thats it!
