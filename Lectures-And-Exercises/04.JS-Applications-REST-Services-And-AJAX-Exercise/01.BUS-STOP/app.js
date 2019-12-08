function getInfo() {
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    const URL = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;
    stopId.value = '';
    buses.textContent = '';

    fetch(URL)
        .then(res => {
            if(res.ok) {
                return res.json();
            } else if (!res.ok) {
                throw res;
            }
        })
        .then(data => showStops(data))
        .catch(err => handleError(err));

    function showStops(data) {
        stopName.textContent = data.name;
        Object.entries(data.buses).forEach(([busId, time]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            buses.appendChild(li);
        });
    }
    function handleError(err) {
        stopName.textContent = 'Error';
    }
}