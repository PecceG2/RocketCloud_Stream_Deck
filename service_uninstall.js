var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'RocketCloud StreamDeck',
  description: 'Service for auto-start RocketCloud StreamDeck NodeJS Server.',
   script: require('path').join(__dirname,'index.js')
});

// Listen for the "uninstall" event, which indicates the
// process is available as a service.
 svc.on('uninstall',function(){
   console.log('Uninstall complete.');
   console.log('The service exists: ',svc.exists);
 });

 // Uninstall the service.
 svc.uninstall();