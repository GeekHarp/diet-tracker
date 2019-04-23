const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Register extends React.Component {
    render() {
        return (
            <DefaultLayout title="Register">
            <div>
                <h1>Register</h1>
                    <form action="/register" method="POST">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" name="username" class="form-control" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Password" />
                        </div>
                        <input type="submit" value="Register" class="btn btn-dark" />
                    </form>
            </div>
            </DefaultLayout>
        );
    }
}

module.exports = Register;