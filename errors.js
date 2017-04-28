'use strict';

function error(code, mesg) {
    return {code: code, message: mesg};
}

 

exports.admReqError = function (mesg) {
    return error(50101, mesg);
};

exports.admRespError = function (mesg) {
    return error(50102, mesg);
};

exports.cfgUrlError = function (url) {
    return error(50200, 'invalid base config url ' + url);
};

exports.cfgReqError = function (mesg) {
    return error(50201, mesg);
};

exports.cfgRespError = function (mesg) {
    return error(50202, mesg);
};