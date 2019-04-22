module.exports = (app, allModels) => {
    // Require the func() from 'controller'
    const userController = require('./controllers/user')(allModels);
    const dataController = require(`./controllers/data`)(allModels);
    // ROUTES..
    app.get(`/register`, userController.registrationForm);
    app.post(`/register`, userController.registerUser);
    app.get(`/login`, userController.loginPage);
    app.post(`/login`, userController.userAuthentication);
    // User must be logged in before he/she can submit newuser's data...
    app.get(`/newuser`, dataController.dataForm);
    app.post(`/newuser`, dataController.insertData);
    app.post(`/newfood`, dataController.insertFoodData);
    app.get(`/grabdata`, dataController.grabData);
    // This is the 'homePage'
    app.get(`/:id`, dataController.homePage);
    // app.get(`/:id/progress`, );
    // app.get(`/:id/edit`, );
    // a way to exclude :id?!
};