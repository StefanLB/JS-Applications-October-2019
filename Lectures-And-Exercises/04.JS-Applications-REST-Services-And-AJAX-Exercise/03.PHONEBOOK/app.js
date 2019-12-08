function attachEvents() {
    const person = document.querySelector('#person');
    const phone = document.querySelector('#phone');
    const phonebook = document.querySelector('#phonebook');

    const URL = 'https://phonebook-nakov.firebaseio.com/phonebook';
    const li = document.createElement('li');
    const btn = document.createElement('button');

    document.getElementById('btnLoad').addEventListener('click',loadContacts);
    document.getElementById('btnCreate').addEventListener('click',createContact);

    function deleteContact(id) {
        fetch(`${URL}/${id}.json`, {
            method: 'DELETE'
        })
            .then(() => loadContacts())
            .catch(handleError);
    }

    function loadContacts() {
        fetch(`${URL}.json`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                phonebook.textContent = '';
                Object.entries(data).forEach(([id, info]) => {
                    const liClone = li.cloneNode();
                    const btnClone = btn.cloneNode();

                    btnClone.textContent = 'Delete';
                    btnClone.addEventListener('click',() => deleteContact(id));

                    liClone.textContent = `${info.name} : ${info.phone}`;
                    liClone.appendChild(btnClone);

                    phonebook.appendChild(liClone);
                });
            })
            .catch(handleError);
    }

    function createContact() {
        if(!person.value || !phone.value) {
            return;
        }

        fetch(`${URL}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: person.value,
                phone: phone.value
            })
        })
            .then(() => loadContacts())
            .catch(handleError);

        person.value = '';
        phone.value = '';
    }

    function handleError() {
        const liClone = li.cloneNode();
        liClone.textContent = 'Error';
        phonebook.appendChild(liClone);
    }
}

attachEvents();