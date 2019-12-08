function objectFactory(params) {
    const object = {};
    JSON.parse(params)
        .map(x => Object.assign(object, x));

    return object;
}

console.log(objectFactory(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`));
console.log(objectFactory(`[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`));