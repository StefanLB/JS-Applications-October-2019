import { partials, getSessionInfo } from "../common.js";

export function getAbout(ctx) {
  getSessionInfo(ctx);

  this.loadPartials(partials).then(function() {
    this.partial("./templates/about/about.hbs");
  });
}