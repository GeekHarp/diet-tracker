const React = require(`react`);
const Layout = require(`./layout.jsx`);

class Rootpage extends React.Component {
    render() {
        return (
            <Layout>
            <div class="big-container">
                <div class="ui raised very padded text container segment">
                    <h1>Simple Weight Tracker</h1>
                    <h1>Log In</h1>
                    <form action="/login" method="POST" class="ui form">
                        <div class="field">
                            <label>Username</label>
                            <input type="text" name="username"placeholder="Username" />
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Log In" class="ui basic black button" /> <br />
                        <a href="/register" >Register</a>
                    </form>
                </div>
            </div>
            </Layout>
        );
    }
}

module.exports = Rootpage;