const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Update extends React.Component {
    render() {
        const userObj = this.props.userObj;

        const convertUTC = (dateObj) => {
            return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000));
        }

        const goalDateObj = convertUTC(userObj.goal_date);
        const goalDate = goalDateObj.toISOString().split("T")[0];
        // console.log(`inside update.jsx `,typeof goalDate);
        //"yyyy-mm-dd"
        //Gives us an obj of today's date
        const todayObj = new Date();
        // console.log(`todayObj = `,todayObj)
        //new Date(todayObj.getTime() - (todayObj.getTimezoneOffset() * 60000)) converts your date to a date object that corresponds with the time Sun May 11 2014 00:00:00 in UTC by subtracting the time zone offset
        const date = new Date(todayObj.getTime() - (todayObj.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        // console.log(`inside update.jsx `,date);

        return (
            <DefaultLayout title="Settings" username={userObj.username}>
            <div class="big-container">
            <div class="ui container">
                <h1 class="ui green header">Update your Weight or Goal</h1>
                <form action="/update" method="POST" class="ui form two">
                <div class="fields">
                <div class="field">
                    <label>Current Weight</label>
                    <input type="text" name="weight" value={userObj.current_weight} />
                </div>
                <div class="field">
                    <label>Goal Weight</label>
                    <input type="text" name="goal_weight" value={userObj.goal_weight} />
                </div>
                <div class="field">
                    <label>Achieve Goal By</label>
                    <div class="ui calendar">
                    <div class="ui input left icon">
                    <i class="calendar icon"></i>
                    <input type="date" name="goal_date" value={goalDate}/>
                    <input type="date" name="date" value={date} hidden/>
                    </div>
                    </div>
                </div>
                <div class="field">
                    <button class="ui black button">Save</button>
                </div>
                </div>
                <div class="ui error message"></div>
                </form>
            </div>
            </div>
            </DefaultLayout>
        );
    }
}

module.exports = Update;