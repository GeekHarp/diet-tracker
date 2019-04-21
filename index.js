// Boilerplate
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const app = express();

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));

// 'react' boilerplate..
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// db contains *ALL* of our models(?)
const allModels = require('./db');

// get the thing that contains all the routes
const setRoutesFunction = require('./routes');

// call it and pass in the "app" so that we can set routes on it (also models)
setRoutesFunction(app, allModels);

// Listener's boilerplate..
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){
    server.close(() => {
        console.log('Process terminated')
        allModels.pool.end( () => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);