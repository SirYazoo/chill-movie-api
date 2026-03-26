## Cara Menjalankan Project

1. Clone repository ini.
2. Jalankan perintah `npm install` untuk menginstal semua dependensi.
3. Copy file `.env.example` dan ubah namanya menjadi `.env`.
4. Isi konfigurasi database di dalam file `.env` sesuai dengan MySQL lokal Anda.
5. Buat database bernama `chill_movie` dan jalankan perintah SQL berikut untuk membuat tabel:
   ```sql
   CREATE TABLE SERIES_FILM (
       id INT AUTO_INCREMENT PRIMARY KEY,
       judul VARCHAR(255) NOT NULL,
       sinopsis TEXT,
       rating_usia VARCHAR(10),
       type VARCHAR(50) NOT NULL,
       is_premium BOOLEAN DEFAULT FALSE
   );
   ```
6. Jalankan server dengan perintah `npm run dev`.
