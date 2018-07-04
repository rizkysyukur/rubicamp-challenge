function getJson(file){
  const fs = require('fs');
  let rawdata = fs.readFileSync(file);
  let data = JSON.parse(rawdata);
  return data;
}

function solution(json){
  console.log("Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini "+json+".");
  console.log("Untuk bermain, jawablah dengan jawaban yang sesuai.");
  console.log("Gunakan skip 'skip' untuk menangguhkan pertanyaanya, dan di akhir pertanyaan akan ditanyakan lagi.\n");
  var data = getJson(json);
  var readline = require('readline');
  var i = 0;
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban: '
  });
  console.log("Pertanyaan: "+ data[i].definition);
  rl.prompt();
  rl.on('line', (input) =>{
    if(i < data.length){
      if(data[i].term == `${input}`){
        console.log("\nAnda Beruntung!\n");
        i++;
        if(i < data.length)
          console.log("Pertanyaan: "+ data[i].definition);
      }else{
        console.log("\nAnda Kurang Beruntung! anda telah salah 1 kali, silahkan coba lagi.");
      }
      rl.prompt();
    }else{
      rl.close();
      console.log("\nAnda Berhasil!");
    }
  })
}

solution('science.json');
