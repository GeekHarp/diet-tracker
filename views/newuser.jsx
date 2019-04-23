const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Register extends React.Component {
    render() {
        return (
            <DefaultLayout title="Register">
            <div>
                <h2>Submit your Infomation. Start your weight loss journey today!</h2>
                    <form action="/newuser" method="POST">
                        Gender: <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender" value="male" />
                                    <label class="form-check-label">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender" value="female" />
                                    <label class="form-check-label">Female</label>
                                </div><br />
                        Weight: <input type="number" name="weight" step="any" placeholder="Weight" /> Kg<br />
                        Activity Level* : <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="activity_level" value="light" />
                                            <label class="form-check-label">Light</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="activity_level" value="moderate" />
                                            <label class="form-check-label">Moderate</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="activity_level" value="heavy" />
                                            <label class="form-check-label">Heavy</label>
                                        </div><br />
                        Diet Goal: <select name="diet_goal">
                                    <option value="wl">Weight Loss</option>
                                    <option value="swl">Slow Weight Loss</option>
                                    <option value="m">Maintain my current Weight</option>
                                    <option value="swg">Slow Weight gain</option>
                                    <option value="wg">Weight Gain</option>
                                </select><br />
                        Goal Weight: <input type="number" name="goal_weight" step="any" placeholder="Weight" /> Kg<br />
                        <input type="submit" value="Submit" class="btn btn-dark" />
                    </form>
            </div>
            </DefaultLayout>
        );
    }
}

module.exports = Register;