async function loadStudents() {
    try {
        const students = await apiFetch('/api/students', { method: 'GET' });
        renderStudents(students);
    } catch (error) {
        console.error("Gagal load student:", error);
    }
}

function renderStudents(students) {
    const studentList = document.getElementById('studentList');
    if (!studentList) return;
    studentList.innerHTML = "";
    students.forEach(student => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${student.name} - Age: ${student.age}, Class: ${student.class}</p>
            <button onclick="showUpdateStudentForm(${student.id}, '${student.name}', ${student.age}, '${student.class}')">Edit</button>
            <button onclick="deleteStudent(${student.id})">Delete</button>
        `;
        studentList.appendChild(div);
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

function showUpdateStudentForm(id, name, age, studentClass) {
    document.getElementById('studentId').value = id;
    document.getElementById('studentName').value = name;
    document.getElementById('studentAge').value = age;
    document.getElementById('studentClass').value = studentClass;
    // Tampilkan modal update
    document.getElementById('updateStudentModal').style.display = 'block';
    const updateStudentBtn = document.getElementById('updateStudentBtn');
    if (updateStudentBtn) {
        updateStudentBtn.onclick = () => {
            const studentData = {
                name: document.getElementById('studentName').value,
                age: Number(document.getElementById('studentAge').value),
                class: document.getElementById('studentClass').value
            };
            updateStudent(id, studentData);
            closeUpdateStudentModal();
        };
    }
}

function closeUpdateStudentModal() {
    document.getElementById('updateStudentModal').style.display = 'none';
}

window.closeUpdateStudentModal = closeUpdateStudentModal;

// Expose fungsi agar bisa dipanggil dari file lain
window.student = {
    loadStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    showUpdateStudentForm
};