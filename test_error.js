const Errors = require('./errors');

 
const type ="admin";


 const obj = JSON.parse('{"code":"1010"}');

 const errormsg = (type == 'admin' ? 
                Errors.admRespError(obj.message) :
                Errors.cfgRespError(obj.message));


console.log(errormsg);


