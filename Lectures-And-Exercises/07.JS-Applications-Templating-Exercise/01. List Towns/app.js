const showInfo = async function (event) {
    event.preventDefault();

    const townsInput = document.querySelector('#towns');
    const towns = townsInput.value.split(',').map(town => town.trim()).filter(Boolean);

    const text = await fetch('./town.hbs').then(res => res.text());
    const template = Handlebars.compile(text);
    const context = {towns};

    document.querySelector('#root ul').innerHTML = template(context);
    townsInput.value = '';
};

function attachLoadBtns() {
    document.querySelector('#btnLoadTowns').addEventListener('click', showInfo);
}

attachLoadBtns();