-- No 1
SELECT nim, nama_mhs, alamat, umur, nama_jurusan
FROM mahasiswa, jurusan
WHERE jurusan.kode_jurusan = mahasiswa.kode_jurusan;

-- No 2
SELECT *
FROM mahasiswa
WHERE umur < 20;

-- No 3
SELECT nama_mhs, nilai
FROM mahasiswa, kontrak
WHERE mahasiswa.nim = kontrak.nim AND (nilai = 'A' OR nilai = 'B');

-- No 4
SELECT nama_mhs, SUM(sks)
FROM mahasiswa, kontrak, mata_kuliah
WHERE mahasiswa.nim = kontrak.nim
AND kontrak.kode_mk = mata_kuliah.kode_mk
GROUP BY nama_mhs
HAVING 10 < SUM(sks);

-- No 5
SELECT nama_mhs, nama_mk
FROM mahasiswa, kontrak, mata_kuliah
WHERE mahasiswa.nim = kontrak.nim
AND kontrak.kode_mk = mata_kuliah.kode_mk
AND nama_mk = 'data mining';

-- No 6
SELECT nama_dosen, COUNT(nama_mhs)
FROM dosen, kontrak, mahasiswa
WHERE dosen.kode_dosen = kontrak.kode_dosen
AND mahasiswa.nim = kontrak.nim
GROUP BY nama_dosen;

-- No 7
SELECT nama_mhs, umur
FROM mahasiswa
ORDER BY umur;

-- No 8
-- Use Where
SELECT nama_mk, nama_mhs, nama_jurusan, nama_dosen, nilai
FROM mahasiswa, mata_kuliah, dosen, kontrak, jurusan
WHERE mahasiswa.nim = kontrak.nim
AND mahasiswa.kode_jurusan = jurusan.kode_jurusan
AND dosen.kode_dosen = kontrak.kode_dosen
AND mata_kuliah.kode_mk = kontrak.kode_mk
AND (nilai = 'D' OR nilai = 'E');

-- Use Join
SELECT nama_mk, nama_mhs, nama_jurusan, nama_dosen, nilai
FROM ((((mahasiswa
INNER JOIN jurusan ON mahasiswa.kode_jurusan = jurusan.kode_jurusan)
INNER JOIN kontrak ON mahasiswa.nim = kontrak.nim)
INNER JOIN dosen ON dosen.kode_dosen = kontrak.kode_dosen)
INNER JOIN mata_kuliah ON mata_kuliah.kode_mk = kontrak.kode_mk
AND (nilai = 'D' OR nilai = 'E'));
