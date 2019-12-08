function solve() {
    let stopName = '';
    let nextStop = 'depot';
    const info = document.querySelector('#info .info');

    function depart() {
        const URL = `https://judgetests.firebaseio.com/schedule/${nextStop}.json`;

        fetch(URL)
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else if (!res.ok) {
                    throw res;
                }
            })
            .then(data => showInfo(data))
            .catch(err => handleError(err));

        function showInfo(data) {
            stopName = data.name;
            nextStop = data.next;

            info.textContent = `Next stop ${stopName}`;
            document.getElementById('depart').disabled = true;
            document.getElementById('arrive').disabled = false;
        }
        function handleError(err) {
            info.textContent = 'Error';
            document.getElementById('depart').disabled = true;
            document.getElementById('arrive').disabled = true;
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${stopName}`;
        document.getElementById('arrive').disabled = true;
        document.getElementById('depart').disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();