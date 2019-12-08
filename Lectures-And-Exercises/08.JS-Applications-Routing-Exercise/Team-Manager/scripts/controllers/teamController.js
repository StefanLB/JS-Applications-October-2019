import { getSessionInfo, partials } from "../common.js";
import { get, post, put } from "../requester.js";

export function getDetails(ctx) {
  getSessionInfo(ctx);

  const id = ctx.params.id;

  partials.teamMember = "./templates/catalog/teamMember.hbs";
  partials.teamControls = "./templates/catalog/teamControls.hbs";

  get("appdata", `teams/${id}`, "Kinvey")
    .then(data => {
      ctx.members = data.members;
      ctx.name = data.name;
      ctx.comment = data.comment;
      ctx.teamId = data._id;

      if (data._acl.creator == ctx.userId && data.members.includes(ctx.username)) {
        ctx.isAuthor = true;
      }

      if (data.members.includes(ctx.username)) {
        ctx.isOnTeam = true;
      }

      this.loadPartials(partials).then(function() {
        this.partial("./templates/catalog/details.hbs");
      });
    })
    .catch(console.error);
}

export function getCreate(ctx) {
  getSessionInfo(ctx);

  partials.createForm = "./templates/create/createForm.hbs";

  this.loadPartials(partials).then(function() {
    this.partial("./templates/create/createPage.hbs");
  });
}

export function postCreate(ctx) {
  getSessionInfo(ctx);

  const { name, comment } = ctx.params;
  const members = [];
  members.push(ctx.username);

  post("appdata", "teams", { name, comment, members }, "Kinvey")
    .then(data => {
      const teamId = data._id;

      put("user", `${ctx.userId}`, { teamId }, "Kinvey")
        .then(() => {})
        .catch(console.error);

      ctx.redirect("#/catalog");
    })
    .catch(console.error);
}

export function putJoin(ctx) {
  getSessionInfo(ctx);

  get("user", `${ctx.userId}`, "Kinvey")
    .then(userData => {
      if (userData.teamId !== "" && userData.teamId !== undefined) {
        alert("You already participate in a team.");
      } else {
        const teamId = ctx.params.teamId;

        get("appdata", `teams/${teamId}`, "Kinvey")
          .then(data => {
            data.members.push(ctx.username);

            put("appdata", `teams/${teamId}`, data, "Kinvey")
              .then(data => {
                put("user", `${ctx.userId}`, { teamId }, "Kinvey")
                  .then(() => {
                    ctx.redirect(`#/catalog/${teamId}`);
                  })
                  .catch(console.error);
              })
              .catch(console.error);
          })
          .catch(console.error);
      }
    })
    .catch(console.error);
}

export function getEdit(ctx) {
  getSessionInfo(ctx);

  get("appdata", `teams/${ctx.params.teamId}`, "Kinvey")
    .then(data => {
      partials.editForm = "./templates/edit/editForm.hbs";

      ctx.teamId = ctx.params.teamId;
      ctx.name = data.name;
      ctx.comment = data.comment;

      this.loadPartials(partials).then(function() {
        this.partial("./templates/edit/editPage.hbs");
      });
    })
    .catch(console.error);
}

export function postEdit(ctx) {
  getSessionInfo(ctx);

  const { name, comment, teamId } = ctx.params;

  get("appdata", `teams/${teamId}`, "Kinvey")
    .then(data => {
      data.name = name;
      data.comment = comment;

      put("appdata", `teams/${teamId}`, data, "Kinvey")
        .then(() => {
          ctx.redirect(`#/catalog/${teamId}`);
        })
        .catch(console.error);
    })
    .catch(console.error);
}

export function putLeave(ctx) {
  getSessionInfo(ctx);

  const teamId = ctx.params.teamId;

  get("appdata", `teams/${teamId}`, "Kinvey")
    .then(data => {
      const userIndex = data.members.indexOf(ctx.username);
      data.members.splice(userIndex, 1);

      put("appdata", `teams/${teamId}`, data, "Kinvey")
        .then(() => {
          put("user", `${ctx.userId}`, { teamId: "" }, "Kinvey")
            .then(() => {
              ctx.redirect("#/catalog");
            })
            .catch(console.error);
        })
        .catch(console.error);
    })
    .catch(console.error);
}