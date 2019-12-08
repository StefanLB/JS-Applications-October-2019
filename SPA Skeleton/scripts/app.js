import router from '../scripts/router.js';

const app = Sammy("#main", function() {

  this.use("Handlebars", "hbs");

  router(this);

});

app.run("#/");
