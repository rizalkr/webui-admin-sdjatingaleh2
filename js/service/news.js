async function loadNews() {
    try {
        const news = await apiFetch('/api/news', { method: 'GET' });
        renderNews(news);
    } catch (error) {
        console.error("Gagal load news:", error);
    }
}

function renderNews(newsList) {
    const newsSection = document.getElementById('newsList');
    if (!newsSection) return;
    newsSection.innerHTML = "";
    newsList.forEach(newsItem => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>${newsItem.title}</h4>
            <p>${newsItem.content}</p>
            <button onclick="showUpdateNewsForm(${newsItem.id}, '${newsItem.title}', '${newsItem.content}')">Edit</button>
            <button onclick="deleteNews(${newsItem.id})">Delete</button>
        `;
        newsSection.appendChild(div);
    });
}

async function createNews(newsData) {
    try {
        const newNews = await apiFetch('/api/news', {
            method: 'POST',
            body: JSON.stringify(newsData)
        });
        loadNews();
        alert("News created successfully!");
    } catch (error) {
        console.error("Error create news:", error);
    }
}

async function updateNews(id, newsData) {
    try {
        await apiFetch(`/api/news/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newsData)
        });
        loadNews();
        alert("News updated successfully!");
    } catch (error) {
        console.error("Error update news:", error);
    }
}

async function deleteNews(id) {
    if (!confirm("Are you sure want to delete this news?")) return;
    try {
        await apiFetch(`/api/news/${id}`, { method: 'DELETE' });
        loadNews();
        alert("News deleted successfully!");
    } catch (error) {
        console.error("Error delete news:", error);
    }
}

function showUpdateNewsForm(id, title, content) {
    document.getElementById('newsId').value = id;
    document.getElementById('newsTitle').value = title;
    document.getElementById('newsContent').value = content;
    // Tampilkan modal update
    document.getElementById('updateNewsModal').style.display = 'block';
    const updateNewsBtn = document.getElementById('updateNewsBtn');
    if (updateNewsBtn) {
        updateNewsBtn.onclick = () => {
            const newsData = {
                title: document.getElementById('newsTitle').value,
                content: document.getElementById('newsContent').value
            };
            updateNews(id, newsData);
            closeUpdateNewsModal();
        };
    }
}

function closeUpdateNewsModal() {
    document.getElementById('updateNewsModal').style.display = 'none';
}

window.closeUpdateNewsModal = closeUpdateNewsModal;
// Expose fungsi agar bisa dipanggil dari file lain
window.news = {
    loadNews,
    createNews,
    updateNews,
    deleteNews,
    showUpdateNewsForm
};