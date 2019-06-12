const pg = require('pg');
const url = require('url');

var configs;

if (process.env.DATABASE_URL){

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };

} else {
    configs = {
        user: 'andyng',
        host: '127.0.0.1',
        database: 'weight_tracker',
        port: 5432
    };
}

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// Require func()? inside of models
const allUserModelsFunction = require('./models/user');
const allDataModelsFunction = require(`./models/data`);

const userModelsObject = allUserModelsFunction(pool);
const DataModelsFunction = allDataModelsFunction(pool);

module.exports = {
    queryInterface: (text, params, callback) => {
        return pool.query(text, params, callback);
    },

    pool:pool,
    // Add app 'model' here..
    user: userModelsObject,
    data : DataModelsFunction
};