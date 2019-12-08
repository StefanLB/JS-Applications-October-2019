import {getHome} from "./controllers/homeController.js";
import {getAbout} from "./controllers/aboutController.js";
import {getLogin, getLogout, getRegister, postLogin, postRegister} from "./controllers/userController.js";

export default function router(app){

    // HOME
    app.get("/", getHome);
    app.get("#/", getHome);
    app.get("#/home", getHome);
    app.get("index.html", getHome);

    // ABOUT
    app.get("#/about", getAbout);

    // REGISTER
    app.get("#/register", getRegister);
    app.post("#/register", postRegister);

    // LOGIN
    app.get("#/login", getLogin);
    app.post("#/login", postLogin);

    // LOGOUT
    app.get("#/logout", getLogout);

    // TODO: Add all remaining routes
}