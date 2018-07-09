const writeFile = (content) => {
  const fs = require('fs');
  fs.writeFileSync("list.json", JSON.stringify(content, null, 3), 'utf8');
}

const readFile = () =>{
  const fs = require('fs');
  var rawdata = fs.readFileSync('list.json', 'utf8');
  return JSON.parse(rawdata);
}

const getContent = (arr) => {
  arr.splice(0, 3);
  return arr.join(" ");;
}

const todo = () => {

  var arr = [];
  var task = "";

  process.argv.forEach((val, index) => {
    arr.push(val);
  });

  var task = "";

  if(arr.length > 3)arr[2].slice(0,6) == "filter" ? task = "filter" : task = arr[2];

  switch(task){

    case "list":
        var data = readFile();
        for (var i = 0; i < data.length; i++) {
          console.log(`${i+1}. ${data[i].cecklist ? '[x]' : '[ ]'} ${data[i].action}`);
        }
        break;

    case "task":
        var index = arr[3].charAt(0)-1;
        var data = readFile();
        console.log(`${index+1}. ${data[index].cecklist ? '[x]' : '[ ]'} ${data[index].action}`);
        break;

    case "add":
        var content = getContent(arr);
        var input = readFile();
        var value = {cecklist: false, action : content, tag : []};
        input.push(value);
        writeFile(input);
        console.log(`"${content}" telah ditambahkan`);
        break;

    case "delete":
        var index = arr[3].charAt(0)-1;
        var data = readFile();
        if(data.length>0){
          var str = data[index].action;
          data.splice(index, 1);
          writeFile(data);
          console.log(`"${str}" telah dihapus dari daftar.`);
        }else{
          console.log("tidak ada list yang dapat dihapus.");
        }
        break;

    case "complete":
        var index = arr[3].charAt(0)-1;
        var data = readFile();
        data[index]["cecklist"] = true;
        writeFile(data);
        console.log(`"${data[index].action}" sudah selesai.`);
        break;

    case "uncomplete":
        var index = arr[3].charAt(0)-1;
        var data = readFile();
        data[index]["cecklist"] = false;
        writeFile(data);
        console.log(`"${data[index].action}" status selesai dibatalkan.`);
        break;

    case "list:outstanding":
        var data = readFile();
        if(arr[3] == "asc"){
          for (var i = 0; i < data.length; i++) {
            if(!data[i].cecklist)
            console.log(`${i+1}. ${data[i].cecklist ? '[x]' : '[ ]'} ${data[i].action}`);
          }
        }else if(arr[3] == "desc"){
          for (var i = data.length-1; i > -1; i--) {
            if(!data[i].cecklist)
            console.log(`${i+1}. ${data[i].cecklist ? '[x]' : '[ ]'} ${data[i].action}`);
          }
        }else{
          console.log("Sertakan jenis pengurutannya dengan menuliskan (asc|desc)");
        }
        break;

    case "list:completed":
        var data = readFile();
        if(arr[3] == "asc"){
          for (var i = 0; i < data.length; i++) {
            if(data[i].cecklist)
            console.log(`${i+1}. ${data[i].cecklist ? '[x]' : '[ ]'} ${data[i].action}`);
          }
        }else if(arr[3] == "desc"){
          for (var i = data.length-1; i > -1; i--) {
            if(data[i].cecklist)
            console.log(`${i+1}. ${data[i].cecklist ? '[x]' : '[ ]'} ${data[i].action}`);
          }
        }else{
          console.log("Sertakan jenis pengurutannya dengan menuliskan (asc|desc)");
        }
        break;

    case "tag":
        var index = arr[3].charAt(0)-1;
        arr.splice(0,4);
        var data = readFile();
        var input = [];
        for (var i = 0; i < arr.length; i++) {
          if(!data[index]["tag"].includes(arr[i])){
            data[index]["tag"].push(arr[i]);
            input.push(arr[i]);
          }
        }
        writeFile(data);
        if(input.length == 0){
          console.log("Tidak ada tag yang dapat terinput");
        }else{
          console.log(`'${input.join()}' telah ditambahkan ke dalam '${data[index].action}'.`);
        }
        break;

    case "filter":
    var tag = arr[2].slice(7);
        var data = readFile ();
        for (var i = 0; i < data.length; i++) {
          if(data[i].tag.includes(tag))
            console.log(`${i+1}. ${data[i].cecklist ? '[x]' : '[ ]'} ${data[i].action}`);
        }
        break;

    default:
        console.log(">>>  JS TODO <<<");
        console.log("$ node todo.js <command>");
        console.log("$ node todo.js list");
        console.log("$ node todo.js task <task_id>");
        console.log("$ node todo.js add <task_content>");
        console.log("$ node todo.js delete <task_id>");
        console.log("$ node todo.js complete <task_id>");
        console.log("$ node todo.js uncomplete <task_id>");
        console.log("$ node todo.js list:outstanding asc|desc");
        console.log("$ node todo.js list:completed asc|desc");
        console.log("$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>");
        console.log("$ node todo.js filter:<tag_name>");
        break;
  }
}

todo();
