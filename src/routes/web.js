import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.checkAuth, homeController.getHomePage);
    router.get('/setup-profile', homeController.checkAuth, homeController.setupProfile);
    router.get('/setup-persistent-menu', homeController.checkAuth, homeController.setupPersistentMenu);
    router.post('/webhook', homeController.postWebhook);
    router.get('/webhook', homeController.getWebhook);
    router.get('/excel', homeController.checkAuth, homeController.getGoogleSheet);
    router.get('/crawler', homeController.getCrawler);
    router.get('/spam', homeController.checkAuth, homeController.spamMessage);
    router.post('/send-message', homeController.checkAuth, homeController.sendMessage);
    router.post('/get-user', homeController.checkAuth, homeController.postUser);
    router.get('/send', homeController.checkAuth, homeController.sendTeamplate);
    router.get('/update-food', homeController.checkAuth, homeController.updateFood);
    router.get('/login', homeController.checkLoginAuth, homeController.getLogin);
    router.get('/add-config', homeController.checkAuth, homeController.addConfig);
    router.post('/check-login', homeController.checkLoginAuth, homeController.checkLogin);
    router.get('/check-login', (req, res, next) => {
        return res.redirect('/login');
    });
    return app.use('/', router);
};

module.exports = initWebRoutes;
