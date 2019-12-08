class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(username,salary,position,department){
        if(!username || !position || !department){
            throw new Error("Invalid input!");
        }
        if(salary < 0 || salary === '' || salary ===undefined || salary === null) {
            throw new Error("Invalid input!");
        }
        let existingDepartment = this.departments.find(x=> x.name === department);

        if(!existingDepartment){
            existingDepartment = {
                name: department,
                employees: [],
                averageSalary: function () {
                    return this.employees.reduce((a,b) => a + b.salary, 0) / this.employees.length;
                }
            }
        }

        existingDepartment.employees.push({username, salary, position});
        this.departments.push(existingDepartment);

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment(){
        let [bestDepartment] = [...this.departments]
            .sort((a,b) => {
                return b.averageSalary() - a.averageSalary()
            });

        let result = `Best Department is: ${bestDepartment.name}\n`;
        result += `Average salary: ${bestDepartment.averageSalary().toFixed(2)}\n`;
        result += [...bestDepartment.employees]
            .sort((a,b) => b.salary - a.salary || a.username.localeCompare(b.username))
            .map(e => `${e.username} ${e.salary} ${e.position}`)
            .join('\n');

        return result;
    }
}


let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
