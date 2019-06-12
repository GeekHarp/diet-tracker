const React = require(`react`);
const DefaultLayout = require(`./default.jsx`);

class Food extends React.Component {
    render() {
        let tr;
        if (this.props.arrOfFoodInputs !== null) {
            tr = this.props.arrOfFoodInputs.map(obj => {
                const convertUTC = (dateObj) => {
                    return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000));
                }

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

                const dateObj = convertUTC(obj.date_submitted);
                const date = format(dateObj);

                //Pass this in to the hidden<input>..
                let idForDelete = String(obj.id);
                return (
                    <tr>
                        <td>{date}</td>
                        <td>{obj.calories}</td>
                        <td>{obj.food_desc}</td>
                        <td>
                            <form action="/food?_method=delete" method="POST">
                                <input type="number" name="id" value={idForDelete} hidden/>
                                <button class="ui black basic button">Delete</button>
                            </form>
                        </td>
                    </tr>
                )
            })
        } else {
            tr = <h1 class="ui green header">No records found. Start Adding!</h1>
        }

        const todayObj = new Date();
        const date = new Date(todayObj.getTime() - (todayObj.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

        return (
            <DefaultLayout title="Food" username={this.props.username}>
            <div class="big-container">
                <div class="ui container">
                    <h1 class="ui green header">Your Food Intake</h1>
                    <form class="ui form" action="/food" method="POST">
                        <div class="fields">
                          <div class="field">
                            <label>Calories</label>
                            <input type="text" name="calories" placeholder="Integer Only"/>
                          </div>
                          <div class="field">
                            <label>Description</label>
                            <input type="text" name="desc" placeholder="What you ate"/>
                          </div>
                          <div class="field">
                            <label>Date</label>
                            <div class="ui calendar">
                                <div class="ui input left icon">
                                  <i class="calendar icon"></i>
                                  <input type="date" name="date" value={date}/>
                                </div>
                              </div>
                          </div>
                        </div>
                        <button class="ui black button" type="submit">Submit</button>
                        <div class="ui error message"></div>
                    </form>

                    <table class="ui celled table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Calories</th>
                          <th>Food Description</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tr}
                      </tbody>
                    </table>
                </div>
            </div>
            </DefaultLayout>
        );
    }
}

module.exports = Food;

// <table class="table">
//   <thead>
//     <tr>
//       <th scope="col">Date</th>
//       <th scope="col">Calories</th>
//       <th scope="col">Food Description</th>
//       <th scope="col">Delete</th>
//     </tr>
//   </thead>
//   <tbody>
//     {tr}
//   </tbody>
// </table>