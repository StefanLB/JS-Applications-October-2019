function worker(props) {
    const water = 0.1;
    if(props.dizziness){
        props.levelOfHydrated = water*props.weight*props.experience+props.levelOfHydrated;
        props.dizziness = false;
    }

    return props;
}

console.log(worker({
        weight: 80,
        experience: 1,
        levelOfHydrated: 0,
        dizziness: true
    }
));

console.log(worker({ weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true }
));
console.log(worker({ weight: 95,
    experience: 3,
    levelOfHydrated: 0,
    dizziness: false }
));