function tebakKata(){
  var data = getJson('data.json');
  var readline = require('readline');
  var i = 0;
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan:'
  });
  console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n");
  console.log("Pertayaan: "+ data[i].definition);
  rl.prompt();
  rl.on('line', (input) =>{
    if(data[i].term == `${input}`){
      console.log("Selamat Anda Benar!");
      i++;
      if(i < data.length){
        console.log("\nPertayaan: "+ data[i].definition);
        rl.prompt();
      }else{
        console.log("\nHore Anda Menang!");
        rl.close();
      }
    }else{
        console.log("wkwkwkwk, Anda kurang beruntung!\n");
        rl.prompt();
    }
  });
}

function getJson(file){
  const fs = require('fs');
  let rawdata = fs.readFileSync(file);
  let data = JSON.parse(rawdata);
  return data;
}

tebakKata();
