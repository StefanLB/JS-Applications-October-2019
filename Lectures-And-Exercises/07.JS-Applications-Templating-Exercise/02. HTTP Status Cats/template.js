const displayInfo = function() {
     const divStatus = this.nextElementSibling;
     divStatus.style.display === 'none' ? divStatus.style.display = 'block' : divStatus.style.display = 'none';
};

(async function() {
     const text = await fetch('./cat.hbs').then(res => res.text());
     const template = Handlebars.compile(text);
     const context = {cats};

     document.querySelector('#allCats ul').innerHTML = template(context);

     document.querySelectorAll('button').forEach(button => {
          button.addEventListener('click', displayInfo);
     });
})();
