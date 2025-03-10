# Rebranding Web Profile SD Jatingaleh 2 - Backend

Proyek backend untuk aplikasi web profile SD Jatingaleh 2 menggunakan Node.js, Express, Sequelize (PostgreSQL) serta JWT untuk otentikasi. Testing dilakukan menggunakan Jest dan Supertest dengan laporan menggunakan jest-junit.

---

## Daftar Isi

- [Instalasi & Konfigurasi](#instalasi--konfigurasi)
- [Struktur Proyek](#struktur-proyek)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Server](#menjalankan-server)
- [Endpoint API](#endpoint-api)
  - [Autentikasi](#autentikasi)
  - [Admin](#admin)
  - [Teacher](#teacher)
  - [Student](#student)
  - [News](#news)
- [Error Handling & Middleware](#error-handling--middleware)
- [Testing](#testing)
  - [Global Setup & Teardown](#global-setup--teardown)
  - [Menjalankan Test](#menjalankan-test)
- [.gitignore](#.gitignore)
- [Kontribusi](#kontribusi)
- [License](#license)

---

## Instalasi & Konfigurasi

1. **Clone Repository:**

   ```sh
   git clone git+ssh://git@github.com/rizalkr/backend-sd-jatingaleh2.git
   cd backend-sd-jatingaleh2
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Konfigurasi Environment:**

   Buat file `.env` di root proyek berdasarkan file contoh `.env-example`. Contoh isi `.env`:

   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=123
   DB_NAME=sdjatingaleh2
   DB_PORT=5432

   JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjFAamF0aW5nYWxlaDIuY29tIiwiaWF0IjoxNzQxNDY0MzA2LCJleHAiOjE3NDE1NTA3MDZ9.WZyI0GA6k2VzpyWvdNkvRdjYcK5WliiMyNJFj5lRF58
   PORT=3000
   ```

---

## Struktur Proyek

```
├── config
│   └── db.js                # Konfigurasi koneksi database menggunakan Sequelize
├── controllers
│   ├── adminController.js   # CRUD Admin
│   ├── authController.js    # Autentikasi (login)
│   ├── teacherController.js # CRUD Teacher
│   ├── studentController.js # CRUD Student
│   └── newsController.js    # CRUD News (Berita)
├── middleware
│   ├── auth.js              # Middleware otentikasi dengan JWT
│   └── errorHandler.js      # Global error handler untuk Express
├── models
│   ├── Admin.js             # Model Admin (username, email, password)
│   ├── Teacher.js           # Model Teacher (username, name, email, subject)
│   ├── Student.js           # Model Student (name, age, class)
│   └── News.js              # Model News (title, content, dll)
├── routes
│   ├── adminRoutes.js       # Routes CRUD Admin (base URL: /api/admin)
│   ├── authRoutes.js        # Routes untuk autentikasi (login)
│   ├── teacherRoutes.js     # Routes CRUD Teacher (base URL: /api/teachers)
│   ├── studentRoutes.js     # Routes CRUD Student (base URL: /api/students)
│   └── newsRoutes.js        # Routes CRUD News (base URL: /api/news)
├── tests                    # File-file test menggunakan Jest dan Supertest
│   ├── admin.test.js
│   ├── teacher.test.js
│   ├── student.test.js
│   └── news.test.js
├── .env-example             # Contoh file environment
├── .gitignore               # Daftar file/folder yang diabaikan Git
├── app.js                   # Konfigurasi dan mounting route untuk Express
├── server.js                # Entry point untuk menjalankan server
├── globalSetup.js           # Sinkronisasi database sebelum test dijalankan
├── globalTeardown.js        # Menutup koneksi database setelah test selesai
├── setupTests.js            # Inisialisasi tambahan untuk Jest (boleh kosong)
├── jest.config.js           # Konfigurasi Jest
└── package.json             # Dependency dan script
```

---

## Konfigurasi Environment

File konfigurasi koneksi database ada di `config/db.js` dan menggunakan variabel environment dari file `.env`. Pastikan file `.env` telah dikonfigurasi dengan benar sesuai contoh pada `.env-example`.

---

## Menjalankan Server

Untuk menjalankan server secara lokal, gunakan perintah:
 
```sh
npm run dev
```

Atau untuk menjalankan server secara production:

```sh
npm start
```

Server akan berjalan pada port yang telah ditentukan di file `.env` (default 3000).

---

## Endpoint API

### Autentikasi

**Endpoint:**

- **POST /api/auth/login**

**Deskripsi:**  
Endpoint ini digunakan untuk melakukan autentikasi admin. Setelah login, server mengembalikan JWT.

**Request Body (JSON):**

```json
{
  "username": "admintest",
  "password": "adminpassword"
}
```

**Response:**

- **200 OK:** Mengembalikan token JWT:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **404 Not Found:** Jika admin tidak ditemukan.
- **401 Unauthorized:** Jika password salah.

---

### Admin

**Base URL:** `/api/admin`

**Endpoints:**

- **GET /**  
  _Deskripsi:_ Ambil semua data admin.  
  _Response:_ JSON array data admin.

- **GET /:id**  
  _Deskripsi:_ Ambil data admin berdasarkan ID.  
  _Response:_ JSON data admin atau 404 jika tidak ditemukan.

- **POST /**  
  _Deskripsi:_ Buat admin baru.  
  _Request Body:_
  ```json
  {
    "username": "newadmin",
    "email": "newadmin@example.com",
    "password": "newpassword"
  }
  ```  
  _Response:_ 201 Created, mengembalikan data admin baru.

- **PUT /:id**  
  _Deskripsi:_ Memperbarui data admin berdasarkan ID.  
  _Request Body:_ Field yang akan diperbarui (username, email, password).  
  _Response:_ 200 OK, mengembalikan data admin yang telah diupdate.

- **DELETE /:id**  
  _Deskripsi:_ Hapus admin berdasarkan ID.  
  _Response:_ 200 OK, pesan sukses.

---

### Teacher

**Base URL:** `/api/teachers`

**Endpoints:**

- **GET /**  
  _Deskripsi:_ Ambil semua data teacher.  
  _Response:_ JSON array data teacher.

- **GET /:id**  
  _Deskripsi:_ Ambil data teacher berdasarkan ID.  
  _Response:_ JSON data teacher atau 404 jika tidak ditemukan.

- **POST /**  
  _Deskripsi:_ Buat teacher baru.  
  _Request Body:_
  ```json
  {
    "name": "Guru Matematika",
    "username": "guru_matematika",
    "email": "guru.matematika@example.com",
    "subject": "Matematika"
  }
  ```  
  _Response:_ 201 Created, mengembalikan data teacher yang baru dibuat.

- **PUT /:id**  
  _Deskripsi:_ Update data teacher berdasarkan ID.  
  _Request Body:_ Field yang ingin diupdate (misalnya `name`, `email`, `subject`).  
  _Response:_ 200 OK, mengembalikan data teacher yang telah diupdate.

- **DELETE /:id**  
  _Deskripsi:_ Hapus teacher berdasarkan ID.  
  _Response:_ 200 OK, pesan sukses.

---

### Student

**Base URL:** `/api/students`

**Endpoints:**

- **GET /**  
  _Deskripsi:_ Ambil semua data student.  
  _Response:_ JSON array data student.

- **GET /:id**  
  _Deskripsi:_ Ambil data student berdasarkan ID.  
  _Response:_ JSON data student atau 404 jika tidak ditemukan.

- **POST /**  
  _Deskripsi:_ Buat student baru.  
  _Request Body:_
  ```json
  {
    "name": "Siswa 1",
    "age": 15,
    "class": "10A"
  }
  ```  
  _Response:_ 201 Created, mengembalikan data student baru.

- **PUT /:id**  
  _Deskripsi:_ Update data student berdasarkan ID.  
  _Request Body:_ Field yang ingin diupdate (misalnya `name`, `age`, `class`).  
  _Response:_ 200 OK, mengembalikan data student yang telah diupdate.

- **DELETE /:id**  
  _Deskripsi:_ Hapus student berdasarkan ID.  
  _Response:_ 200 OK, pesan sukses.

---

### News

**Base URL:** `/api/news`

**Endpoints:**

- **GET /**  
  _Deskripsi:_ Ambil semua data berita.  
  _Response:_ JSON array data berita.

- **GET /:id**  
  _Deskripsi:_ Ambil berita berdasarkan ID.  
  _Response:_ JSON data berita.  
  **Catatan:** Pada saat ini, implementasi controller News menggunakan metode Mongoose (find, findById, save, remove) yang seharusnya diubah ke metode Sequelize seperti `findAll()`, `findByPk()`, `destroy()`, dan `update()`. Pastikan untuk memperbaharui controller agar konsisten dengan model Sequelize.

- **POST /**  
  _Deskripsi:_ Buat berita baru.  
  _Request Body:_
  ```json
  {
    "title": "Berita Terbaru",
    "content": "Isi berita terbaru..."
  }
  ```  
  _Response:_ 201 Created, mengembalikan data berita baru.

- **PUT /:id**  
  _Deskripsi:_ Update berita berdasarkan ID.  
  _Response:_ 200 OK, mengembalikan data berita yang telah diupdate.

- **DELETE /:id**  
  _Deskripsi:_ Hapus berita berdasarkan ID.  
  _Response:_ 200 OK, pesan sukses.

---

## Error Handling & Middleware

- **Middleware Otentikasi (`middleware/auth.js`):**  
  Memeriksa header `Authorization` dengan format `Bearer <token>`. Jika token valid (diparsing dengan JWT dan sesuai data Admin di database), maka melanjutkan proses. Jika tidak, mengembalikan status 401.

- **Error Handler (`middleware/errorHandler.js`):**  
  Menangani error global dan mengembalikan pesan error dengan status code. Stack trace hanya ditampilkan pada mode development.

---

## Testing

Testing menggunakan Jest & Supertest. Struktur testing ada di folder `tests`.

### Global Setup & Teardown

- **globalSetup.js:**  
  Mengimpor semua model (Admin, Teacher, Student, News) dan melakukan sinkronisasi database dengan `sequelize.sync({ force: true })` agar tabel dibuat ulang sebelum test dijalankan.

  ```js
  // globalSetup.js
  const sequelize = require('./config/db');
  require('./models/Admin');
  require('./models/Teacher');
  require('./models/Student');
  require('./models/News');

  module.exports = async () => {
    try {
      await sequelize.sync({ force: true });
      console.log('Global setup: Database telah disinkronisasi.');
    } catch (error) {
      console.error('Global setup error:', error);
      throw error;
    }
  };
  ```

- **globalTeardown.js:**  
  Menutup koneksi database setelah seluruh test selesai.

  ```js
  // globalTeardown.js
  const sequelize = require('./config/db');

  module.exports = async () => {
    try {
      await sequelize.close();
      console.log("Global teardown: Koneksi database telah ditutup.");
    } catch (error) {
      console.error("Global teardown error:", error);
    }
  };
  ```

- **setupTests.js:**  
  Digunakan untuk inisialisasi tambahan (boleh kosong).

  ```js
  // setupTests.js
  // File ini dapat digunakan untuk inisialisasi global testing (misalnya, memuat dotenv atau rozs-definisi custom matchers)
  ```

### Menjalankan Test

Jalankan perintah di terminal:

```sh
npm test
```

Konfigurasi Jest ada di file `jest.config.js`:

```js
// jest.config.js
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  globalSetup: "<rootDir>/globalSetup.js",
  globalTeardown: "<rootDir>/globalTeardown.js",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test-results",
        outputName: "junit.xml"
      }
    ]
  ]
};
```

---

## .gitignore

File `.gitignore` mencakup:
- Folder `node_modules/`
- Direktori build/output seperti `dist/` dan `build/`
- File log dan pid
- File environment (`.env` dan sejenisnya)
- File cache dan file OS-generated

Contoh isi `.gitignore`:

```
# Node modules
node_modules/

# Dependency directories
jspm_packages/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
dist/
build/

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Environment files
.env
.env.*.local

# OS generated files
.DS_Store
Thumbs.db

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache
```

---

## Kontribusi

1. Fork repository ini.
2. Buat branch baru untuk fitur atau perbaikan bug.
3. Lakukan perbaikan dan tambahkan test jika diperlukan.
4. Buat Pull Request agar perubahan dapat direview dan digabungkan.

---

## License

Project ini dilisensikan di bawah [ISC License](https://opensource.org/licenses/ISC).

---

Dokumentasi ini mencakup seluruh aspek penting dari project backend kamu; pastikan untuk memperbarui dokumentasi seiring dengan perubahan atau penambahan fitur baru.