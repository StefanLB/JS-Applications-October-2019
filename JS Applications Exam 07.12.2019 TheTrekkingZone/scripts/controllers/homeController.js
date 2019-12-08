import { partials, getSessionInfo } from "../common.js";
import { get } from "../requester.js";

export function getHome(ctx) {
  getSessionInfo(ctx);

  if (ctx.loggedIn) {

    partials.allTreks = "./templates/treks/allTreks.hbs";
    partials.noTreks = "./templates/home/home-noTreks.hbs";

    get("appdata", "treks", "Kinvey")
      .then(data => {
          ctx.anyTreks = data.length !== 0;
          ctx.treks = data.sort((a, b) => (b.likes - a.likes));

        this.loadPartials(partials).then(function() {
          this.partial("./templates/home/home.hbs");
        });
      })
      .catch(console.error);
  } else {
    partials.anonymousHome = "./templates/home/home-anonymous.hbs";
    this.loadPartials(partials).then(function() {
      this.partial("./templates/home/home.hbs");
    });
  }
}
