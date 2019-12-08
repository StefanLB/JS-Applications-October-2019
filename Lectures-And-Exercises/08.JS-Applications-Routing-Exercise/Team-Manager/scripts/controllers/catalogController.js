import { getSessionInfo, partials } from "../common.js";
import { get } from "../requester.js";

export function getCatalog(ctx) {
  getSessionInfo(ctx);

  partials.team = "./templates/catalog/team.hbs";

  get("appdata", "teams", "Kinvey")
    .then(data => {
      get("user", `${sessionStorage.getItem("userId")}`, "Kinvey")
        .then(userData => {
          ctx.hasNoTeam =
            userData.teamId === "" || userData.teamId === undefined;

          ctx.teams = data;

          this.loadPartials(partials).then(function() {
            this.partial("./templates/catalog/teamCatalog.hbs");
          });
        })
        .catch(console.error);
    })
    .catch(console.error);
}