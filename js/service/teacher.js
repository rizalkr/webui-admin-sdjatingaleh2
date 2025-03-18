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
    const tbody = document.querySelector('#teacherTable tbody');
    if (!tbody) return;
    tbody.innerHTML = "";
    teachers.forEach(teacher => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.username}</td>
            <td>${teacher.email}</td>
            <td>${teacher.subject}</td>
            <td class="actions">
                <button class="edit-btn" onclick="showUpdateTeacherForm(${teacher.id}, '${teacher.name}', '${teacher.username}', '${teacher.email}', '${teacher.subject}')">Edit</button>
                <button class="delete-btn" onclick="deleteTeacher(${teacher.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
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