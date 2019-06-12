module.exports = (app, allModels) => {
    // Require the func() from 'controller'
    const userController = require('./controllers/user')(allModels);
    const dataController = require(`./controllers/data`)(allModels);
    // ROUTES..
    app.get(`/`, userController.rootPage);
    app.get(`/register`, userController.registrationForm);
    app.post(`/register`, userController.registerUser);
    app.post(`/login`, userController.userAuthentication);
    app.get(`/logout`, userController.logOut);

    app.get(`/newuser`, dataController.userForm);
    app.post(`/newuser`, dataController.insertUserData);

    app.get(`/home`, dataController.homePage);

    app.get(`/food`, dataController.foodPage);
    app.post(`/food`, dataController.insertFood);
    app.delete(`/food`, dataController.deleteFood);

    app.get(`/calorie`, dataController.caloriePage);
    app.post(`/calorie`, dataController.filterByDay);

    app.get(`/update`, dataController.updateForm);
    app.post(`/update`, dataController.updateData);
};