function orderRectangles(params) {
    const rectangles = [];

    for(const [width, height] of params){

        const rectangle = {
            width,
            height,
            area: function() {
                return this.width*this.height;
            },
            compareTo: function (other) {
                return other.area() - this.area() || other.width - this.width;
            }
        };

        rectangles.push(rectangle);
    }

    return rectangles.sort((a,b) => a.compareTo(b));
}

console.log(orderRectangles([[10,5],[5,12]]));
console.log(orderRectangles([[10,5], [3,20], [5,12]]));