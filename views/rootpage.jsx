const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Rootpage extends React.Component {
    render() {
        return (
            <html>
            <head>
                <title>Calories Tracker</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="/css/style.css" />
            </head>
            <body>
                <div>
                    <h1>Calories Tracker</h1>
                    <a class="btn btn-primary" href="/register" role="button">Sign Up</a>
                    <a class="btn btn-primary" href="/login" role="button">Log In</a><br />
                </div>
            </body>
            </html>
        );
    }
}

module.exports = Rootpage;