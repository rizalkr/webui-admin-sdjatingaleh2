async function loadTeachers() {
    try {
        const teachers = await apiFetch('/api/teachers', { method: 'GET' });
        renderTeachers(teachers);
    } catch (error) {
        console.error("Gagal load teacher:", error);
    }
}

function renderTeachers(teachers) {
    // Gunakan elemen container khusus untuk daftar teacher
    const teacherList = document.getElementById('teacherList');
    if (!teacherList) return;
    teacherList.innerHTML = "";
    teachers.forEach(teacher => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>Nama : ${teacher.name} | Email : (${teacher.email}) | Mengajar : ${teacher.subject}</p>
            <button onclick="showUpdateTeacherForm(${teacher.id}, '${teacher.name}', '${teacher.username}', '${teacher.email}', '${teacher.subject}')">Edit</button>
            <button onclick="deleteTeacher(${teacher.id})">Delete</button>
        `;
        teacherList.appendChild(div);
    });
}

async function createTeacher(teacherData) {
    try {
        const newTeacher = await apiFetch('/api/teachers', {
            method: 'POST',
            body: JSON.stringify(teacherData)
        });
        loadTeachers();
        alert("Teacher created successfully!");
    } catch (error) {
        console.error("Error create teacher:", error);
    }
}

async function updateTeacher(id, teacherData) {
    try {
        const updatedTeacher = await apiFetch(`/api/teachers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(teacherData)
        });
        loadTeachers();
        alert("Teacher updated successfully!");
    } catch (error) {
        console.error("Error update teacher:", error);
    }
}

async function deleteTeacher(id) {
    if (!confirm("Are you sure want to delete this teacher?")) return;
    try {
        await apiFetch(`/api/teachers/${id}`, { method: 'DELETE' });
        loadTeachers();
        alert("Teacher deleted successfully!");
    } catch (error) {
        console.error("Error delete teacher:", error);
    }
}

function showUpdateTeacherForm(id, name, username, email, subject) {
    document.getElementById('teacherId').value = id;
    document.getElementById('teacherName').value = name;
    document.getElementById('teacherUsername').value = username;
    document.getElementById('teacherEmail').value = email;
    document.getElementById('teacherSubject').value = subject;
    // Tampilkan modal update
    document.getElementById('updateTeacherModal').style.display = 'block';
    const updateTeacherBtn = document.getElementById('updateTeacherBtn');
    if (updateTeacherBtn) {
        updateTeacherBtn.onclick = () => {
            const teacherData = {
                name: document.getElementById('teacherName').value,
                username: document.getElementById('teacherUsername').value,
                email: document.getElementById('teacherEmail').value,
                subject: document.getElementById('teacherSubject').value
            };
            updateTeacher(id, teacherData);
            closeUpdateTeacherModal();
        };
    }
}

function closeUpdateTeacherModal() {
    document.getElementById('updateTeacherModal').style.display = 'none';
}

window.closeUpdateTeacherModal = closeUpdateTeacherModal;

window.teacher = {
    loadTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    showUpdateTeacherForm
}