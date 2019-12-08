function attachEvents() {
    const baseURL = 'https://judgetests.firebaseio.com';
    const span = document.createElement('span');
    const forecast = document.querySelector('#forecast');
    const current = document.querySelector('#current');
    const upcoming = document.querySelector('#upcoming');

    const weatherIcons = {
        'Sunny': '☀',
        'Partly sunny' : '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    };

    const getCurrent = function(code) {
        return fetch(`${baseURL}/forecast/today/${code}.json`).then(res => res.json());
    };

    const getUpcoming = function(code) {
        return fetch(`${baseURL}/forecast/upcoming/${code}.json`).then(res => res.json());
    };

    const createCurrent = function(data) {
        current.textContent = '';

        const divLabel = document.createElement('div');
        divLabel.classList.add('label');
        divLabel.textContent = 'Current conditions';
        current.appendChild(divLabel);

        const spanIcon = span.cloneNode();
        spanIcon.classList.add('condition', 'symbol');
        spanIcon.innerHTML = weatherIcons[data.forecast.condition];
        current.appendChild(spanIcon);

        const condition = span.cloneNode();
        condition.classList.add('condition');

        const spanName = span.cloneNode();
        spanName.classList.add('forecast-data');
        spanName.textContent = data.name;
        condition.appendChild(spanName);

        const spanLowHigh = span.cloneNode();
        spanLowHigh.classList.add('forecast-data');
        const degrees = weatherIcons.Degrees;
        spanLowHigh.innerHTML = data.forecast.low + degrees + '/' + data.forecast.high + degrees;
        condition.appendChild(spanLowHigh);

        const spanCondition = span.cloneNode();
        spanCondition.classList.add('forecast-data');
        spanCondition.textContent = data.forecast.condition;
        condition.appendChild(spanCondition);

        current.appendChild(condition);
        forecast.appendChild(current);
    };

    const createUpcoming = function(data) {
        upcoming.textContent = '';

        const divLabel = document.createElement('div');
        divLabel.classList.add('label');
        divLabel.textContent = 'Three-day forecast';
        upcoming.appendChild(divLabel);

        data.forecast.forEach(info => {
            const upcomingSpan = span.cloneNode();
            upcomingSpan.classList.add('upcoming');

            const IconSpan = span.cloneNode();
            IconSpan.classList.add('symbol');
            IconSpan.innerHTML = weatherIcons[info.condition];
            upcomingSpan.appendChild(IconSpan);

            const lowHighSpan = span.cloneNode();
            lowHighSpan.classList.add('forecast-data');
            const degrees = weatherIcons.Degrees;
            lowHighSpan.innerHTML = info.low + degrees + '/' + info.high + degrees;
            upcomingSpan.appendChild(lowHighSpan);

            const conditionSpan = span.cloneNode();
            conditionSpan.classList.add('forecast-data');
            conditionSpan.textContent = info.condition;
            upcomingSpan.appendChild(conditionSpan);

            upcoming.appendChild(upcomingSpan);
            forecast.appendChild(upcoming);
        });
    };

    const getWeather = async function() {
        const location = document.querySelector('#location');
        const weather = await fetch(`${baseURL}/locations.json`).then(res => res.json());
        const city = weather.find( info => info.name.toLowerCase() === location.value.toLowerCase());

        forecast.textContent = '';
        location.value = '';
        forecast.style.display = 'block';

        if(city === undefined) {
            const divForecast = document.createElement('div');

            divForecast.classList.add('forecasts');
            divForecast.textContent = 'Location does not exist in database. Try again.';
            forecast.appendChild(divForecast);
            return;
        }

        const currentDay = await getCurrent(city.code);
        const upcomingDays = await getUpcoming(city.code);

        createCurrent(currentDay);
        createUpcoming(upcomingDays);
    };

    document.querySelector('#submit').addEventListener('click',getWeather);
}

attachEvents();