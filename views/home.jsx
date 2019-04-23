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

        const caloriesLeft = RDI - totalCalories;
        return (
            <html>
            <head>
                <title>Calories Tracker</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="/css/home.css" />
            </head>
            <body class="container d-flex justify-content-center">
                <div>
                    <h1 class="text-center">My Calories Diary</h1>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Recommended Calorie Intake</th>
                          <th scope="col">Calories Consumed</th>
                          <th scope="col">Calories Left</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{RDI}</td>
                          <td>{totalCalories}</td>
                          <td>{caloriesLeft}</td>
                        </tr>
                      </tbody>
                    </table>
                    <form action="/newfood" method="POST">
                        Enter the Calories you Consumed here*: <input type="number" name="calories" min="0" step="1" />
                        <input type="submit" value="Submit" class="btn btn-dark" />
                    </form>
                    <a class="btn btn-dark" href="/newuser" role="button">Submit Details to Start Tracking!</a>
                    <a class="btn btn-dark" href="/" role="button">Homepage</a>
                </div>
            </body>
            </html>
        );
    }
}

module.exports = Home;