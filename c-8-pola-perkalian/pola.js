function pola(str){
  var x = getStrX(str);
  var y = getStrY(str);
  var result = getStrResult(str);
  var comparison;
  var arrMissing = [];
  for (var i = 0; i < 10; i++) {
    comparison = (parseInt(x.replace('#', i)) * parseInt(y)).toString();
    if(checkResult(comparison, result)){
      arrMissing.push(i);
      arrMissing.push(parseInt(comparison.charAt(result.search("#"))));
    }
  }
  return arrMissing;
}

function getStrX(str){
  var i = 0;
  var strX = "";
  while(str.charAt(i) != ' '){
    strX += str.charAt(i);
    i++;
  }
  return strX;
}

function getStrY(str){
  var i = 0;
  var strY = "";
  var find = false;
  while(!find){
    ++i;
    if(str.charAt(i) == ' '){
      i += 3;
      while(str.charAt(i) != ' '){
        strY += str.charAt(i);
        i++;
      }
      find = true;
    }
  }
  return strY;
}

function getStrResult(str){
  var i = 0;
  var result ="";
  var find = false;
  while(!find){
    ++i;
    if(str.charAt(i) == '='){
      i += 2;
      while(i != str.length){
        result += str.charAt(i);
        i++;
      }
      find = true;
    }
  }
  return result;
}

String.prototype.replaceAt = function(index, replacement){
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function checkResult(comparison, result){
  if(result.includes(comparison.replaceAt(result.search("#"), "#"))){
    return true;
  }else {
    return false;
  }
}

console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));
