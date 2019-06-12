const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Home extends React.Component {



    render() {
        const userObj = this.props.selectedUserDetails;

        // this func subtract the time zone offset to get a date obj(UTC)
        const convertUTC = (dateObj) => {
            return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000));
        }

        //this func formats the date obj(dd month yyyy)
        const format = (dateObj) => {
            var months =["Jan","Feb","Mar",
                                  "Apr","May","Jun",
                                  "Jul","Aug","Sep",
                                  "Oct","Nov","Dec"];

            var day = dateObj.getDate();
            var index = dateObj.getMonth();
            var year = dateObj.getFullYear();

            return "" + day + " " + months[index] + " " + year;
        }

        const startDateObj = convertUTC(userObj.date_created);
        const currentDateObj = convertUTC(userObj.date_updated)
        const goalDateObj = convertUTC(userObj.goal_date);

        const startDate = format(startDateObj);
        const currentDate = format(currentDateObj)
        const goalDate = format(goalDateObj);
        // console.log(`yay? `,goalDate);

        let percentage = Math.floor((userObj.current_weight - userObj.weight) / (userObj.goal_weight - userObj.weight) * 100);
        const divStyle = { width: `${percentage}%`};

        const difference = Math.abs(userObj.goal_weight - userObj.current_weight);

        let p;
        if (difference !== 0) {
            p = `You are ${difference.toFixed(1)} KG away from your Goal!`
        } else if (difference <= 0) {
            p = `Congratulations! You achieved your Goal`
        }

        if (percentage < 0) {
            percentage = 0;
        }

        return (
            <DefaultLayout title="Home" username={userObj.username}>
                <div class="big-container">
                    <div class="ui container">

                        <h1 class="ui green header">Your Progress</h1>

                        <div>
                            <div class="small-container">
                                <h4 class="first-h4 ">
                                    START WEIGHT<br />
                                    {startDate}<br/>
                                    {userObj.weight.toFixed(1)} KG
                                </h4>
                                <h4 class="ui green header">
                                    CURRENT WEIGHT<br />
                                    {currentDate}<br />
                                    {userObj.current_weight.toFixed(1)} KG
                                </h4>
                                <h4>
                                    GOAL WEIGHT<br />
                                    {goalDate}<br/>
                                    {userObj.goal_weight.toFixed(1)} KG
                                </h4>
                            </div>
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
            </DefaultLayout>
        );
    }
}

module.exports = Home;

// <p>Start {userObj.weight} {startDate}</p>
// <p>Current {userObj.current_weight} {currentDate}</p>
// <p>Goal {userObj.goal_weight} {goalDate}</p>