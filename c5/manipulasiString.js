function stringManipulation(word){
  if(word.charAt(0).match(/[aeiouAEIOU]/)){
    console.log(word);
  }else{
    var newWord = word.slice(1,word.length).concat(word.charAt(0)).concat('nyo');
    console.log(newWord);
  }
}

stringManipulation('ayam');
stringManipulation('bebek');
