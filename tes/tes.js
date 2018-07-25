INSERT INTO bread (string, integer, float, date, boolean)
VALUES
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true"),
("Testing", 26, 2.2, "Wed Jul 25 2018 00:00:00 GMT+0700 (WIB)", "true");


CREATE TABLE bread(
id INTEGER PRIMARY KEY AUTOINCREMENT,
string text,
integer int,
float float,
date date,
boolean boolean
);

let numbers = [4, 9, 16, 25];

function myFunction(value, index, numbers){
  console.log(`${value}, ${index}, ${numbers}`);
}

numbers.forEach(myFunction);
