"use strict";

// Core Modules
let fs = require("fs");
let path = require("path");

// Utils
let log = require("./loggingHandler");

const packagefile = require(path.resolve("package.json"));
const configPath = path.resolve("config.json");

let validJson = function(obj){
    try {
        JSON.parse(obj);
    }
    catch (e){
        return false;
    }
    return true;
};

let getConfig = function(){
    if (!fs.existsSync(configPath)){
        log.error("Konfigurationsdatei existiert nicht! Gehe sicher, dass du 'config.template.json' kopierst und als 'config.json' einfügst.");
        process.exit(1);
    }

    let jsondata = "";
    try {
        jsondata = String(fs.readFileSync(configPath));
    }
    catch (e){
        log.error(`Kann Konfigurationsdatei nicht lesen: ${e}`);
        process.exit(1);
    }

    if (validJson(jsondata)) return JSON.parse(jsondata);

    log.error("Konfigurationsdatei ist in keinem validen JSON Format. Stoppe...");
    return process.exit(1);
};

let getVersion = function(){
    return packagefile.version;
};

let getName = function(){
    return packagefile.name;
};

let getAuthor = function(){
    return packagefile.author;
};

module.exports = {
    getConfig,
    getVersion,
    getName,
    getAuthor
};