cd function stringManipulation(word){
  if(word.charAt(0).match(/[aeiouAEIOU]/)){
    return word;
  }else{
    var newWord = word.slice(1,word.length).concat(word.charAt(0)).concat('nyo');
    return newWord;
  }
}

function sentenceManipulation(sentence){
  var arraySentence = sentence.split(" ");
  for (var i = 0; i < arraySentence.length; i++) {
    arraySentence[i] = stringManipulation(arraySentence[i]);
  }
  var newSentence = arraySentence.toString().replace(/,/g , " ");
  return newSentence;
}

function readline(){
  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu di sini > '
  });
  rl.prompt();
  rl.on('line', (input) => {
      console.log("hasil konversi: "+sentenceManipulation(`${input}`));
    rl.prompt();
  });
}

readline();
