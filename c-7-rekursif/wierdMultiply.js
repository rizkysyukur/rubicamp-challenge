function wierdMultiply(number){
  var result = 1;
  var strNumber = number.toString();
  if(strNumber.length == 1){
    result = parseInt(strNumber);
    return result;
  }else{
    for (var i = 0; i < strNumber.length; i++) {
      result *= parseInt(strNumber.charAt(i));
    }
    return wierdMultiply(result);
  }
}

console.log(wierdMultiply(39));
console.log(wierdMultiply(999));
console.log(wierdMultiply(3));
