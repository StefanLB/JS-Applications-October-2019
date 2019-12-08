import { partials, getSessionInfo } from "../common.js";
import { post } from "../requester.js";

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
      sessionStorage.setItem("names", data.firstName + " " + data.lastName);

      ctx.redirect("#/");
    })
    .catch(console.error);
}

export function getRegister(ctx) {
  getSessionInfo(ctx);

  this.loadPartials(partials).then(function() {
    this.partial("./templates/register/registerPage.hbs");
  });
}

export function postRegister(ctx) {
  const { firstName, lastName, username, password, repeatPassword } = ctx.params;

  if (password === repeatPassword) {
    post("user", "", { firstName, lastName, username, password }, "Basic")
      .then(data => {
          ctx.redirect("#/login");
      })
      .catch(console.error);
  } else {
    alert("Password and Repeat Password do not match.");
  }
}

export function getLogout(ctx) {
  sessionStorage.clear();
  ctx.redirect("#/");
}

export function getProfile(ctx) {
// TODO
}
