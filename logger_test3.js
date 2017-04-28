const bunyan = require('bunyan');
const path = require('path');


const log = bunyan.createLogger({
  name: 'myapp',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: __dirname +'/myapp-error.log'  // log ERROR and above to a file
    }
  ]
});


log.info('hello');
log.warn({lang: 'fr'}, 'au revoir');

   var obj = {
  name: 'myObj',
  key: 'SECRET'
};
 
log.info(obj);
log.error(obj);
log.error(JSON.stringify(obj));
log.info(JSON.stringify(obj));
log.warn(JSON.stringify(obj));
log.debug(JSON.stringify(obj));
