function attachEvents() {
    document.getElementById('submit').addEventListener('click', postInfo);
    document.getElementById('refresh').addEventListener('click', getInfo);

    const messages = document.getElementById('messages');
    const URL = 'https://rest-messanger.firebaseio.com/messanger.json';

    function postInfo() {
        const author = document.getElementById('author');
        const content = document.getElementById('content');

        if (author.value === '' || content.value === '') {
            return;
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: author.value,
                content: content.value,
            })
        })
            .then(() => {
                [author.value, content.value] = ['', ''];
            })
            .catch(() => {
                messages.textContent = 'Error';
            });
    }

    function getInfo() {

        fetch(URL, {
            method: 'GET'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                messages.textContent = '';
                const output = [];

                Object.values(data)
                    .forEach((info) => {
                        output.push(`${info.author}: ${info.content}`);
                    });
                messages.textContent = output.join('\n');
            })
            .catch(() => {
                messages.textContent = 'There are no messages in the Database.';
            });
    }
}

attachEvents();