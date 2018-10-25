CREATE TABLE jurusan(
kode_jurusan varchar(10),
nama_jurusan varchar(20),
PRIMARY KEY (kode_jurusan)
);

CREATE TABLE mahasiswa(
nim varchar(10),
nama_mhs varchar(30),
alamat varchar(50),
kode_jurusan varchar(10),
umur int,
PRIMARY KEY(nim),
FOREIGN KEY (kode_jurusan) REFERENCES jurusan(kode_jurusan)
);

CREATE TABLE mata_kuliah(
nama_mk VARCHAR(30),
kode_mk VARCHAR(10),
sks int,
PRIMARY KEY (kode_mk)
);

CREATE TABLE dosen(
kode_dosen VARCHAR(10),
nama_dosen VARCHAR(30),
PRIMARY KEY(kode_dosen)
);

CREATE TABLE kontrak(
nim varchar(10),
kode_mk varchar(20),
kode_dosen varchar(10),
nilai varchar(1),
PRIMARY KEY (nim, kode_mk, kode_dosen),
FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
FOREIGN KEY (kode_mk) REFERENCES mata_kuliah(kode_mk),
FOREIGN KEY (kode_dosen) REFERENCES dosen(kode_dosen)
);

INSERT INTO jurusan (kode_jurusan, nama_jurusan)
VALUES
('T001', 'teknik informatika'),
('T002', 'teknik pangan'),
('T003', 'teknik industri'),
('T004', 'teknik mesin'),
('T005', 'teknik sipil');

INSERT INTO mahasiswa (nim,nama_mhs, alamat, kode_jurusan, umur)
VALUES
('123010146', 'saeful', 'bogor', 'T001', 20),
('123010127', 'heru', 'majalengka', 'T001', 19),
('123010126', 'haris', 'majalengka', 'T001', 20),
('123010112', 'agung', 'subang', 'T001', 19),
('123010150', 'asep', 'bandung', 'T001', 19),
('123020140', 'kania', 'jakarta', 'T002', 20),
('123030001', 'yudis', 'tangerang', 'T003', 22),
('123040201', 'angri', 'jakarta', 'T004', 20),
('123040099', 'akbar', 'jakarta', 'T005', 20);

INSERT INTO dosen (kode_dosen, nama_dosen)
VALUES
('D001', 'sandhika galih. ST., MT'),
('D002', 'feri saferi.ST., MT'),
('D003', 'fajar darmawan.ST., MT'),
('D004', 'ade sukendar.ST., MT'),
('D005', 'hendra.ST., MT'),
('D006', 'sali alas majapahit.ST., MT'),
('D007', 'caca supriana.ST., MT'),
('D008', 'nanda gusdya.ST., MT'),
('D009', 'Dr. ayi purbasari.ST., MT'),
('D010', 'Dr. leony.ST., MT');

INSERT INTO mata_kuliah (kode_mk, nama_mk, sks)
VALUES
('M001', 'algoritma pemrograman', 4),
('M002', 'pemrograman basis data', 3),
('M003', 'pemrograman web', 3),
('M004', 'rekayasa perangkat lunak', 3),
('M005', 'matematika logika', 3),
('M006', 'sistem multimedia', 3),
('M007', 'sistem informasi', 3),
('M008', 'E-Bussines', 3),
('M009', 'optimasi basis data', 3),
('M010', 'rekayasa web', 3),
('M011', 'data mining', 3);

INSERT INTO kontrak (nim, kode_mk, kode_dosen, nilai)
VALUES
('123010146', 'M001', 'D004', 'A'),
('123010146', 'M002', 'D007', 'A'),
('123010146', 'M003', 'D001', 'C'),
('123010146', 'M004', 'D009', 'B'),
('123010146', 'M005', 'D010', 'D'),
('123010127', 'M001', 'D004', 'A'),
('123010127', 'M002', 'D007', 'B'),
('123010127', 'M003', 'D001', 'D'),
('123010127', 'M004', 'D009', 'C'),
('123010127', 'M005', 'D010', 'E'),
('123010126', 'M006', 'D003', 'C'),
('123010126', 'M007', 'D006', 'B'),
('123010126', 'M008', 'D003', 'A'),
('123010126', 'M009', 'D005', 'C'),
('123010126', 'M010', 'D008', 'B'),
('123010122', 'M008', 'D003', 'C'),
('123010122', 'M009', 'D005', 'B'),
('123010122', 'M010', 'D008', 'B'),
('123010150', 'M003', 'D001', 'C'),
('123010150', 'M004', 'D009', 'C'),
('123010150', 'M005', 'D010', 'D'),
('123010146', 'M011', 'D007', 'A'),
('123010127', 'M011', 'D007', 'A'),
('123010126', 'M011', 'D007', 'C');
