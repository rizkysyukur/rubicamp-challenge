// mengaktifkan fungsi readline
const readline = require('readline');
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});
// menghubungkan ke database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('university.db');
// mengaktifkan fungsi tabel cli
const Table = require('cli-table');

function loginInterface(){
  console.log("==============================================");
  console.log("Welcome to Universitas Pendidikan Indonesia");
  console.log("Jl. Setiabudhi No. 225");
  console.log("==============================================");
  askUsername();
}

function askUsername(){
  rl.question('Username : ',(username) =>{
    cekUsername(username, function(usernameExist){
      if(usernameExist){
        askPassword(username);
      }else{
        askUsername();
      }
    });
  })
}

function cekUsername(username, cb){
  let sql = `SELECT * FROM account`;
  db.all(sql, [], (err, rows) => {
    if(err){
      cb(false);
    }else{
      cb(rows.filter(function(x){
        return x.username == username;
      }).length > 0);
    }
  });
}

function askPassword(username){
  rl.question('Password : ',(password) =>{
    cekPassword(username, password, function(passwordExist){
      if(passwordExist){
        console.log(`Welcome, ${username}. Your acces level is : ADMIN`);
        menuInterface();
      }else{
        askPassword(username);
      }
    });
  })
}

function cekPassword(username, password, cb){
  let sql = `SELECT * FROM account`;
  db.all(sql, [], (err, rows) => {
    if(err){
      cb(false);
    }else{
      cb(rows.filter(function(x){
        return x.username == username && x.password == password;
      }).length > 0);
    }
  });
}

function menuInterface(){
  console.log("==============================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] Mahasiswa");
  console.log("[2] Jurusan");
  console.log("[3] Dosen");
  console.log("[4] Mata kuliah");
  console.log("[5] Kontrak");
  console.log("[6] Keluar");
  console.log("==============================================");
  askMenu();
}

function askMenu(){
  rl.question('masukan salah satu no, dari opsi diatas : ', (pilih) =>{
    cekMenu(pilih);

  });
}

function cekMenu(no){
  switch (no) {
    case '1':
    mahasiswaInterface();
    break;
    case '2':
    jurusanInterface();
    break;
    case '3':
    dosenInterface();
    break;
    case '4':
    matkulInterface();
    break;
    case '5':
    kontrakInterface();
    break;
    case '6':
    loginInterface();
    break
    default:
    menuInterface();
    break;
  }
}

//============================================================ KELOLA DATA MAHASISWA ==============================================================
//============================================================ KELOLA DATA MAHASISWA ==============================================================

function mahasiswaInterface(){
  console.log("==============================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar murid");
  console.log("[2] Cari murid");
  console.log("[3] Tambah murid");
  console.log("[4] Hapus murid");
  console.log("[5] Kembali");
  console.log("==============================================");
  askMahasiswaMenu();
}

function askMahasiswaMenu(){
  rl.question("masukan salah satu no, dari opsi di atas : ", (pilih) =>{
    cekMahasiswaMenu(pilih);
  });
}

function cekMahasiswaMenu(no){
  switch (no) {
    case '1':
    showMahasiswaList();
    break;
    case '2':
    searchMahasiswa();
    break;
    case '3':
    inputMahasiswa();
    break;
    case '4':
    askNimDelete();
    break;
    case '5':
    menuInterface();
    break;
    default:
    mahasiswaInterface();
    break;
  }
}

function showMahasiswaList(){
  let sql = `SELECT * FROM mahasiswa, jurusan WHERE mahasiswa.kode_jurusan = jurusan.kode_jurusan`;
  db.all(sql, [], (err, rows) => {
    let table = new Table({
      head: ['NIM', 'Nama', 'Alamat', 'Jurusan']
    });
    if(err){
      throw err;
    }
    rows.forEach((row) =>{
      table.push([row.nim, row.nama_mhs, row.alamat, row.nama_jurusan]);
    });
    console.log(table.toString());
    mahasiswaInterface();
  });
}

function searchMahasiswa(){
  console.log("==============================================");
  rl.question('Masukan NIM : ', (nim) =>{
    cekNimMahasiswa(nim);
  });
}

function cekNimMahasiswa(nim){
  let sql = `SELECT * FROM mahasiswa, jurusan WHERE mahasiswa.kode_jurusan = jurusan.kode_jurusan AND nim = ${nim}`;
  db.all(sql, [], (err, rows) => {
    if(err){
      throw err;
    }
    if(rows.length > 0){
      rows.forEach((row) =>{
        console.log("==============================================");
        console.log(`id        : ${row.nim} `);
        console.log(`nama      : ${row.nama_mhs}`);
        console.log(`alamat    : ${row.alamat}`);
        console.log(`jurusan   : ${row.nama_jurusan}`);
      });
      mahasiswaInterface();
    }else{
      console.log(`Mahasiswa dengan nim ${nim} tidak terdaftar`);
      searchMahasiswa();
    }
  });
}

function cekJurusan(nim, nama, jurusan){
  let sql = `SELECT * FROM jurusan WHERE kode_jurusan = '${jurusan}'`;
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    if(rows.length > 0){
      inputAlamatMahsiswa(nim, nama, jurusan);
    }else{
      let sql = `SELECT * FROM jurusan`;
      db.all(sql, [], (err, rows) => {
        console.log(`Kode jurusan ${jurusan} tidak terdaftar! \nSilahkan masukan dengan kode yang terdaftar di bawah ini!`);
        let table = new Table({head: ['Kode Jurusan', 'Jurusan']});
        if(err)throw err;
        rows.forEach((row) =>{table.push([row.kode_jurusan, row.nama_jurusan]);});
        console.log(table.toString());
        inputJurusanMahasiswa(nim, nama);
      });
    }
  });
}

function inputMahasiswa(){
  console.log("==============================================");
  console.log("Lengkapi data di bawah ini:");
  rl.question('NIM : ', (nim) =>{
    inputNamaMahsiswa(nim);
  });
}

function inputNamaMahsiswa(nim){
  rl.question('Nama : ', (nama) =>{
    inputJurusanMahasiswa(nim,nama);
  });
}

function inputJurusanMahasiswa(nim, nama){
  rl.question('Jurusan : ', (jurusan) =>{
    cekJurusan(nim, nama, jurusan);
  });
}

function inputAlamatMahsiswa(nim, nama, jurusan){
  rl.question('Alamat : ', (alamat) =>{
    insertMahasiswa(nim, nama, jurusan, alamat);
  });
}

function insertMahasiswa(nim, nama, jurusan, alamat){
  console.log("==============================================");
  db.run(`INSERT INTO mahasiswa(nim, nama_mhs, alamat, kode_jurusan) VALUES (?,?,?,?)`, [nim,nama,alamat,jurusan], function(err){
    if(err)throw err;
    showMahasiswaList();
  });
}

function askNimDelete(){
  console.log("==============================================");
  rl.question('Masukan NIM mahasiswa yang akan dihapus : ', (nim) =>{
    deleteMahasiswa(nim);
  });
}

function deleteMahasiswa(nim){
  db.run(`DELETE FROM mahasiswa WHERE nim = ?`, nim, function(err){
    if(err)throw err;
    console.log(`Mahasiswa dengan NIM: ${nim} telah dihapus`);
    console.log("==============================================");
    showMahasiswaList();
  });
}

//============================================================ KELOLA DATA JURUSAN ==============================================================
//============================================================ KELOLA DATA JURUSAN ==============================================================

function jurusanInterface(){
  console.log("==============================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar jurusan");
  console.log("[2] Cari jurusan");
  console.log("[3] Tambah jurusan");
  console.log("[4] Hapus jurusan");
  console.log("[5] Kembali");
  console.log("==============================================");
  askJurusanMenu();
}

function askJurusanMenu(){
  rl.question("masukan salah satu no, dari opsi di atas : ", (pilih) =>{
    cekJurusanMenu(pilih);
  });
}

function cekJurusanMenu(no){
  switch (no) {
    case '1':
    showJurusanList();
    break;
    case '2':
    searchJurusan();
    break;
    case '3':
    inputJurusan();
    break;
    case '4':
    askJurusanDelete();
    break;
    case '5':
    menuInterface();
    break;
    default:
    jurusanInterface();
    break;
  }
}

function showJurusanList(){
  let sql = `SELECT * FROM jurusan`;
  db.all(sql, [], (err, rows) => {
    let table = new Table({
      head: ['Kode Jurusan', 'Nama Jurusan']
    });
    if(err){
      throw err;
    }
    rows.forEach((row) =>{
      table.push([row.kode_jurusan, row.nama_jurusan]);
    });
    console.log(table.toString());
    jurusanInterface();
  });
}

function searchJurusan(){
  console.log("==============================================");
  rl.question('Masukan Kode Jurusan : ', (kode) =>{
    cekKodeJurusan(kode);
  });
}

function cekKodeJurusan(kode){
  let sql = `SELECT * FROM jurusan WHERE kode_jurusan = '${kode}'`;
  db.all(sql, [], (err, rows) => {
    if(err){
      throw err;
    }
    if(rows.length > 0){
      rows.forEach((row) =>{
        console.log("==============================================");
        console.log(`Kode        : ${row.kode_jurusan} `);
        console.log(`Jurusan     : ${row.nama_jurusan}`);
      });
      jurusanInterface();
    }else{
      console.log(`Jurusan dengan nim ${kode} tidak terdaftar`);
      searchJurusan();
    }
  });
}

function inputJurusan(){
  console.log("==============================================");
  console.log("Lengkapi data di bawah ini:");
  rl.question('Kode : ', (kode) =>{
    inputNamaJurusan(kode);
  });
}

function inputNamaJurusan(kode){
  rl.question('Nama : ', (nama) =>{
    insertJurusan(kode, nama);
  });
}

function insertJurusan(kode, nama){
  console.log("==============================================");
  db.run(`INSERT INTO jurusan(kode_jurusan, nama_jurusan) VALUES (?,?)`, [kode,nama], function(err){
    if(err)throw err;
    showJurusanList();
  });
}

function askJurusanDelete(){
  console.log("==============================================");
  rl.question('Masukan Kode Jurusan yang akan dihapus : ', (kode) =>{
    deleteJurusan(kode);
  });
}

function deleteJurusan(kode){
  db.run(`DELETE FROM jurusan WHERE kode_jurusan = ?`, kode, function(err){
    if(err)throw err;
    console.log(`Jurusan dengan kode: ${kode} telah dihapus`);
    console.log("==============================================");
    showJurusanList();
  });
}

//============================================================ KELOLA DATA DOSEN ==============================================================
//============================================================ KELOLA DATA DOSEN ==============================================================

function dosenInterface(){
  console.log("==============================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar dosen");
  console.log("[2] Cari dosen");
  console.log("[3] Tambah dosen");
  console.log("[4] Hapus dosen");
  console.log("[5] Kembali");
  console.log("==============================================");
  askDosenMenu();
}

function askDosenMenu(){
  rl.question("masukan salah satu no, dari opsi di atas : ", (pilih) =>{
    cekDosenMenu(pilih);
  });
}

function cekDosenMenu(no){
  switch (no) {
    case '1':
    showDosenList();
    break;
    case '2':
    searchDosen();
    break;
    case '3':
    inputDosen();
    break;
    case '4':
    askDosenDelete();
    break;
    case '5':
    menuInterface();
    break;
    default:
    dosenInterface();
    break;
  }
}

function showDosenList(){
  let sql = `SELECT * FROM dosen`;
  db.all(sql, [], (err, rows) => {
    let table = new Table({
      head: ['Kode Dosen', 'Nama Dosen']
    });
    if(err){
      throw err;
    }
    rows.forEach((row) =>{
      table.push([row.kode_dosen, row.nama_dosen]);
    });
    console.log(table.toString());
    dosenInterface();
  });
}

function searchDosen(){
  console.log("==============================================");
  rl.question('Masukan Kode Dosen : ', (kode) =>{
    cekKodeDosen(kode);
  });
}

function cekKodeDosen(kode){
  let sql = `SELECT * FROM dosen WHERE kode_dosen = '${kode}'`;
  db.all(sql, [], (err, rows) => {
    if(err){
      throw err;
    }
    if(rows.length > 0){
      rows.forEach((row) =>{
        console.log("==============================================");
        console.log(`Kode      : ${row.kode_dosen} `);
        console.log(`Dosen     : ${row.nama_dosen}`);
      });
      dosenInterface();console.log("Pilih mata kuliah");
    }else{
      console.log(`Dosen dengan kode ${kode} tidak terdaftar`);
      searchDosen();
    }
  });
}

function inputDosen(){
  console.log("==============================================");
  console.log("Lengkapi data di bawah ini:");
  rl.question('Kode : ', (kode) =>{
    inputNamaDosen(kode);
  });
}

function inputNamaDosen(kode){
  rl.question('Nama : ', (nama) =>{
    insertDosen(kode, nama);
  });
}

function insertDosen(kode, nama){
  console.log("==============================================");
  db.run(`INSERT INTO dosen(kode_dosen, nama_dosen) VALUES (?,?)`, [kode,nama], function(err){
    if(err)throw err;
    showDosenList();
  });
}

function askDosenDelete(){
  console.log("==============================================");
  rl.question('Masukan Kode Dosen yang akan dihapus : ', (kode) =>{
    deleteDosen(kode);
  });
}

function deleteDosen(kode){
  db.run(`DELETE FROM dosen WHERE kode_dosen = ?`, kode, function(err){
    if(err)throw err;
    console.log(`Dosen dengan kode: ${kode} telah dihapus`);
    console.log("==============================================");
    showDosenList();
  });
}

//============================================================ KELOLA DATA MATA KULIAH ==============================================================
//============================================================ KELOLA DATA MATA KULIAH ==============================================================

function matkulInterface(){
  console.log("==============================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar matkul");
  console.log("[2] Cari matkul");
  console.log("[3] Tambah matkul");
  console.log("[4] Hapus matkul");
  console.log("[5] Kembali");
  console.log("==============================================");
  askMatkulMenu();
}

function askMatkulMenu(){
  rl.question("masukan salah satu no, dari opsi di atas : ", (pilih) =>{
    cekMatkulMenu(pilih);
  });
}

function cekMatkulMenu(no){
  switch (no) {
    case '1':
    showMatkulList();
    break;
    case '2':
    searchMatkul();
    break;
    case '3':
    inputMatkul();
    break;
    case '4':
    askMatkulDelete();
    break;
    case '5':
    menuInterface();
    break;
    default:
    matkulInterface();
    break;
  }
}

function showMatkulList(){
  let sql = `SELECT * FROM mata_kuliah`;
  db.all(sql, [], (err, rows) => {
    let table = new Table({
      head: ['Kode Mata Kuliah', 'Nama Mata Kuliah', 'SKS']
    });
    if(err){
      throw err;
    }
    rows.forEach((row) =>{
      table.push([row.kode_mk, row.nama_mk, row.sks]);
    });
    console.log(table.toString());
    matkulInterface();
  });
}

function searchMatkul(){
  console.log("==============================================");
  rl.question('Masukan Kode Mata Kuliah : ', (kode) =>{
    cekKodeMatkul(kode);
  });
}

function cekKodeMatkul(kode){
  let sql = `SELECT * FROM mata_kuliah WHERE kode_mk = '${kode}'`;
  db.all(sql, [], (err, rows) => {
    if(err){
      throw err;
    }
    if(rows.length > 0){
      rows.forEach((row) =>{
        console.log("==============================================");
        console.log(`Kode        : ${row.kode_mk} `);
        console.log(`Mata kuliah : ${row.nama_mk}`);
      });
      matkulInterface();
    }else{
      console.log(`Mata kuliah dengan kode ${kode} tidak terdaftar`);
      searchMatkul();
    }
  });
}

function inputMatkul(){
  console.log("==============================================");
  console.log("Lengkapi data di bawah ini:");
  rl.question('Kode mata kuliah: ', (kode) =>{
    inputNamaMatkul(kode);
  });
}

function inputNamaMatkul(kode){
  rl.question('Nama mata kuliah: ', (nama) =>{
    inputSksMatkul(kode, nama);
  });
}

function inputSksMatkul(kode, nama){
  rl.question('Jumlah sks: ', (sks) =>{
    insertMatkul(kode, nama, sks);
  });
}

function insertMatkul(kode, nama, sks){
  console.log("==============================================");
  db.run(`INSERT INTO mata_kuliah(kode_mk, nama_mk, sks) VALUES (?,?,?)`, [kode,nama,sks], function(err){
    if(err)throw err;
    showMatkulList();
  });
}

function askMatkulDelete(){
  console.log("==============================================");
  rl.question('Masukan Kode Mata Kuliah yang akan dihapus : ', (kode) =>{
    deleteMatkul(kode);
  });
}

function deleteMatkul(kode){
  db.run(`DELETE FROM mata_kuliah WHERE kode_mk = ?`, kode, function(err){
    if(err)throw err;
    console.log(`Matkul dengan kode: ${kode} telah dihapus`);
    console.log("==============================================");
    showMatkulList();
  });
}

//============================================================ KELOLA DATA KONTRAK ==============================================================
//============================================================ KELOLA DATA KONTRAK ==============================================================

function kontrakInterface(){
  console.log("==============================================");
  console.log("silahkan pilih opsi di bawah ini");
  console.log("[1] Daftar kontrak");
  console.log("[2] Cari kontrak");
  console.log("[3] Tambah kontrak");
  console.log("[4] Hapus kontrak");
  console.log("[5] Kembali");
  console.log("==============================================");
  askKontrakMenu();
}

function askKontrakMenu(){
  rl.question("masukan salah satu no, dari opsi di atas : ", (pilih) =>{
    cekKontrakMenu(pilih);
  });
}

function cekKontrakMenu(no){
  switch (no) {
    case '1':
    showKontrakList();
    break;
    case '2':
    searchKontrak();
    break;
    case '3':
    inputKontrak();
    break;
    case '4':
    askKontrakDelete();
    break;
    case '5':
    menuInterface();
    break;
    default:
    kontrakInterface();
    break;
  }
}

function showKontrakList(){
  let sql = `SELECT * FROM kontrak`;
  db.all(sql, [], (err, rows) => {
    let table = new Table({
      head: ['NIM', 'Kode Mata Kuliah', 'Kode Dosen', 'Nilai']
    });
    if(err){
      throw err;
    }
    rows.forEach((row) =>{
      table.push([row.nim, row.kode_mk, row.kode_dosen, row.nilai]);
    });
    console.log(table.toString());
    kontrakInterface();
  });
}

function searchKontrak(){
  console.log("==============================================");
  rl.question('Masukan NIM : ', (nim) =>{
    cekNimKontrak(nim);
  });
}

function cekNimKontrak(nim){
  let sql = `SELECT * FROM kontrak WHERE nim = ${nim}`;
  db.all(sql, [], (err, rows) => {
    if(err){
      throw err;
    }
    if(rows.length > 0){
      rows.forEach((row) =>{
        console.log("==============================================");
        console.log(`NIM              : ${row.nim} `);
        console.log(`Kode Mata Kuliah : ${row.kode_mk}`);
        console.log(`Kode Dosen       : ${row.kode_dosen}`);
        console.log(`Nilai            : ${row.nilai}`);
      });
      kontrakInterface();
    }else{
      console.log(`Kontrak dengan nim ${nim} tidak terdaftar`);
      searchKontrak();
    }
  });
}

function inputKontrak(){
  console.log("==============================================");
  console.log("Lengkapi data di bawah ini:");
  rl.question('NIM Mahasiswa: ', (nim) =>{
    cekNim(nim);
  });
}

function cekNim(nim){
  let sql = `SELECT * FROM mahasiswa WHERE nim = '${nim}'`;
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    if(rows.length > 0){
      inputKodeMkKontrak(nim);
    }else{
      let sql = `SELECT * FROM mahasiswa`;
      db.all(sql, [], (err, rows) => {
        console.log(`Nim dengan no ${nim} tidak terdaftar! \nSilahkan masukan dengan nim yang terdaftar di bawah ini!`);
        let table = new Table({head: ['Nim', 'Nama Mahasiswa']});
        if(err)throw err;
        rows.forEach((row) =>{table.push([row.nim, row.nama_mhs]);});
        console.log(table.toString());
        inputKontrak();
      });
    }
  });
}


function inputKodeMkKontrak(nim){
  rl.question('Kode Mata Kuliah : ', (kode) =>{
    cekKodeMkKontrak(nim,kode);
  });
}

function cekKodeMkKontrak(nim,kodeMatkul){
  let sql = `SELECT * FROM mata_kuliah WHERE kode_mk = '${kodeMatkul}'`;
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    if(rows.length > 0){
      inputKodeDosenKotrak(nim,kodeMatkul);
    }else{
      let sql = `SELECT * FROM mata_kuliah`;
      db.all(sql, [], (err, rows) => {
        console.log(`Kode mata kuliah dengan no ${kodeMatkul} tidak terdaftar! \nSilahkan masukan dengan nim yang terdaftar di bawah ini!`);
        let table = new Table({head: ['Kode Mata Kuliah', 'Nama Mata Kuliah']});
        if(err)throw err;
        rows.forEach((row) =>{table.push([row.kode_mk, row.nama_mk]);});
        console.log(table.toString());
        inputKodeMkKontrak(nim)
      });
    }
  });
}

function inputKodeDosenKotrak(nim, kodeMatkul){
  rl.question('Kode Dosen : ', (kode) =>{
    cekKodeDosenKontrak(nim, kodeMatkul, kode);
  });
}

function cekKodeDosenKontrak(nim,kodeMatkul,kodeDosen){
  let sql = `SELECT * FROM dosen WHERE kode_dosen = '${kodeDosen}'`;
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    if(rows.length > 0){
      inputNilai(nim,kodeMatkul,kodeDosen);
    }else{
      let sql = `SELECT * FROM dosen`;
      db.all(sql, [], (err, rows) => {
        console.log(`Kode dosen dengan no ${kodeDosen} tidak terdaftar! \nSilahkan masukan dengan nim yang terdaftar di bawah ini!`);
        let table = new Table({head: ['Kode Dosen', 'Nama Dosen']});
        if(err)throw err;
        rows.forEach((row) =>{table.push([row.kode_dosen, row.nama_dosen]);});
        console.log(table.toString());
        inputKodeDosenKotrak(nim, kodeMatkul);
      });
    }
  });
}

function inputNilai(nim, kodeMatkul, kodeDosen){
  rl.question('Nilai : ', (nilai) =>{
    insertKontrak(nim, kodeMatkul, kodeDosen, nilai);
  });
}


function insertKontrak(nim, kodeMatkul, kodeDosen, nilai){
  console.log("==============================================");
  db.run(`INSERT INTO kontrak(nim, kode_mk, kode_dosen, nilai) VALUES (?,?,?,?)`, [nim,kodeMatkul,kodeDosen,nilai], function(err){
    if(err)throw err;
    showKontrakList();
  });
}

function askKontrakDelete(){
  console.log("==============================================");
  rl.question('Masukan NIM kontrak yang akan dihapus : ', (nim) =>{
    deleteKontrak(nim);
  });
}

function deleteKontrak(nim){
  db.run(`DELETE FROM kontrak WHERE nim = ?`, nim, function(err){
    if(err)throw err;
    console.log(`Mahasiswa dengan NIM: ${nim} telah dihapus`);
    console.log("==============================================");
    showKontrakList();
  });
}


loginInterface();
