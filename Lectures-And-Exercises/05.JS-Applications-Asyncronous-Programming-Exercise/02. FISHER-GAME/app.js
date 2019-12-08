function attachEvents() {
    const baseURL = 'https://fisher-game.firebaseio.com/catches';

    const updateData = function(event) {
        const [angler, weight, species, location, bait, captureTime] =
            Array.from(event.target.parentNode.children).filter((e) => e.value);

        if (!angler.value || !weight.value || !species.value ||
            !location.value || !bait.value || !captureTime.value) {
            return;
        }

        const updateCatch = {
            angler: angler.value,
            weight: Number(weight.value),
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: Number(captureTime.value)
        };

        const catchId = event.target.parentNode.getAttribute('data-id');

        fetch(`${baseURL}/${catchId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateCatch)
        }).then(() => {

        }).catch(() => {

        });
    };

    const deleteData = function (event) {
        const catchId = event.target.parentNode.getAttribute('data-id');

        fetch(`${baseURL}/${catchId}.json`, {
            method: 'DELETE'
        }).then(() => {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        }).catch(() => {});
    };

    const addData = function (event) {
        const [angler, weight, species, location, bait, captureTime] =
            Array.from(event.target.parentNode.children).filter(e => e.value);


        if (!angler.value || !weight.value || !species.value ||
            !location.value || !bait.value || !captureTime.value) {
            return;
        }

        const addCatch = {
            angler: angler.value,
            weight: Number(weight.value),
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: Number(captureTime.value)
        };

        fetch(`${baseURL}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addCatch)
        }).then(() => {
            [angler.value, weight.value, species.value, location.value, bait.value, captureTime.value] = ['', '', '', '', '', ''];
            loadData();
        }).catch(() => {});
    };

    const loadData = function () {
        const catches = document.querySelector('#catches');

        fetch(`${baseURL}.json`, {
            method: 'GET'
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (!res.ok) {
                throw res;
            }
        }).then((data) => {

        catches.innerHTML = '';

        Object.entries(data).forEach(([id, info]) => {
            const div = document.createElement('div');
            div.setAttribute('class', 'catch');
            div.setAttribute(`data-id`, id);

            const labelAngler = document.createElement('label');
            labelAngler.textContent = 'Angler';
            div.appendChild(labelAngler);

            const inputAngler = document.createElement('input');
            inputAngler.type = 'text';
            inputAngler.classList.add('angler');
            inputAngler.value = info.angler;
            div.appendChild(inputAngler);

            const labelWeight = document.createElement('label');
            labelWeight.textContent = 'Weight';
            div.appendChild(labelWeight);

            const inputWeight = document.createElement('input');
            inputWeight.type = 'number';
            inputWeight.classList.add('weight');
            inputWeight.value = info.weight;
            div.appendChild(inputWeight);

            const labelSpecies = document.createElement('label');
            labelSpecies.textContent = 'Species';
            div.appendChild(labelSpecies);

            const inputSpecies = document.createElement('input');
            inputSpecies.type = 'text';
            inputSpecies.classList.add('species');
            inputSpecies.value = info.species;
            div.appendChild(inputSpecies);

            const labelLocation = document.createElement('label');
            labelLocation.textContent = 'Location';
            div.appendChild(labelLocation);

            const inputLocation = document.createElement('input');
            inputLocation.type = 'text';
            inputLocation.classList.add('location');
            inputLocation.value = info.location;
            div.appendChild(inputLocation);

            const labelBait = document.createElement('label');
            labelBait.textContent = 'Bait';
            div.appendChild(labelBait);

            const inputBait = document.createElement('input');
            inputBait.type = 'text';
            inputBait.classList.add('bait');
            inputBait.value = info.bait;
            div.appendChild(inputBait);

            const labelCaptureTime = document.createElement('label');
            labelCaptureTime.textContent = 'Capture Time';
            div.appendChild(labelCaptureTime);

            const inputCaptureTime = document.createElement('input');
            inputCaptureTime.type = 'number';
            inputCaptureTime.classList.add('captureTime');
            inputCaptureTime.value = info.captureTime;
            div.appendChild(inputCaptureTime);

            const buttonUpdate = document.createElement('button');
            buttonUpdate.classList.add('update');
            buttonUpdate.textContent = 'Update';
            buttonUpdate.addEventListener('click', updateData);
            div.appendChild(buttonUpdate);

            const buttonDelete = document.createElement('button');
            buttonDelete.classList.add('delete');
            buttonDelete.textContent = 'Delete';
            buttonDelete.addEventListener('click', deleteData);
            div.appendChild(buttonDelete);

            catches.appendChild(div);
        });
        }).catch(() => { });
    };

    document.querySelector('aside .load').addEventListener('click', loadData);
    document.querySelector('aside .add').addEventListener('click', addData);
}

attachEvents();

