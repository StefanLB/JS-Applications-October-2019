import {getHome} from "./controllers/homeController.js";
import {getAbout} from "./controllers/aboutController.js";
import {getLogin, getLogout, getRegister, postLogin, postRegister, getProfile} from "./controllers/userController.js";
import {getCreateRecipe, postCreateRecipe, getRecipeDetails, getRecipeEdit, getRecipeDelete, getRecipeLike, postRecipeEdit} from "./controllers/recipeController.js";

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
    // PROFILE
    app.get("#/profile", getProfile);

    // RECIPE
    app.get("#/createRecipe", getCreateRecipe);
    app.post("#/createRecipe", postCreateRecipe);
    app.get("#/recipes/:id", getRecipeDetails);
    app.get("#/recipes/edit/:id", getRecipeEdit);
    app.get("#/recipes/archive/:id", getRecipeDelete);
    app.get("#/recipes/like/:id", getRecipeLike);
    app.post("#/recipes/edit/:id", postRecipeEdit);
}