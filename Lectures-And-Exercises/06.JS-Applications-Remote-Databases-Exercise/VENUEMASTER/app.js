function attachEvents(){
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_BJ_Ke8hZg';
    const [username, password] = ['guest', 'pass'];

    const headers = {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
    };

    document.querySelector('#getVenues').addEventListener('click',getIds);
    const venueInfo = document.querySelector('#venue-info');

    async function getIds() {
        const date = document.querySelector('#venueDate');

        venueInfo.textContent = '';
        const span = document.createElement('span');
        span.classList.add('loading');
        span.textContent = 'loading...';
        venueInfo.appendChild(span);

        try {
            const allIds = await fetch(`${baseUrl}/rpc/${appKey}/custom/calendar?query=${date.value}`, {
                method: 'POST',
                headers
            }).then(res => res.json());

            await getVenues(allIds);

        } catch(err) {
            alert(`Error: ${err.message}`);
        }
    }

    async function getVenues(allIds) {
        const venues = [];
        try {
            for (const id of allIds) {
                const venue = await fetch(`${baseUrl}/appdata/${appKey}/venues/${id}`, {
                    method: 'GET',
                    headers
                }).then(res => res.json());

                venues.push(venue);
            }
        } catch (err) {
            alert(`Error: Could not load venues for this date. Please try with a different date or try again later.`);
        }

        showVenues(venues);
    }

    function showVenues(venues) {
        venueInfo.textContent = '';
        venues.forEach(venue => {
            const div = document.createElement('div');
            div.classList.add('venue');
            div.id = venue._id;
            div.innerHTML =
                `<span class = "venue-name">
                    <input class="info" type="button" value="More info">
                    ${venue.name}
                </span>
                <div class="venue-details" style="display: none;">
                    <table>
                        <tr>
                            <th>Ticket Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td class="venue-price">${venue.price} lv</td>
                            <td>
                                <select class="quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </td>
                            <td>
                                <input class="purchase" type="button" value="Purchase">
                            </td>
                        </tr>
                    </table>
                    <span class="head">Venue description:</span>
                    <p class="description">${venue.description}</p>
                    <p class="description">Starting time: ${venue.startingHour}</p>
                </div>`;

            venueInfo.appendChild(div);
            venueInfo.lastElementChild.querySelector('input.info').addEventListener('click', moreInfo);
            venueInfo.lastElementChild.querySelector('input.purchase').addEventListener('click', makePurchase);
        });
    }

    function moreInfo() {
        const div = this.parentNode.nextElementSibling;

        div.style.display === 'none' ? div.style.display = 'block' : div.style.display = 'none';
    }

    function makePurchase() {
        const venue = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

        const id = venue.getAttribute('id').trim();
        const name = venue.querySelector('.venue-name').textContent.trim();
        const price = Number(venue.querySelector('.venue-price').textContent.split(' ')[0].trim());
        const quantity = Number(venue.querySelector('select.quantity').value.trim());

        venueInfo.innerHTML =
            `<span class="head">Confirm purchase</span>
            <div class="purchase-info">
                <span>${name}</span>
                <span>${quantity} x ${price.toFixed(2)}</span>
                <span>Total: ${(quantity * price).toFixed(2)} lv</span>
                <input type="button" value="Confirm">
            </div>`;

        document.querySelector('input[value=Confirm]')
            .addEventListener('click', () => confirmPurchase(id, quantity));
    }

    async function confirmPurchase(id, quantity) {
        try {
            const data = await fetch(`${baseUrl}/rpc/${appKey}/custom/purchase?venue=${id}&qty=${quantity}`, {
                method: 'POST',
                headers
                }).then(res => res.json());

            venueInfo.innerHTML = "You may print this page as your ticket\n" + data.html;
        } catch (err) {
            alert(`Error: ${err.message}`)
        }
    }
}

attachEvents();