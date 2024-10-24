'use strict';
// const bookings = [];
// const createBooking = function (
//   flightNum,
//   numPassangers = 1,
//   price = 999 * numPassangers
// ) {
//   const booking = {
//     flightNum,
//     numPassangers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('Lh123', undefined, '1000');

const flight = 'LH123';
const suraj = {
  name: 'Suraj Budhathoki',
  passport: 9843567
}

const checkIn = function (flightNum, passanger) {
  flightNum = 'LH999';
  passanger.name = 'Mr.' + passanger.name;

  //   if (passanger.passport === 9843567) {
  //     alert('Check In');
  //   } else {
  //     alert('Wrong Passport');
  //   }
};

checkIn(flight, suraj);
console.log(flight);
console.log(suraj);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

newPassport(suraj);
console.log(suraj);
checkIn(flight, suraj);

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};
console.log(oneWord('Suraj is Great'));

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher Order Function
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('👋');
};

// document.body.addEventListener('click', high5);

['Suraj', 'Surya', 'Sandhya', 'Susan'].forEach(high5);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Stevan');
greet('Hello')('Suraj');

//chanllenge - converting above into arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Suraj');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Suraj Budhathoki');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

//Doesnot Work
// book(23, 'Sandhya');
book.call(eurowings, 23, 'Sandhaya');
console.log(eurowings);

book.call(lufthansa, 24, 'Marry Cooper');
console.log(lufthansa);

const flightData = [583, 'George Cooper'];
book.apply(eurowings, flightData);
console.log(eurowings);

book.call(eurowings, ...flightData);

//Bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

bookEW(567, 'Surya Panda');

const bookEW23 = book.bind(eurowings, 12334);
bookEW23('Tiny Giant');
bookEW23('Sheldon');

// with Event Listener
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value +value * 0.23;

console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));

console.log('------------ Challenge Question Starts here ------------');
const poll = {
  question: 'What us ayour favourite programming language?',
  options: ['0 : JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  // This will create an array with length 4 and fill will zero
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

// poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

const runOnce = function () {
  console.log('This will never run again1');
};
runOnce();
const isPrivate = 34;
(function () {
  console.log('This will never run again2');
  // const isPrivate = 23;
  console.log(isPrivate);
})();

(() => console.log('This will never run again3'))();

const secureBooking = function () {
  let passangerCount = 0;

  return function () {
    passangerCount++;
    console.log(`${passangerCount} Passangers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);

//Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
h();
f();
console.dir(f);

//Example 2
const boardPassangers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passangers`);
    console.log(`There are 3 groups, each with ${perGroup} passnager`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};
// setTimeout(function () {
//   console.log('Timer');
// }, 10000);
// const perGroup = 1000;
boardPassangers(180, 3);

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
