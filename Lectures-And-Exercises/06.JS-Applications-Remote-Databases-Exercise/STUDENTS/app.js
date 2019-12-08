function attachEvents(){
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_rypfJhCor/students/';
    const [username, password] = ['guest', 'guest'];

    const headers = {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json'
    };

    const idCollection = [];
    const facultyNumbersCollection = [];
    const elements = {
        id: document.getElementById('id'),
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        facultyNumber: document.getElementById('facultyNumber'),
        grade: document.getElementById('grade'),
        table: document.getElementById('table'),
        tbody: document.getElementsByTagName('tbody')[0],
        btnSubmit: document.getElementById('submit'),
    };

    window.onload = loadStudents;

    elements.btnSubmit.addEventListener('click', registerStudent);

    function loadStudents() {
        elements.tbody.innerHTML = '';

        fetch(baseUrl, {
            method: 'GET',
            headers,
        })
        .then(response => response.json())
        .then(data => {
            data.sort((a,b) => a.id - b.id);
            data.forEach(student => {
                const {id, firstName, lastName, facultyNumber, grade} = student;
                idCollection.push(student.id);
                facultyNumbersCollection.push(student.facultyNumber);
                const studentTr = createTableRow(id, firstName, lastName, facultyNumber, grade);
                elements.tbody.appendChild(studentTr);
            });
        })
        .catch(alert);
    }

    async function registerStudent(event) {
        event.preventDefault();
        const student = getStudentInfo();
        const emptyFieldsPresent = !(student.id && student.firstName && student.lastName && student.facultyNumber && student.grade);

        if(idCollection.some(id => id === student.id)){
            alert(`Student with id: ${student.id} already exists!`);
        } else if(facultyNumbersCollection.some(fn => fn === student.facultyNumber)) {
            alert(`Student with faculty number: ${student.facultyNumber} already exists!`);
        } else if(emptyFieldsPresent) {
            alert(`Please fill out all input fields.`);
        } else {
            await fetch(baseUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(student)
            })
            .then(response => response.json())
            .catch(alert);

            clearInputFields();
            await loadStudents();
        }
    }

    function getStudentInfo(){
        const [id, firstName, lastName, facultyNumber, grade] =
            [elements.id.value, elements.firstName.value, elements.lastName.value, elements.facultyNumber.value, elements.grade.value];

        return {id, firstName, lastName, facultyNumber, grade};
    }

    function clearInputFields() {
        [elements.id.value, elements.firstName.value, elements.lastName.value, elements.facultyNumber.value, elements.grade.value] =
            ['', '', '', '', ''];
    }

    function createTableRow(id, firstName, lastName, facultyNumber, grade) {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        tdId.textContent = id;
        const tdFirstName = document.createElement('td');
        tdFirstName.textContent = firstName;
        const tdLastName = document.createElement('td');
        tdLastName.textContent = lastName;
        const tdFacultyNumber = document.createElement('td');
        tdFacultyNumber.textContent = facultyNumber;
        const tdGrade = document.createElement('td');
        tdGrade.textContent = grade;

        tr.appendChild(tdId);
        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdFacultyNumber);
        tr.appendChild(tdGrade);

        return tr;
    }
}

attachEvents();