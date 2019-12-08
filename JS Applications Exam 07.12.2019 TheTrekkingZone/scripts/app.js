import router from '../scripts/router.js';

const app = Sammy("#router", function() {

  this.use("Handlebars", "hbs");

  router(this);

});

app.run("#/");
