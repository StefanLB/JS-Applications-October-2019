function getFibonator(){
    var a = 0;
    var b = 1;

    return function(){
        let temp = a + b;
        a = b;
        b = temp;
        return a;
    }
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
