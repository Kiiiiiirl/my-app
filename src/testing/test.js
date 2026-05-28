/*
var today = new Date();

var month,day,year,firstDay;
year = today.getFullYear();
month = today.getMonth();
day = today.getDate();  
firstDay = new Date(year,month,1);

console.log('today: '+today);
console.log('year: '+year);
console.log('month: '+month);
console.log('day: '+day);
console.log('firstDay: '+firstDay);
*/

/**/
const lines = {
  'ALSO':{
    0:{'diseno':'ELO','medida':215,'cantidad':2}
  },
  'RAM':{
    0:{'diseno':'TA','medida':90,'cantidad':5},
    1:{'diseno':'ELO','medida':85,'cantidad':7}
  },
};


const user = {
  name: "Carlos",
  age: 20,
  country: "Mexico"
};

{Object.entries(lines).map((children) => (
  Object.entries(children[1])['details'].map((child) => (
    console.log('index',children[0],children[1])
  ))
))}

//Object.entries(user).map(([key, value]) => {console.log(key, 'are', value);});

lines['RAM']['cliente'] = 'pukinator';

console.log(lines.RAM);


/* 
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];
console.log(numbers)

console.log(numbers);
console.log(...numbers);

console.log(sum(...numbers));
// Expected output: 6
console.log(sum.apply('eafa', numbers));
// Expected output: 6
*/

