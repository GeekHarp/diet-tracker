const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Home extends React.Component {
    render() {
        const detailsObj = this.props.details; // {}
        const calorieDiaryArr = this.props.diary; // [{}, {}]
        // Over here, We calculate the Recommend Calories Intake(RDI)
        const userWeight = parseFloat(detailsObj.weight);
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
            } else {
                return RDI
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
        calculateRDI(userWeight, detailsObj.gender, detailsObj.activity_level, detailsObj.diet_goal);

        // We calculate the total calories consumed by THAT user That particular day
        let totalCalories = 0;
        const calculateTotalCalories = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                totalCalories += arr[i].calories;
            }
            return totalCalories;
        }
        calculateTotalCalories(calorieDiaryArr);
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
                <canvas id="myChart">

                </canvas>
                <h3>Recommended Daily Calories {RDI}</h3>
                <h3>Calories Consumed {totalCalories}</h3>
                <form action="/newfood" method="POST">
                    Enter the Calories you Consumed here*: <input type="number" name="calories" id="calories-input" min="0" step="1" />
                    <input type="submit" value="Submit" id="submit-button" />
                </form>
                <button id="button">Click to View Chart</button>
                <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
                <script src="/script.js"></script>
            </DefaultLayout>
        );
    }
}

module.exports = Home;