function deretKasku(n){
  var arr = [];
  var kelTiga = 3;
  for (var i = 0; i < n; i++) {
    if(kelTiga % 6 == 0 && kelTiga % 5 == 0){
      arr[i] = 'KASKUS';
    }else if (kelTiga % 6 == 0) {
      arr[i] = 'KUS';
    }else if (kelTiga % 5 == 0) {
      arr[i] = 'KAS';
    }else{
      arr[i] = kelTiga;
    }
    kelTiga = kelTiga + 3;
  }
  return arr;
}
console.log(deretKasku(10));
