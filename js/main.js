document.addEventListener('DOMContentLoaded', async () => {
    const token = auth.getToken();
    if (!token) {
        window.location.href = "login.html"; // Pastikan pathnya sesuai
        return;
    }

    // Load data awal
    loadTeachers();
    loadStudents();
    loadNews();

    // Setup event untuk logout (misal, elemen dengan id="logoutBtn" ada di dashboard.html)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.logout();
            window.location.href = "login.html";
        });
    }
    
    // Contoh: Event handler untuk "Create Teacher"
    const createTeacherBtn = document.getElementById('createTeacherBtn');
    if (createTeacherBtn) {
        createTeacherBtn.addEventListener('click', () => {
            const teacherData = {
                name: document.getElementById('teacherName').value,
                username: document.getElementById('teacherUsername').value,
                email: document.getElementById('teacherEmail').value,
                subject: document.getElementById('teacherSubject').value
            };
            createTeacher(teacherData);
        });
    }
    
    // Event handler serupa bisa dibuat untuk Student dan News, atau menggunakan event delegation.
});

// Helper: Tambahkan header Authorization
function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': auth.getToken()
    };
}

// Helper: Fungsi fetch wrapper
async function apiFetch(endpoint, options = {}) {
    const response = await fetch(endpoint, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...(options.headers || {})
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error (${response.status}) di ${endpoint}: ${errorText}`);
    }
    return response.json();
}