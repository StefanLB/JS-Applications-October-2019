export function getSessionInfo(ctx) {
  ctx.userId = sessionStorage.getItem("userId");
  ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
  ctx.username = sessionStorage.getItem("username");
}

export const partials = {
  header: "./templates/common/header.hbs",
  footer: "./templates/common/footer.hbs"
};
