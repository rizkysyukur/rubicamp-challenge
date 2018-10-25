function sum(){
  var i;
  var x = 0;
  for(i = 0; i < arguments.length; i++) {
          x = x + arguments[i];
      }
  return x;
}
console.log(sum(1,2,7));
