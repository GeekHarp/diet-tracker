// Routes' func() that are related to 'user'

const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

const SALT =  'random';

module.exports = (db) => {
    // app.get(`/register`)
    const registrationForm = (request, response) => {
        response.render('register');
    };

    // app.post(`/register`)
    const registerUser = (request, response) => {
        const hash = sha256(request.body.password + SALT);
        const values = [request.body.username, hash];
        // Goes on to models/user.js..
        db.user.newUser(values, (error) => {
            response.redirect(`/login`);
        })
    };

    // app.get(`/login`)
    const loginPage = (request, response) => {
        response.render('login');
    }

    // app.post(`/login`)
    const userAuthentication = (request, response) => {
        // Storing the query here as response is N.A. over at models..
        const query = `SELECT * FROM users WHERE username = '${request.body.username}'`;
        const hash = sha256(request.body.password + SALT);
        db.user.idAndPasswordCheck(query, hash, (error, loggedInUser) => {
            // if user && pw is in DB..
            if (loggedInUser !== null) {
                const hashUsername = sha256(SALT + loggedInUser.username);
                const userId = loggedInUser.id;
                response.cookie('username', loggedInUser.username);
                response.cookie('hashedusername', hashUsername);
                response.cookie('id', loggedInUser.id);
                response.redirect(`/${userId}`);
            } else {
                response.status(403).send(`Wrong Username or Password!`);
            }
        });
    }

    // Export the func()
    return {
        registrationForm : registrationForm,
        registerUser : registerUser,
        loginPage : loginPage,
        userAuthentication : userAuthentication
    };
}