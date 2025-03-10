// Fungsi untuk melakukan login dan menyimpan token di localStorage
function loginUser(username, password) {
    return fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        // Misalnya, API mengembalikan format { token: 'Bearer ...' }
        setToken(data.token);
        return data.token;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

// Simpan token ke localStorage
function setToken(token) {
    localStorage.setItem('authToken', token);
}

// Ambil token dari localStorage
function getToken() {
    return localStorage.getItem('authToken');
}

// Fungsi logout, hapus token dari localStorage
function logout() {
    localStorage.removeItem('authToken');
}

// Expose fungsi ke window agar bisa diakses di file HTML lain
window.auth = {
    loginUser,
    getToken,
    logout
};