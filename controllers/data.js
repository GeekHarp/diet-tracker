module.exports = (db) => {

    // app.get(`/newuser`)
    const dataForm = (request, response) => {
        // Add a
        response.render(`newuser`);
    }

    // app.post(`/newuser`)
    // Over here, we are doing 2 queries...
    const insertData = (request, response) => {
        const query = `SELECT * FROM users WHERE username = '${request.cookies.username}'`;
        db.data.selectData(query, (error, selectedUser) => {
            const userObj = request.body;
            const userId = selectedUser.id;
            const secondQuery = `INSERT INTO users_details (weight,gender,activity_level,diet_goal,goal_weight,user_id) VALUES
            (${userObj.weight},'${userObj.gender}','${userObj.activity_level}','${userObj.diet_goal}','${userObj.goal_weight}',${userId})`;
            db.data.insertData(secondQuery, (error) => {
                // I assume we redirect user to his/her homepg?
                response.redirect(`/${userId}`);
            })
        })
    }

    // app.post(`/newfood`) from homePage
    // This routes adds data to DB(calorie_diary)..
    const insertFoodData = (request, response) => {
        const query = `SELECT * FROM users WHERE username = '${request.cookies.username}'`;
        db.data.selectData(query, (error, selectedUser) => {
            const calories = parseFloat(request.body.calories);
            const userId = selectedUser.id;
            const secondQuery = `INSERT INTO calorie_input (calories,user_id) VALUES (${calories},${userId})`;
            db.data.insertData(secondQuery, (error) => {
                response.redirect(`/${userId}`);
            })
        })
    }

    // app.get(`/:id`)
    // Redirects here after insertFoodData/insertData(??)
    const homePage = (request, response) => {
        const reqId = parseFloat(request.params.id);
        const query = `SELECT * FROM users_details WHERE user_id = ${reqId}`;
        db.data.selectData(query, (error, selectedUserDetails) => {
            // Passing in 2 obj into home.jsx..
            // For now I will hard-code the query(date) until I got calender figured out
            const secondQuery = `SELECT * FROM calorie_input WHERE user_id = '${reqId}' AND date_created = '2019-04-23'`;
            db.data.selectMultipleData(secondQuery, (error, selectedCalorieDiary) => {
                response.render(`home`, {details : selectedUserDetails, diary : selectedCalorieDiary});
            })
        })
    }

    // Route for AJAX
    // const grabData = (request, response) => {
    //     const userId = parseFloat(request.cookies.id);
    //     const query = `SELECT * FROM users_details WHERE user_id = ${userId}`;
    //     db.data.selectData(query, (error, selectedUserDetails) => {
    //         // Passing in 1 obj and an arr into home.jsx..
    //         // For now I will hard-code the query(date) until I got calender figured out
    //         const secondQuery = `SELECT * FROM calorie_input WHERE user_id = '${userId}' AND date_created = '2019-04-22'`;
    //         db.data.selectMultipleData(secondQuery, (error, selectedCalorieDiary) => {
    //             // Get the 'RDI'
    //             const detailsObj = selectedUserDetails; // {}
    //             // Get the Calories consumed
    //             const calorieDiaryArr = selectedCalorieDiary; // [{}, {}]
    //             const userWeight = parseFloat(detailsObj.weight);
    //             let RDI;
    //             const checkActivityLevel = (activityLevel) => {
    //                 if (activityLevel === 'light') {
    //                     return RDI *= 1.55;
    //                 } else if (activityLevel === 'moderate') {
    //                     return RDI *= 1.65;
    //                 } else if (activityLevel === 'heavy') {
    //                     return RDI *= 1.8;
    //                 }
    //             }
    //             const checkDietGoal = (dietGoal) => {
    //                 if (dietGoal === 'wl') {
    //                     return RDI -= 500;
    //                 } else if (dietGoal === 'swl') {
    //                     return RDI -= 300;
    //                 } else if (dietGoal === 'swg') {
    //                     return RDI += 200;
    //                 } else if (dietGoal === 'wg') {
    //                     return RDI += 500;
    //                 } else {
    //                     return RDI
    //                 }
    //             }
    //             const calculateRDI = (weight, gender, activityLevel, dietGoal) => {
    //                 RDI = weight * 24;
    //                 if (gender === 'female') {
    //                     RDI *= 0.9;
    //                 }
    //                 checkActivityLevel(activityLevel);
    //                 checkDietGoal(dietGoal);
    //                 RDI = Math.floor(RDI);
    //                 return RDI;
    //             }
    //             calculateRDI(userWeight, detailsObj.gender, detailsObj.activity_level, detailsObj.diet_goal);

    //             // We calculate the total calories consumed by THAT user That particular day
    //             let totalCalories = 0;
    //             const calculateTotalCalories = (arr) => {
    //                 for (let i = 0; i < arr.length; i++) {
    //                     totalCalories += arr[i].calories;
    //                 }
    //                 return totalCalories;
    //             }
    //             calculateTotalCalories(calorieDiaryArr);
    //             // console.log(`inside grabData()`, RDI, totalCalories);
    //             const caloriesLeft = RDI - totalCalories;
    //             const obj = {
    //                 consumed : `${totalCalories}`,
    //                 remaining : `${caloriesLeft}`
    //             }
    //             response.send(obj); //{}
    //         })
    //     })
    // }

    // Export the func()..
    return {
        dataForm : dataForm,
        insertData : insertData,
        insertFoodData : insertFoodData,
        // pickDate : pickDate,
        homePage : homePage
        // grabData : grabData
    }
}