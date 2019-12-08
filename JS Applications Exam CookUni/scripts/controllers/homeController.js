import { partials, getSessionInfo } from "../common.js";
import { get } from "../requester.js";

export function getHome(ctx) {
  getSessionInfo(ctx);

  if (ctx.loggedIn) {
    get("appdata", "recipes", "Kinvey")
      .then(data => {

        ctx.anyRecipes = data.length !== 0;
        ctx.recipes = data;

        partials.recipe = "./templates/recipe/recipe.hbs";

        this.loadPartials(partials).then(function() {
          this.partial("./templates/home/home.hbs");
        });
      })
      .catch(console.error);
  } else {
    this.loadPartials(partials).then(function() {
      this.partial("./templates/home/home.hbs");
    });
  }
}
