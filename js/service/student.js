async function loadStudents() {
    try {
        const students = await apiFetch('/api/students', { method: 'GET' });
        renderStudents(students);
    } catch (error) {
        console.error("Gagal load student:", error);
    }
}

function renderStudents(students) {
    const studentSection = document.getElementById('studentSection');
    if (!studentSection) return;
    studentSection.innerHTML = "";
    students.forEach(student => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${student.name} - Class: ${student.class}</p>
            <button onclick="showUpdateStudentForm(${student.id}, '${student.name}', ${student.age}, '${student.class}')">Edit</button>
            <button onclick="deleteStudent(${student.id})">Delete</button>
        `;
        studentSection.appendChild(div);
    });
}

async function createStudent(studentData) {
    try {
        const newStudent = await apiFetch('/api/students', {
            method: 'POST',
            body: JSON.stringify(studentData)
        });
        loadStudents();
        alert("Student created successfully!");
    } catch (error) {
        console.error("Error create student:", error);
    }
}

async function updateStudent(id, studentData) {
    try {
        await apiFetch(`/api/students/${id}`, {
            method: 'PUT',
            body: JSON.stringify(studentData)
        });
        loadStudents();
        alert("Student updated successfully!");
    } catch (error) {
        console.error("Error update student:", error);
    }
}

async function deleteStudent(id) {
    if (!confirm("Are you sure want to delete this student?")) return;
    try {
        await apiFetch(`/api/students/${id}`, { method: 'DELETE' });
        loadStudents();
        alert("Student deleted successfully!");
    } catch (error) {
        console.error("Error delete student:", error);
    }
}

// Fungsi untuk menampilkan form update student
function showUpdateStudentForm(id, name, age, studentClass) {
    document.getElementById('studentId').value = id;
    document.getElementById('studentName').value = name;
    document.getElementById('studentAge').value = age;
    document.getElementById('studentClass').value = studentClass;
    const updateStudentBtn = document.getElementById('updateStudentBtn');
    if (updateStudentBtn) {
        updateStudentBtn.onclick = () => {
            const studentData = {
                name: document.getElementById('studentName').value,
                age: Number(document.getElementById('studentAge').value),
                class: document.getElementById('studentClass').value
            };
            updateStudent(id, studentData);
        };
    }
}