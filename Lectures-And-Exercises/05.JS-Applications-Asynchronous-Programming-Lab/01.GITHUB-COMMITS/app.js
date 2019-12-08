function loadCommits() {
    const baseURL = 'https://api.github.com/repos';
    const endpoint = 'commits';

    const username = document.querySelector('#username');
    const repo = document.querySelector('#repo');

    const commits = document.querySelector('#commits');
    commits.textContent = '';

    fetch(`${baseURL}/${username.value}/${repo.value}/${endpoint}`)
        .then(res => {
            if(res.ok) {
                return res.json();
            } else if (!res.ok) {
                throw res;
            }
        })
        .then(data => {
            data.forEach(repo => {
                processMessage(`${repo.commit.author.name}: ${repo.commit.message}`);
            });
        })
        .catch(err => {
            processMessage(`Error: ${err.status} (${err.statusText})`);
        });

    username.value = '';
    repo.value = '';

    function processMessage(message) {
        const li = document.createElement('li');
        li.textContent = message;
        commits.appendChild(li);
    }
}