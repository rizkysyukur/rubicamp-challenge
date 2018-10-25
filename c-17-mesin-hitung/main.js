import MesinHitung from './MesinHitung';

var mh = new MesinHitung();
mh.add(10).kurang(5).result(); // 1 + 10 - 5 = 6
mh.add(3).kali(4).bagi(6).result(); // ((6 + 3) x 4) : 6 = 6
mh.x = 7;
console.log(`nilai sekarang : ${mh.x}`); // nilai sekarang : 7
mh.kali(2).kali(mh.Pi).result(); // 7 x 2 x Pi = 44
mh.x = 7;
mh.kuadrat().kali(mh.Pi).result(); // 7 kuadrat x Pi = 155
mh.x = 4;
mh.eksponen(3).result(); // 4 x 4 x 4 = 64
mh.akar().result(); // akar 64 = 8
