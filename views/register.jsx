const React = require(`react`);
const Layout = require(`./layout.jsx`);

class Register extends React.Component {
    render() {
        return (
            <Layout>
            <div class="big-container">
            <div class="ui raised very padded text container segment">
                <h1>Simple Weight Tracker</h1>
                <h1>Register</h1>
                    <form action="/register" method="POST" class="ui form">
                        <div class="field">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" />
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <input type="password" name="password"placeholder="Password" />
                        </div>
                        <input type="submit" value="Register" class="ui basic black button" /><br/>
                        <a href="/" >Log In</a>
                    </form>
            </div>
            </div>
            </Layout>
        );
    }
}

module.exports = Register;