const React = require(`react`);

class Layout extends React.Component {
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
                    <link rel="stylesheet" type="text/css" href="./css/styling.css"/>
                </head>
                <body>
                    {this.props.children}
                    <script type="text/javascript" src="./script.js"></script>
                </body>
        </html>
    );
    }
}

module.exports = Layout;