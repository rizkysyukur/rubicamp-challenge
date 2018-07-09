function getJson(file){
  const fs = require('fs');
  let rawdata = fs.readFileSync(file);
  let data = JSON.parse(rawdata);
  return data;
}

function tebakKata(json){
  var data = getJson(json);
  var readline = require('readline');
  var wrong = 1;
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan:'
  });

  console.log(`Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini ${json}.`);
  console.log("Untuk bermain, jawablah dengan jawaban yang sesuai.");
  console.log("Gunakan skip 'skip' untuk menangguhkan pertanyaanya, dan di akhir pertanyaan akan ditanyakan lagi.\n");
  console.log(`Pertayaan: ${data[0].definition}`);
  rl.prompt();

  rl.on('line', (input) =>{
    if(data[0].term == `${input}`){
      console.log("Anda Beruntung!");
      data.shift();
      if(0 < data.length){
        console.log(`\nPertayaan: ${data[0].definition}`);
        rl.prompt();
      }else{
        console.log("\nHore Anda Berhasil!");
        rl.close();
      }
      wrong = 1;
    }else if(`${input}` == "skip"){
      let temp = data[0];
      data.shift();
      data.push(temp);
      console.log(`\nPertayaan: ${data[0].definition}`);
      rl.prompt();
    }else{
        console.log("\nAnda kurang beruntung! anda telah salah "+wrong+" kali, silahkan coba lagi.\n");
        wrong++;
        rl.prompt();
    }
  });


functAion solution(){
  let json = null;
  process.argv.forEach((val, index) => {
    json = val;
  });
  if(json.slice(json.length-5, json.length) == ".json"){
      tebakKata(json);
  }else{
    console.log("Tolong sertakan nama file dengan inputan soalnya");
    process.exit(0);
  }
}

solution();
