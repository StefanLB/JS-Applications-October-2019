import {getHome} from "./controllers/homeController.js";
import {getLogin, getLogout, getRegister, postLogin, postRegister, getUser} from "./controllers/userController.js";
import {getCreate, postCreate, getDetails, getEdit, postEdit, getJoin, getDelete} from "./controllers/eventController.js"

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

    // EVENTS
    app.get("#/events/create", getCreate);
    app.post('#/events/create', postCreate);
    app.get('#/events/details/:id', getDetails);
    app.get('#/events/edit/:id', getEdit);
    app.post('#/events/edit/:id', postEdit);
    app.get('#/events/join/:id', getJoin);
    app.get('#/events/delete/:id', getDelete);

    // USER
    app.get("#/user/:id", getUser);
}