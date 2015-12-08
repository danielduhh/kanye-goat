/**
 * This is the settings file for
 * the Cadasta Ingestion Engine.
 */

module.exports = {
    // Postgres Database Connection
    heroku: {
        server: '',
        port: '5432',
        database: '',
        user: '',
        password: '',
        sslmode:'require',
        ssl: true
    },
    pg: {
        server: 'localhost',
        port: '5432',
        database: 'yeezy',
        user: 'postgres',
        password: ''
    }
};