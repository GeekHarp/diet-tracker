// Routes' func() that are related to 'user'

const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

const SALT =  'random';

module.exports = (db) => {

    // app.get(`/`)
    const rootPage = (request, response) => {
        response.render('rootpage');
    };

    // app.get(`/register`)
    const registrationForm = (request, response) => {
        response.render('register');
    };

    // app.post(`/register`)
    const registerUser = (request, response) => {
        const hashedPw = sha256(request.body.password + SALT);
        const values = [request.body.username, hashedPw];
        //this query is for checking if username is already in DB
        const query = `SELECT * FROM users WHERE username = '${request.body.username}'`
        // Goes on to models/user.js..
        db.user.newUser(values, query, (error, returnedResult) => {
            if (returnedResult === `taken`) {
                response.send(`Username's taken.`)
            } else {
                response.redirect(`/`);
            }
        })
    };

    // app.post(`/login`)
    const userAuthentication = (request, response) => {
        const query = `SELECT * FROM users WHERE username = '${request.body.username}'`;
        // console.log(query);
        const hashedPw = sha256(request.body.password + SALT);
        db.user.idAndPasswordCheck(query, hashedPw, (error, loggedInUser) => {
            // if user is in DB && correct pw
            if (loggedInUser !== null) {
                const hashedUsername = sha256(SALT + loggedInUser.username);
                const userId = Number(loggedInUser.id);
                //What's the point of storing all these cookies
                response.cookie(`username`, loggedInUser.username);
                response.cookie(`hashedusername`, hashedUsername);
                response.cookie(`id`, loggedInUser.id);
                if (loggedInUser.weight !== null) {
                    response.redirect(`/home`);
                } else {
                    response.redirect(`/newuser`);
                }
                // response.redirect(`/${userId}`);
            } else {
                //for now we just send this error page..
                response.status(403).send(`Wrong Username or Password!`);
            }
        });
    }

    // app.get(`/logout`)
    const logOut = (request, response) => {
        if (request.cookies.hashedusername === sha256(SALT + request.cookies.username)) {
            response.clearCookie(`username`, request.cookies.username);
            response.clearCookie(`hashedusername`, request.cookies.hashedusername);
            response.clearCookie(`id`, request.cookies.id);
        }
        response.redirect(`/`);
    }

    // Export the func()
    return {
        rootPage : rootPage,
        registrationForm : registrationForm,
        registerUser : registerUser,
        userAuthentication : userAuthentication,
        logOut : logOut
    };
}