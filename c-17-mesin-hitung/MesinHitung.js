

export default class MesinHitung{

  constructor(){
    this.x = 1;
    this.Pi = 3.14;
  }

  // menambahkan nilai pada nilai x
  add(num){
    this.x += num;
    return this;
  }

  // mengurang nilai x
  kurang(num){
    this.x -= num;
    return this;
  }

  // membagi nilai x
  bagi(num){
    this.x = this.x/num;
    return this;
  }

  // mengkalikan nilai x
  kali(num){
    this.x *= num;
    return this;
  }

  // mengehasilkan nilai akar dari x
  akar(){
    this.x = Math.sqrt(this.x);
    return this;
  }

  // menghasilkan nilai pangkat sebanyak n dari x
  eksponen(num){
    this.x = Math.pow(this.x, num);
    return this;
  }

  // menghasilkan nilai kuadrat dari x
  kuadrat(num){
    this.x = Math.pow(this.x, 2);
    return this;
  }

  // menampilkan nilai x
  result(){
    console.log(this.x);
    return this;
  }
}
