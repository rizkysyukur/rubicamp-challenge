function spiral(param1){
  var arrValue = createArray(param1);
  var arrSpiral = [];
  return "["+getSpiralValue(arrValue, arrSpiral, param1, 0).join(',')+"]";
}

function createArray(param1){
  var arr = [];
  var value = 0;
  for (var i = 0; i < param1; i++) {
    arr[i] = [];
    for (var j = 0; j < param1; j++) {
      arr[i].push(value++);
    }
  }
  return arr;
}

function getSpiralValue(arrValue, arrSpiral, length, index){
  if(length != 0){
    for (var i = index; i < length; i++) {
      arrSpiral.push(arrValue[index][i]);
    }
    for (var i = index+1; i < length; i++) {
      arrSpiral.push(arrValue[i][length-1]);
    }
    for (var i = length-2; i >= index; i--) {
      arrSpiral.push(arrValue[length-1][i]);
    }
    for (var i = length-2; i > index; i--) {
      arrSpiral.push(arrValue[i][index]);
    }
    return getSpiralValue(arrValue, arrSpiral, length-1, index+1);
  }else{
      return arrSpiral;
  }
}

console.log(spiral(5));
console.log(spiral(6));
console.log(spiral(7));
