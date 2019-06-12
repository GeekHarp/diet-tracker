const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Calorie extends React.Component {
    render() {
        const userObj = this.props.userObj;
        //console.log
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
        calculateRDI(userWeight, userObj.gender, userObj.activity_level, userObj.diet_goal);

        let contents;

        const todayObj = new Date();
        const date = new Date(todayObj.getTime() - (todayObj.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

        if (this.props.arrOfCalories !== null) {
            const arrOfCalories = this.props.arrOfCalories;

            let totalCalories = 0;
            const calculateTotalCalories = (arr) => {
                for (let i = 0; i < arr.length; i++) {
                    totalCalories += arr[i].calories;
                }
                return totalCalories;
            }
            calculateTotalCalories(arrOfCalories);

            const percentage = Math.floor((totalCalories / RDI) * 100);
            const divStyle = { width : `${percentage}%`};

            const difference = RDI - totalCalories;

            let p;
            if (difference > 0) {
                p = `${difference} more Calories to go for the day!`;
            } else {
                p = `You met your Calorie Need for today`;
            }

            contents = (
                <div class="big-container">
                <div class="ui container">

                    <h1 class="ui green header">Your Calorie Tracker</h1>

                    <form action="/calorie" method="POST" class="ui form">
                    <div class="fields">
                    <div class="field">
                        <label>Date</label>
                        <div class="ui calendar">
                            <div class="ui input left icon">
                              <i class="calendar icon"></i>
                              <input type="date" name="date" value={date}/>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <button class="ui black button">Filter</button>
                    </div>
                    </div>
                    </form>

                    <div class="small-container">
                        <h4 class="first-h4 ui green header">
                        CALORIES CONSUMED<br/>
                        {totalCalories} Calories</h4>
                        <h4>
                        RECOMMENDED CALORIE NEED<br/>
                        {RDI} Calories</h4>
                    </div>

                    <div class="ui green progress">
                      <div class="bar" style={divStyle}>
                        <div class="progress">{percentage}%</div>
                      </div>
                      <div class="label">
                        {p}
                      </div>
                    </div>

                </div>
                </div>
            );
        } else {
            contents = (
                <div class="big-container">
                <div class="ui container">

                    <h1 class="ui green header">Your Calorie Tracker</h1>

                    <form action="/calorie" method="POST" class="ui form">
                    <div class="fields">
                    <div class="field">
                        <label>Date</label>
                        <div class="ui calendar">
                            <div class="ui input left icon">
                              <i class="calendar icon"></i>
                              <input type="date" name="date" value={date}/>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <button class="ui black button">Filter</button>
                    </div>
                    </div>
                    </form>

                    <div class="small-container">
                        <h1 class="first-h4 ui green header">
                        No records found. Start Adding!</h1>
                        <h4>
                        RECOMMENDED CALORIE NEED<br/>
                        {RDI} Calories</h4>
                    </div>

                    <div class="ui green progress">
                      <div class="bar" style={{width:"0%"}}>
                        <div class="progress">0%</div>
                      </div>
                      <div class="label">
                        {RDI} more Calories to go for the day!
                      </div>
                    </div>
                </div>
                </div>
            )
        }

        console.log(contents);


        return (
            <DefaultLayout title="Calorie" username={userObj.username}>
                {contents}
            </DefaultLayout>
        );
    }
}

module.exports = Calorie;

// <h2>Your Daily Calorie Need is {RDI} Calories</h2>
// <h2>You consumed {totalCalories} Calories</h2>

// <form action="/calorie" method="POST">
//     Date: <input type="date" name="date" value={date}/>
//     <button>Filter</button>
// </form>

// <div class="progress">
//     <div class="progress-bar" role="progressbar" style={divStyle} aria-valuemin="0" aria-valuemax="100">
//         {percentage}%
//     </div>
// </div>
// <p>{difference} more Calories to go for the day!</p>