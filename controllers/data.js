module.exports = (db) => {
    // app.get(`/newuser`)
    const dataForm = (request, response) => {
        response.render(`newuser`);
    }

    // app.post(`/newuser`)
    // Over here, we are doing 2 queries...
    const insertData = (request, response) => {
        const query = `SELECT * FROM users WHERE username = '${request.cookies.username}'`;
        db.data.selectUser(query, (error, selectedUser) => {
            const userObj = request.body;
            const userId = selectedUser.id;
            const secondQuery = `INSERT INTO users_details (weight,gender,activity_level,diet_goal,goal_weight,user_id) VALUES
            (${userObj.weight},'${userObj.gender}','${userObj.activitylevel}','${userObj.dietgoal}','${userObj["goalweight"]}',${userId})`;
            db.data.insertData(secondQuery, (error) => {
                response.render(`home`, userObj);
            })
        })
    }

    // Export the func()..
    return {
        dataForm : dataForm,
        insertData : insertData
    }
}