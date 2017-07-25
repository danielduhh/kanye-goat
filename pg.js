'use strict'

var pg = require('pg-promise')();
var settings = require('./settings');

// Application connection object
var connectionObject = {
    host: settings.pg.host,
    port: settings.pg.port,
    database: settings.pg.database,
    user: settings.pg.user,
    password: settings.pg.password
};

// set connection
var db = pg(connectionObject);

/**
 * get connection object
 * @returns {{host: string, port: string, database: string, user: string, password: string}}
 */
module.exports.getConnObj = function(){
    return connectionObject;
};

/**
 * get pg-promise db
 * @returns pg-promise db connection {*}
 */
module.exports.getDatabase = function(){
    return db;
};