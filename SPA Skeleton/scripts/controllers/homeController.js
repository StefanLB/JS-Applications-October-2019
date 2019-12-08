import { partials, getSessionInfo } from "../common.js";
import { get } from "../requester.js";

export function getHome(ctx) {
  getSessionInfo(ctx);

  if (ctx.loggedIn) {
    get("user", `${ctx.userId}`, "Kinvey")
      .then(data => {

          // TODO: Add logic when user is logged in

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
