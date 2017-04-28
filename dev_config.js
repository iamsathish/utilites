'use strict';

const Fs = require('fs');
const Path = require('path');
const HPECAs = require('@hpe/node-ssl-hpe-root-cas');
const AddisonEngine = require('@hpe/addison-engine');

let serverKey = null;
let clientKey = null;
let serverCert = null;
let clientCert = null;

try {
    const srvkeyfile = Path.join(__dirname, 'ssl', AddisonEngine.getEnvironment(),'server.key');
    const clikeyfile = Path.join(__dirname, 'ssl', AddisonEngine.getEnvironment(),'client.key');

    if (Fs.statSync(srvkeyfile).isFile())
        serverKey = Fs.readFileSync(srvkeyfile, 'utf8');

    if (Fs.statSync(clikeyfile).isFile())
        clientKey = Fs.readFileSync(clikeyfile, 'utf8');


    const srvcertfile = Path.join(__dirname, 'ssl', AddisonEngine.getEnvironment(),'server.crt');
    const clicertfile = Path.join(__dirname, 'ssl', AddisonEngine.getEnvironment(),'client.crt');

    if (Fs.statSync(srvcertfile).isFile())
        serverCert = Fs.readFileSync(srvcertfile, 'utf8');

    if (Fs.statSync(clicertfile).isFile())
        clientCert = Fs.readFileSync(clicertfile, 'utf8');

} catch (e) {
    console.error(e);
}

module.exports = {

  adminApiServer: {
    DEV: {
      host: 'hc4t01895.itcs.hpecorp.net',
      port: 8444
    },
    ITG: {
      host: 'kafka-admin-api-itg-lb02.itcs.hpecorp.net',
      port: 443
    }
  },

    level: {
        console: 'debug',
        file: 'debug'
    },

    entmonOps: {
        Organization: '',
        Domain: '',
        AppName: '',
        frequency: 60000
    },

    APIDocumentation: {
        APIVersion: '1.0',
        documentationTitle: '',
        documentationDescription: '',
        APIDescription: ''
    },

    connections: [{
        host: '0.0.0.0',
        port: 9443,
        routes: { log: true },
        tls: {
            key: serverKey,
            cert: serverCert
        }
    }, {
        host: '0.0.0.0',
        port: 9444,
        routes: { log: true },
        tls: {
            key: serverKey,
            cert: serverCert,
            requestCert: true,
            rejectUnauthorized: true,
            ca: HPECAs.All_HPE_CAs.concat(serverCert)
        }
    }],

    clientKey: clientKey,
    clientCert: clientCert,

    registrations: [{
        plugin: {
            register: './src/api/provision/auth/basic-auth.js',
            options: {}
        }
    }, {
        plugin: {
            register: './src/api/provision/auth/client-cert.js',
            options: {}
        }
    }]
};
