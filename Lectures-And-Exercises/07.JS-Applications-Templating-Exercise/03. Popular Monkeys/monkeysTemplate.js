const displayInfo = function() {
    const pInfo = this.nextElementSibling;
    pInfo.style.display === 'none' ? pInfo.style.display = 'block' : pInfo.style.display = 'none';
};

(async function() {
    const text = await fetch('./monkey.hbs').then(res => res.text());
    const template = Handlebars.compile(text);
    const context = {monkeys};

    document.querySelector('div.monkeys').innerHTML = template(context);
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', displayInfo);
    });
})();