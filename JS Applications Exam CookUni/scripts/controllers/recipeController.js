import { partials, getSessionInfo } from "../common.js";
import { post, put, del, get } from "../requester.js";

const categoryImageMap = {
    "Vegetables and legumes/beans" : "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
    "Grain Food" : "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
    "Fruits" : "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
    "Milk, cheese, eggs and alternatives" : "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
    "Lean meats and poultry, fish and alternatives" : "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
};

export function getCreateRecipe(ctx){
    getSessionInfo(ctx);

    this.loadPartials(partials).then(function() {
        this.partial("./templates/recipe/recipeShare.hbs");
    });
}

export function postCreateRecipe(ctx){
    getSessionInfo(ctx);

    const { meal, prepMethod, description, foodImageURL, category} = ctx.params;
    const likesCounter = 0;
    const categoryImageURL = categoryImageMap[ctx.params.category];
    const ingredients = ctx.params.ingredients.split(" ");

    post("appdata", "recipes", { meal, prepMethod, description, foodImageURL, category, likesCounter, categoryImageURL, ingredients }, "Kinvey")
        .then(data => {
            alert("Recipe shared successfully!");
            ctx.redirect("#/createRecipe");
        })
        .catch(console.error);
}

export function getRecipeDetails(ctx){
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `recipes/${id}`, "Kinvey")
        .then(data => {
            ctx.category = data.category;
            ctx.ingredients = data.ingredients;
            ctx.categoryImageURL = data.categoryImageURL;
            ctx.description = data.description;
            ctx.id = data._id;
            ctx.likesCounter = data.likesCounter;
            ctx.meal = data.meal;
            ctx.prepMethod = data.prepMethod;
            ctx.foodImageURL = data.foodImageURL;

            if (data._acl.creator == ctx.userId) {
                ctx.isAuthor = true;
            }

            this.loadPartials(partials).then(function() {
                this.partial("./templates/recipe/recipeInfo.hbs");
            });
        })
        .catch(console.error);
}

export function getRecipeDelete(ctx) {
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `recipes/${id}`, "Kinvey")
        .then(data => {
            if (data._acl.creator == ctx.userId) {
                del("appdata", `recipes/${id}`, "Kinvey")
                    .then(() => {
                        ctx.redirect("#/home");
                    })
                    .catch(console.error);
            }
        })
        .catch(console.error);
}

export function getRecipeEdit(ctx) {
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `recipes/${id}`, "Kinvey")
        .then(data => {

            ctx.category = data.category;
            ctx.ingredients = data.ingredients.join(" ");
            ctx.categoryImageURL = data.categoryImageURL;
            ctx.description = data.description;
            ctx.id = data._id;
            ctx.likesCounter = data.likesCounter;
            ctx.meal = data.meal;
            ctx.prepMethod = data.prepMethod;
            ctx.foodImageURL = data.foodImageURL;

            this.loadPartials(partials).then(function() {
                this.partial("./templates/recipe/recipeEdit.hbs");
            });
        })
        .catch(console.error);
}

export function postRecipeEdit(ctx) {
    getSessionInfo(ctx);

    const {id, meal, prepMethod, description, foodImageURL, category} = ctx.params;
    const categoryImageURL = categoryImageMap[ctx.params.category];
    const ingredients = ctx.params.ingredients.split(" ");

    get("appdata", `recipes/${id}`, "Kinvey")
        .then(data => {
            const likesCounter = data.likesCounter;
            put("appdata", `recipes/${id}`, { meal, prepMethod, description, foodImageURL, category, likesCounter, categoryImageURL, ingredients }, "Kinvey")
                .then(() => {
                    alert("Recipe updated successfully!");
                    ctx.redirect("#/home");
                })
                .catch(console.error);
        })
        .catch(console.error);
}

export function getRecipeLike(ctx) {
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", `recipes/${id}`, "Kinvey")
        .then(data => {
            const { meal, prepMethod, description, foodImageURL, category, ingredients, categoryImageURL} = data;
            const likesCounter = data.likesCounter + 1;

            put("appdata", `recipes/${id}`, { meal, prepMethod, description, foodImageURL, category, likesCounter, categoryImageURL, ingredients }, "Kinvey")
                .then(() => {
                    ctx.redirect("#/home");
                })
                .catch(console.error);
        })
        .catch(console.error);
}