module.exports = (db) => {

    // app.get(`/newuser`)
    const userForm = (request, response) => {
        response.render(`newuser`);
    }

    // app.post(`/newuser`)
    const insertUserData = (request, response) => {
        const userObj = request.body;
        //'UPDATE'the row of logged in user
        const query = `UPDATE users SET (weight, gender, activity_level, diet_goal, goal_weight, goal_date, current_weight) = (${userObj.weight}, '${userObj.gender}', '${userObj.activity_level}', '${userObj.diet_goal}', ${userObj.goal_weight}, '${userObj.goal_date}', ${userObj.weight}) WHERE username = '${request.cookies.username}'`;
        console.log(query);
        db.data.insertData(query, (error) => {
            response.redirect(`/home`);
        })
    }

    // app.get(`/home`)
    // Redirects here after insertFood/insertData(??)
    const homePage = (request, response) => {
        const userId = Number(request.cookies.id);
        const query = `SELECT * FROM users WHERE username = '${request.cookies.username}'`;
        db.data.selectData(query, (error, selectedUserDetails) => {
            console.log(`inside homePage func `,selectedUserDetails);
            response.render(`home`, {selectedUserDetails : selectedUserDetails});
        })
    }

    // app.get(`/food`)
    const foodPage = (request, response) => {
        const userId = Number(request.cookies.id);
        const username = request.cookies.username;
        //Further
        //Include sort
        const query = `SELECT * FROM food_input WHERE user_id = ${userId} ORDER BY date_submitted ASC`;
        db.data.selectMultipleData(query, (error, arrOfFoodInputs) => {
            // console.log(`queryResult = `,arrOfFoodInputs);
            // What to do if im getting null
            response.render(`food`, {
                arrOfFoodInputs : arrOfFoodInputs,
                username : username
            })
        })
    }

    // // app.post(`/food`)
    // // This routes adds data to DB(food_input)..
    const insertFood = (request, response) => {
        const foodObj = request.body;
        const userId = Number(request.cookies.id);
        const query = `INSERT INTO food_input (calories, user_id, food_desc, date_submitted) VALUES (${foodObj.calories}, ${userId}, '${foodObj.desc}', '${foodObj.date}')`;
        db.data.insertData(query, (error) => {
            response.redirect(`/food`);
        })
    }

    // app.delete(`/food`)
    const deleteFood = (request, response) => {
        const foodId = request.body.id
        const query = `DELETE from food_input WHERE id = ${foodId};`
        db.data.insertData(query, (error) => {
            response.redirect(`/food`);
        })
    }

    // app.get(`/calorie`)
    const caloriePage = (request, response) => {
        const userId = Number(request.cookies.id);
        let date;
        if (request.query.date !== undefined) {
            date = request.query.date; //"yyyy-mm-dd"
        } else {
            const todayObj = new Date();
            date = new Date(todayObj.getTime() - (todayObj.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        }
        // console.log(`inside data.js date = `,date);
        const query = `SELECT calories from food_input WHERE user_id = ${userId} AND date_submitted = '${date}'`;
        db.data.selectMultipleData(query, (error, arrOfCalories) => {
            const secondQuery = `SELECT * FROM users WHERE id = ${userId}`;
            db.data.selectData(secondQuery, (error, userObj) => {
                response.render(`calorie`,
                    {
                        arrOfCalories : arrOfCalories, userObj : userObj
                    })
            })
        })
    }

    // app.post(`/calorie`)
    //Better way would be passing data using AJAX..
    const filterByDay = (request, response) => {
        const userId = Number(request.cookies.id);
        const date = encodeURIComponent(request.body.date);
        response.redirect(`/calorie?date=` + date)
    }

    // app.get(`/update`)
    const updateForm = (request, response) => {
        const query = `SELECT * FROM users WHERE username = '${request.cookies.username}'`;
        db.data.selectData(query, (error, userObj) => {
            // console.log(`inside data.js `,userObj);
            response.render(`update`, {userObj : userObj});
        })
    }

    // app.post('/update')
    const updateData = (request, response) => {
        const userObj = request.body;
        // console.log(`inside data.js `,userObj);
        const query = `UPDATE users SET (goal_weight, goal_date, current_weight, date_updated) = (${userObj.goal_weight}, '${userObj.goal_date}', ${userObj.weight}, '${userObj.date}') WHERE username = '${request.cookies.username}'`;
        // console.log(`query = `,query)
        // response.send(`check terminal..`)
        db.data.insertData(query, (error) => {
            if (error) {
                response.send(`Error encountered`);
            }
            response.redirect(`/home`);
        })
    }

    // Export the func()..
    return {
        userForm : userForm,
        insertUserData : insertUserData,
        homePage : homePage,
        foodPage : foodPage,
        insertFood : insertFood,
        deleteFood : deleteFood,
        caloriePage : caloriePage,
        filterByDay : filterByDay,
        updateForm : updateForm,
        updateData : updateData
    }
}