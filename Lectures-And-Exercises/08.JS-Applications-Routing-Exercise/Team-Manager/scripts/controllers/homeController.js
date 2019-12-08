import { partials, getSessionInfo } from "../common.js";
import { get } from "../requester.js";

export function getHome(ctx) {
  getSessionInfo(ctx);

  if (ctx.loggedIn) {
    get("user", `${ctx.userId}`, "Kinvey")
      .then(data => {
        ctx.hasTeam = data.teamId !== "" && data.teamId !== undefined;

        if (ctx.hasTeam) {
          ctx.teamId = data.teamId;
        }

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
