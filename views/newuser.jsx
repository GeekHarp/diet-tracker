const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Register extends React.Component {
    render() {
        return (
            <DefaultLayout title="Register">
                <h1>We know this is your first time here. Let us help! Give us your Details to begin</h1>
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
                                            <input class="form-check-input" type="radio" name="activitylevel" value="light" />
                                            <label class="form-check-label">Light</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="activitylevel" value="moderate" />
                                            <label class="form-check-label">Moderate</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="activitylevel" value="heavy" />
                                            <label class="form-check-label">Heavy</label>
                                        </div><br />
                        Diet Goal: <select name="dietgoal">
                                    <option value="wl">Weight Loss</option>
                                    <option value="swl">Slow Weight Loss</option>
                                    <option value="m">Maintain my current Weight</option>
                                    <option value="swg">Slow Weight gain</option>
                                    <option value="wg">Weight Gain</option>
                                </select><br />
                        Goal Weight: <input type="number" name="goalweight" step="any" placeholder="Weight" /> Kg<br />
                        <input type="submit" value="Submit" class="btn btn-dark" />
                    </form>
            </DefaultLayout>
        );
    }
}

module.exports = Register;