function cekPrima(n){
  var max = Math.sqrt(n);
  for (var i = 2; i <= max; i++) {
    if(n % i == 0)
    return false;
  }
  return true;
}

function indexPrima(param1){
  var prim = [];
  var number = 3;
  if(param1 > 1) prim.push(1);
  while(prim.length != param1){
    if(cekPrima(number)){
      prim.push(number);
    }
    number++;
  }
  return prim[prim.length - 1];
}

console.log(indexPrima(4));
console.log(indexPrima(500));
console.log(indexPrima(37786));
