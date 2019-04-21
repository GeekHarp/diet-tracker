const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Home extends React.Component {
    render() {
        const userObj = this.props; //
        const userWeight = parseFloat(userObj.weight);
        let RDI;
        const checkActivityLevel = (activityLevel) => {
            if (activityLevel === 'light') {
                return RDI *= 1.55;
            } else if (activityLevel === 'moderate') {
                return RDI *= 1.65;
            } else if (activityLevel === 'heavy') {
                return RDI *= 1.8;
            }
        }
        const checkDietGoal = (dietGoal) => {
            if (dietGoal === 'wl') {
                return RDI -= 500;
            } else if (dietGoal === 'swl') {
                return RDI -= 300;
            } else if (dietGoal === 'swg') {
                return RDI += 200;
            } else if (dietGoal === 'wg') {
                return RDI += 500;
            }
        }
        const calculateRDI = (weight, gender, activityLevel, dietGoal) => {
            RDI = weight * 24;
            if (gender === 'female') {
                RDI *= 0.9;
            }
            checkActivityLevel(activityLevel);
            checkDietGoal(dietGoal);
            RDI = Math.floor(RDI);
            return RDI;
        }
        calculateRDI(userWeight, userObj.gender, userObj.activitylevel, userObj.dietgoal);
        return (
            <DefaultLayout title="Homepage">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a class="navbar-brand" href="#">Calories Tracker</a>
                  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                      <a class="nav-item nav-link active" href="#">Food Diary</a>
                      <a class="nav-item nav-link" href="#">Progress</a>
                      <a class="nav-item nav-link" href="#">Recalculate Daily Calorie Goal</a>
                    </div>
                  </div>
                </nav>
                <h2>My Calories Diary</h2>
                <h3>{RDI}</h3>
                Enter the Calories you Consumed here*: <input type="number" id="calories-input" />
                <input type="submit" value="Submit" id="submit-button" />
                <script src="script.js"></script>
            </DefaultLayout>
        );
    }
}

module.exports = Home;