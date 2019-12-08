import {getHome} from "./controllers/homeController.js";
import {getLogin, getLogout, getRegister, postLogin, postRegister, getUser} from "./controllers/userController.js";
import {getCreate, postCreate, getEdit, postEdit, getDetails, getDelete, getLike} from "./controllers/trekController.js"

export default function router(app){

    // HOME
    app.get("/", getHome);
    app.get("#/", getHome);
    app.get("#/home", getHome);
    app.get("index.html", getHome);

    // REGISTER
    app.get("#/register", getRegister);
    app.post("#/register", postRegister);

    // LOGIN
    app.get("#/login", getLogin);
    app.post("#/login", postLogin);

    // LOGOUT
    app.get("#/logout", getLogout);

    // USER
    app.get("#/user/:id", getUser);

    // TREK
    app.get("#/create", getCreate);
    app.post("#/create", postCreate);
    app.get("#/edit/:id", getEdit);
    app.post("#/edit/:id", postEdit);
    app.get("#/details/:id", getDetails);
    app.get("#/delete/:id", getDelete);
    app.get("#/like/:id", getLike);
}