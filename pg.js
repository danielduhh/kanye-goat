var pg = require('pg');
var Q = require("q");
//var settings = require('./settings.js').heroku;

pg.defaults.ssl = true;

// PostGIS Connection String
var conString = "postgres://" + (process.env.DB_USER ) + ":" +
    (process.env.DB_PASSWORD)+ "@" +
    (process.env.DB_SERVER) + ":" +
    (process.env.DB_PORT) + "/" +
    (process.env.DB_NAME);

//var conString = 'postgres://gzzmncituhhtxm:re4E13HP-uqTlwGW71xoeH25F_@ec2-54-204-30-115.compute-1.amazonaws.com:5432/d491g46d8uagv';

/**
 * Main query function to execute an SQL query; callback form.
 *
 * @type {Function}
 */
module.exports.queryCallback = function(sql, cb, opts) {
    pg.connect(conString, function(err, client, done) {
        if(err) {
            console.error('error fetching client from pool', err);
        }
        client.query(sqlStr, sqlParams, function(queryerr, result) {

            pg.end();
            if(queryerr) {
                console.error('ERROR RUNNING QUERY:', sqlStr, queryerr);
            }
            cb((err || queryerr), (result && result.rows ? result.rows : result));
        });
    });
};

/**
 * Main query function to execute an SQL query; deferred form.
 *
 * @type {Function}
 */
module.exports.queryDeferred = function(sqlStr, opts){

    var options = opts || {};
    var sqlParams = options.sqlParams || null;

    var deferred = Q.defer();

    pg.connect(conString, function(err, client, done) {

        if(err) {
            console.error('error fetching client from pool', err);
            deferred.reject(err);
        }

        client.query(sqlStr.text, sqlStr.values, function(queryerr, result) {

            done();

            if(queryerr) {
                console.error('ERROR RUNNING QUERY:', sqlStr, queryerr);
                deferred.reject(queryerr);
            } else {
                deferred.resolve(result && result.rows ? result.rows : []);
            }
        });

    });

    return deferred.promise;
};

var sanitize = module.exports.sanitize = function (val) {
    // we want a null to still be null, not a string
    if (typeof val === 'string' && val !== 'null') {
        // $nh9$ is using $$ with an arbitrary tag. $$ in pg is a safe way to quote something,
        // because all escape characters are ignored inside of it.
        var esc = settings.escapeStr;
        return "$" + esc + "$" + val + "$" + esc + "$";
    }
    return val;
};

var featureCollectionSQL = module.exports.featureCollectionSQL = function(table, propertyColumns, opts){

    var options = opts || {};
    var whereClause = options.whereClause || '';

    var sql = "SELECT row_to_json(fc) AS response "
        + "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "
        + "FROM (SELECT 'Feature' As type "
        + ", row_to_json((SELECT l FROM (select {{columns}}) As l "
        + ")) As properties "
        + "FROM " + table + " As t {{where}}) As f )  As fc;"

    return sql.replace('{{columns}}', propertyColumns).replace('{{where}}', whereClause);
};
