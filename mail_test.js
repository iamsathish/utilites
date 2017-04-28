'use strict';

const nodemailer = require('nodemailer'); 
const smtpTransport = require("nodemailer-smtp-transport");
const fs = require('fs');
const path = require('path');
const Joi = require("joi");

const smtp_host = 'smtp3.hpe.com';
const smtp_port =25;
const email_from = 'sathish.shanmugam@hpe.com';
const email_to = 'sathish.shanmugam@hpe.com';
const email_cc = 'sathish.shanmugam@hpe.com';
const email_bcc = 'sathish.shanmugam@hpe.com';

  // http://adilapapaya.com/docs/nodemailer/



  var obj = {
  name: 'myObj',
  key: 'SECRET'
};
   

//var attachments = [{ filename: 'notes.txt', path: __dirname + 'notes.txt', contentType: 'application/pdf' }]
var attachments = [{ filename: 'notes.txt', path: __dirname + '/notes.txt', contentType: 'text/plain' },

{ filename: 'inspectocat.jpg', path: __dirname + '/inspectocat.jpg', contentType: 'application/image' }]

var transport = nodemailer.createTransport(smtpTransport({


  
  // service: "Gmail",
  host: 'smtp3.hpe.com',  //smtp-americas.hp.com
  // hostname
  port: 25
  
}));

console.log(__dirname);

//fs.readFile("./notes.txt", function (err, data) {
    var message = {   
          sender: email_from,    
          to: email_to,   
          subject: 'Attachment test!',    
          //html: '<h1>test</h1>',  
          text: JSON.stringify(obj) ,
          attachments: attachments
     };


 

    transport.sendMail(message, function(err) {
      if (err) {
        console.log('Error occured');
        console.log(err.message);
       // console.log(sys.inspect(err));
        return;
      }else{
        console.log('Message sent successfully!');
      }

      // if you don't want to use this transport object anymore, uncomment following line
      transport.close(); // close the connection pool
    });


//});

 /*
 
 
 nodemailer.SMTP = {
    host: 'host.com', 
    port:587//,
    //use_authentication: true, 
    //user: 'you@example.com', 
   // pass: 'xxxxxx'
};

fs.readFile("./inspectocat.jpg", function (err, data) {

    nodemailer.send_mail({       
        sender: email_from,
        to: email_from,
        subject: 'Attachment test!',
        body: 'mail content...',
        attachments: [{'filename': 'inspectocat.jpg', 'content': data}]
    }), function(err, success) {
        if (err) {
           console.err(err);
        }

    }
});*/