function sortedList() {
    return {
        numberedList: [],
        size: 0,
        add: function (element) {
            this.numberedList.push(element);
            this.numberedList.sort((a,b) => a-b);
            this.size++;
        },
        remove: function (index) {
            if (index >= 0 && index < this.numberedList.length) {
                this.numberedList.splice(index,1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && this.numberedList.length) {
                return this.numberedList[index];
            }
        }
    }
}