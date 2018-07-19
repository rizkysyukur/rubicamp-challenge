//
// var arr = [
//    {
//       "id": "A1",
//       "string": "Testing Data",
//       "integer": 12,
//       "float": 1.45,
//       "date": "12 Desember 2017",
//       "boolean": true
//    },
//    {
//       "id": "A2",
//       "string": "testing",
//       "integer": "25",
//       "float": "25.5",
//       "date": "07/18/2018",
//       "boolean": "true"
//    },
//    {
//       "id": "A3",
//       "string": "testing",
//       "integer": "25",
//       "float": "25.5",
//       "date": "07/18/2018",
//       "boolean": "true"
//    },
//    {
//       "id": "A4",
//       "string": "testing",
//       "integer": "25",
//       "float": "25.5",
//       "date": "07/18/2018",
//       "boolean": "true"
//    },
//    {
//       "id": "A5",
//       "string": "testing",
//       "integer": "25",
//       "float": "25.5",
//       "date": "07/18/2018",
//       "boolean": "true"
//    }
// ];
//
// console.log(arr[0][key]);

var objects = [
  {
    "foo" : "bar",
    "bar" : "sit"
  },
  {
    "foo" : "lorem",
    "bar" : "ipsum"
  },
  {
    "foo" : "dolor",
    "bar" : "amet"
  }
];

var results = [];

var toSearch = "lo";

for(var i=0; i<objects.length; i++) {
  for(key in objects[i]) {
    if(objects[i][key].indexOf(toSearch)!=-1) {
      console.log(objects[i][key]);
    }
  }
}
