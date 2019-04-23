const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Login extends React.Component {
    render() {
        return (
            <DefaultLayout title="Login">
            <div>
                <h1>Log In</h1>
                    <form action="/login" method="POST">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" name="username" class="form-control" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Password" />
                        </div>
                        <input type="submit" value="Log In" class="btn btn-dark" />
                    </form>
            </div>
            </DefaultLayout>
        );
    }
}

module.exports = Login;