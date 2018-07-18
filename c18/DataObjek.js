export class Dosen{
  constructor(){
    this.kodeDosen = "";
    this.namaDosen = "";
  }
}

export class Jurusan{
  constructor(){
    this.kodeJurusan = "";
    this.namaJurusan = "";
  }
}

export class Kontrak{
  constructor(){
    this.mahasiswa = new mahasiswa();
    this.dosen = new dosen();
    this.mataKuliah = new mataKuliah();
  }
}

export class Mahasiswa{
  constructor(){
    this.nim = "";
    this.alamat = "";
    this.namaMhs = "";
    this.umur = 0;
    this.jurusan = new jurusan();
  }
}

export class MataKuliah{
  constructor(){
    this.kodeMk = "";
    this.namaMk = "";
    this.sks = 0;
  }
}
