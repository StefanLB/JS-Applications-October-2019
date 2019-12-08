function classHierarchy(){
    class Figure {
        constructor() {
            this.units = {
                m: 0.01,
                cm: 1,
                mm: 10
            };
            this.defaultUnits = this.units.cm;
            if (new.target === Figure) {
                throw new Error('Figure class is abstract.');
            }
        }

        changeUnits(str) {
            this.defaultsUnits = str;
        }

        toString() {
            return ``;
        };
    }

    class Circle extends Figure {
        constructor(radius, str) {
            super();
            this.radius = radius;
            this.defaultsUnits = this.units[str] || 'cm';
        }

        get area() {
            return this.radius * this.units[this.defaultsUnits] * this.radius * this.units[this.defaultsUnits] * Math.PI;
        }

        toString() {
            return `Figures units: ${this.defaultsUnits} Area: ${this.area} - radius: ${this.radius * this.units[this.defaultsUnits]}`
        }
    }

    class Rectangle extends Figure {
        constructor(x, y, str){
            super();
            this.x = x;
            this.y = y;
            this.defaultsUnits = str || çm;
        }

        get area() {
            return this.x * this.units[this.defaultsUnits] * this.y * this.units[this.defaultsUnits];
        }

        toString() {
            return `Figures units: ${this.defaultsUnits} Area: ${this.area} - width: ${this.x * this.units[this.defaultsUnits]}, height: ${this.y * this.units[this.defaultsUnits]}`
        }
    }

    return {
        Figure,
        Circle,
        Rectangle
    };
}


let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50
