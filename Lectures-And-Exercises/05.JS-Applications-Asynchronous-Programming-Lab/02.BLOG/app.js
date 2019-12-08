function attachEvents() {
    const baseURL = 'https://blog-apps-c12bf.firebaseio.com';
    const postsEndpoint = 'posts';
    const commentsEndpoint = 'comments';

    document.querySelector('#btnLoadPosts').addEventListener('click', loadPosts);
    document.querySelector('#btnViewPost').addEventListener('click', viewPosts);

    const select = document.querySelector('#posts');
    const option = document.createElement('option');

    const postTitle = document.querySelector('#post-title');
    const postBody = document.querySelector('#post-body');

    const postComments = document.querySelector('#post-comments');
    const li = document.createElement('li');

    async function loadPosts() {
        select.textContent = '';
        const posts = await getPosts();

        Object.entries(posts).forEach(([id, info]) => {
            const optionClone = option.cloneNode();
            optionClone.value = id;
            optionClone.textContent = info.title;
            select.appendChild(optionClone);
        });
    }

    async function viewPosts() {
        const postId = select.options[select.selectedIndex].value;
        const post = await getPost(postId);
        const comments = await getComments();

        postTitle.textContent = post.title;
        postBody.textContent = post.body;
        postComments.textContent = '';

        Object.entries(comments)
            .filter(([id, info]) => {
                return info.postId === post.id;
            })
            .forEach(([id, info]) => {
                const liClone = li.cloneNode();
                liClone.textContent = info.text;
                postComments.appendChild(liClone);
            });
    }

    function getPosts() {
        return fetch(`${baseURL}/${postsEndpoint}.json`).then(res => res.json());
    }

    function getPost(postId) {
        return fetch(`${baseURL}/${postsEndpoint}/${postId}.json`).then(res => res.json());
    }

    function getComments() {
        return fetch(`${baseURL}/${commentsEndpoint}.json`).then(res => res.json());
    }
}

attachEvents();