function carFactory(props){
    let car;
    let wheels;
    const power = {
        'small': {power: 90, volume: 1800},
        'normal': {power: 120, volume: 2400},
        'monster': {power:200, volume: 3500}
    };

    car = {model:props.model};

    if(props.power <= 90){
        car = Object.assign(car, {engine: power['small']});
    } else if (props.power <= 120) {
        car = Object.assign(car, {engine: power['normal']});
    } else if (props.power <= 200) {
        car = Object.assign(car, {engine: power['monster']});
    }

    const carriage = {
        hatchback: {type: 'hatchback', color: props.color},
        coupe: {type: 'coupe', color: props.color}
    };

    car = Object.assign(car, {carriage: carriage[props.carriage]});
    props.wheelsize % 2 === 0 ? wheels = props.wheelsize - 1 : wheels = props.wheelsize;
    car = Object.assign(car, {wheels: Array(4).fill(wheels)});
    return car;
}

console.log(carFactory({
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    }
));
console.log(carFactory({
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));