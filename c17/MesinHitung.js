class MesinHitung{

  constructor(){
    this.x = 1;
    this.Pi = 3.14;
  }

  add(num){
    this.x += num;
    return this;
  }

  kurang(num){
    this.x -= num;
    return this;
  }

  bagi(num){
    this.x = this.x/num;
    return this;
  }

  kali(num){
    this.x *= num;
    return this;
  }

  akar(){
    this.x = Math.sqrt(this.x);
    return this;
  }

  eksponen(num){
    this.x = Math.pow(this.x, num);
    return this;
  }

  kuadrat(num){
    this.x = Math.pow(this.x, 2);
    return this;
  }

  result(){
    console.log(this.x);
    return this;
  }
}

var mh = new MesinHitung();
mh.add(10).kurang(5).result();
mh.add(3).kali(4).bagi(6).result();
mh.x = 7;
console.log(`nilai sekarang : ${mh.x}`);
mh.kali(2).kali(mh.Pi).result();
mh.x = 7;
mh.kuadrat().kali(mh.Pi).result();
mh.x = 4;
mh.eksponen(3).result();
mh.akar().result();
