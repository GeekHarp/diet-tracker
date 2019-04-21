module.exports = (app, allModels) => {
    // Require the func() from 'controller'
    const userController = require('./controllers/user')(allModels);
    const dataController = require(`./controllers/data`)(allModels);
    // ROUTES..
    app.get(`/register`, userController.registrationForm);
    app.post(`/register`, userController.registerUser);
    app.get(`/login`, userController.loginPage);
    app.post(`/login`, userController.userAuthentication);

    app.get(`/newuser`, dataController.dataForm);
    app.post(`/newuser`, dataController.insertData);
};