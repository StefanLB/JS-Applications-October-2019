import { partials, getSessionInfo } from "../common.js";
import { get } from "../requester.js";

export function getHome(ctx) {
  getSessionInfo(ctx);

  if (ctx.loggedIn) {
    get("appdata", "events", "Kinvey")
      .then(data => {
          ctx.anyEvents = data.length !== 0;
          ctx.events = data;
          partials.events = "./templates/events/events.hbs";
          partials.noEvents = "./templates/events/noEvents.hbs";

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
