var Fs = require('fs');

const base_dir = '/opt/onboarding1/certs/development';
const myClientKey = Fs.readFileSync(base_dir + '/client.key', 'utf8');
const myClientCert = Fs.readFileSync(base_dir + '/client.crt', 'utf8');
const HPECAs = require('@hpe/node-ssl-hpe-root-cas');
const Https = require('https');
const Errors = require('./error');

 
function makeOptions(method, host, port, path) {
    const options = {
        host: host,
        port: port,
        method: method,
        path: path,
        key: myClientKey,
        cert: myClientCert,
        ca: HPECAs.All_HPE_CAs,
        rejectUnauthorized: true
    };

    if (method.match(/(POST|PUT|PATCH)/i)) {
        options.headers = {
            'Content-Type': 'application/json'
        };
    }

    return options;
} 


function makeApiRequest(type, method, host, port, path, boj, resolve, reject) {
    const data = JSON.stringify(boj);
    const options = makeOptions(method, host, port, path);

   // console.log(options);

   console.log("payload :\n"+data);

    if (boj)
        options.headers['Content-Length'] = Buffer.byteLength(data);

    const req = Https.request(options, (res) => {
        let data = '';

        res.setEncoding('utf8');

        res.on('data', (chunk) => { data += chunk; });

        res.on('end', () => {
            const obj = JSON.parse(data);
            if (res.statusCode == 200)
                resolve(obj);
            else {
                const error = (type == 'admin' ?
                                   Errors.admRespError(obj.message) :
                                   Errors.cfgRespError(obj.message));
                reject(error);
            }
        });
    });

    req.on('error', (err) => {
        const error = (type == 'admin' ? Errors.admReqError(err.message)
                                       : Errors.cfgReqError(err.message));
        reject(error)
    });

    if (boj)
        req.write(data);

    req.end();
}

 




function makeCALL(boj) {
    return new Promise((resolve, reject) => {
       makeApiRequest('admin','POST','hc4t02618.itcs.hpecorp.net',9443,'/topic', boj, resolve, reject);
    });
}
 

 function test() {
    const body = '{"reqId":"606","entityType":"ApplicationData","entity":"ENTITYFORTEST1","sourceSystem":"SFDC","applicationCI":"hpit-ois","env":"DEV","partitionCount":1,"maxTotalMB":2,"retentionHours":2,"mesgMaxKB":1,"status":"NEW"}';
    const res ={};
    makeCALL(body).then((cls) => {
        console.log(cls);
     }).catch((err) => {
         console.log(err);
    });
}



test();




