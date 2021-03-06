"use strict";

let env = process.env.NODE_ENV ?? "dev";
let nodev = process.version;
let osinfo = process.platform;

let filterDevVal = function(dev, ifaces){
    let address;
    // eslint-disable-next-line prefer-destructuring
    ifaces[dev].filter(details => (details.family === "IPv4" && details.internal === false ? (address = details.address) : undefined));
    return address;
};

let getIp = function(){
    let address;
    let ifaces = require("os").networkInterfaces();
    for (let dev in ifaces) address = filterDevVal(dev, ifaces);
    return address;
};

module.exports = function(callback){
    let metadata = {};

    metadata.environment = env;
    metadata.nodeversion = nodev;
    metadata.os = osinfo;
    metadata.ip = getIp();

    return callback(metadata);
};