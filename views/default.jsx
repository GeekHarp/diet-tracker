const React = require(`react`);

class DefaultLayout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
                    <script
                      src="https://code.jquery.com/jquery-3.1.1.min.js"
                      integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
                      crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>
                    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
                </head>
                <body>
                    <nav className="ui secondary menu">
                      <a className="item" href="/home">Simple Weight Tracker</a>
                      <a className="item" href="/food">Food Intake</a>
                      <a className="item" href="/calorie">Calorie Tracker</a>
                      <a className="item" href="/update">Settings</a>
                      <div className="right menu">
                        <p className="ui item">Hi, {this.props.username}</p>
                        <a className="ui item" href="/logout">Log Out</a>
                      </div>
                    </nav>
                    {this.props.children}
                    <script type="text/javascript" src="./script.js"></script>
                </body>
        </html>
    );
    }
}

module.exports = DefaultLayout;