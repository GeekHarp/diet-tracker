const React = require(`react`);
const Layout = require(`./layout.jsx`);

class Register extends React.Component {
    render() {
        return (
            <Layout>
            <div class="big-container">
            <div class="ui raised very padded text container segment">
                <h2>Start Tracking your Weight now! Submit your infomation</h2>
                    <form action="/newuser" method="POST" class="ui form three">

                        Gender &nbsp;
                        <input  type="radio" name="gender" value="male"/>
                        <label> Male</label> &nbsp;
                        <input  type="radio" name="gender" value="female" />
                        <label> Female</label><br/><br/>

                        Activity Level &nbsp;
                        <input type="radio" name="activity_level" value="light" />
                        <label> Light</label> &nbsp;
                        <input type="radio" name="activity_level" value="moderate" />
                        <label> Moderate</label> &nbsp;
                        <input type="radio" name="activity_level" value="heavy" />
                        <label> Heavy</label><br/><br/>

                        <b>Diet Goal</b>
                        <select name="diet_goal">
                            <option value="wl" selected>Weight Loss</option>
                            <option value="swl">Slow Weight Loss</option>
                            <option value="m">Maintain my current Weight</option>
                            <option value="swg">Slow Weight gain</option>
                            <option value="wg">Weight Gain</option>
                        </select><br />

                        <div class="fields">

                            <div class="field">
                                <label>Weight</label>
                                <input type="text" name="weight" placeholder="Weight(KG)" />
                            </div>

                            <div class="field">
                                <label>Goal Weight</label>
                                <input type="text" name="goal_weight" placeholder="Weight(KG)" />
                            </div>

                            <div class="field">
                                <label>Achieve Goal By</label>
                                <div class="ui calendar">
                                    <div class="ui input left icon">
                                      <i class="calendar icon"></i>
                                <input type="date" name="goal_date" />
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <input type="submit" value="Submit" class="ui basic black button" />
                        </div>

                        <div class="ui error message"></div>
                    </form>
            </div>
            </div>
            </Layout>
        );
    }
}

module.exports = Register;