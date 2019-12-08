import { partials, getSessionInfo } from "../common.js";
import { displaySuccess, validateRegisterForm } from '../notifications.js';
import { post, get } from "../requester.js";

export function getLogin(ctx) {
  getSessionInfo(ctx);

  partials.loginForm = "./templates/login/loginForm.hbs";

  this.loadPartials(partials).then(function() {
    this.partial("./templates/login/loginPage.hbs");
  });
}

export function postLogin(ctx) {
  const { username, password } = ctx.params;

  post("user", "login", { username, password }, "Basic")
    .then(data => {
      sessionStorage.setItem("userId", data._id);
      sessionStorage.setItem("authtoken", data._kmd.authtoken);
      sessionStorage.setItem("username", data.username);

      displaySuccess("Successfully logged user.");
      ctx.redirect("#/");
    })
    .catch(console.error);
}

export function getRegister(ctx) {
  getSessionInfo(ctx);

  partials.registerForm = "./templates/register/registerForm.hbs";

  this.loadPartials(partials).then(function() {
    this.partial("./templates/register/registerPage.hbs");
  });
}

export function postRegister(ctx) {
  const { username, password, rePassword } = ctx.params;

  if (validateRegisterForm(username, password, rePassword)) {
    post("user", "", { username, password }, "Basic")
      .then(data => {
          post("user", "login", { username, password }, "Basic")
            .then(data => {
              sessionStorage.setItem("userId", data._id);
              sessionStorage.setItem("authtoken", data._kmd.authtoken);
              sessionStorage.setItem("username", data.username);

              displaySuccess("Successfully registered user.");
              ctx.redirect("#/");
            })
            .catch(console.error);
      })
      .catch(console.error);
  }
}

export function getLogout(ctx) {
  sessionStorage.clear();
  displaySuccess("Logout successful.");
  ctx.redirect("#/");
}

export function getUser(ctx) {
    getSessionInfo(ctx);

    const id = ctx.params.id;

    get("appdata", "treks", "Kinvey")
        .then(data => {

            ctx.treks = data.filter(e => e.organizer === ctx.username);
            ctx.treksCount = ctx.treks.length;

            this.loadPartials(partials).then(function() {
                this.partial("./templates/user/profile.hbs");
            });
        })
        .catch(console.error);
}
