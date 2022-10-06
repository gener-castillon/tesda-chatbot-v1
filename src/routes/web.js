import express from "express";
import homepageController from "../controllers/homepageController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", homepageController.getWebhook);
    router.post("/webhook", homepageController.postWebhook);
    router.post("/set-up-profile", homepageController.handleSetupProfile);
    router.get("/set-up-profile", homepageController.getSetupProfilePage);

    router.get("/application-form", homepageController.getApplicationPage);
    router.post("/set-application-info", homepageController.setApplicationInfo);


    return app.use("/", router);
};

module.exports = initWebRoutes;