function loginUser(username, password) {
    return fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(async response => {
        console.log('Response status:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return JSON.parse(responseBody);
    })
    .then(data => {
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