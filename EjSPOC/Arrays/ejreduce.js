const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];

let tally = fruitBasket.reduce(function(acc, item){
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});

console.log(tally);


let numbers = [1, 10, 25, 2, 38];
let result = sumArray(numbers);
console.log(result);
  
function sumArray(arr){
  let sum = (a,b) => a+b;
  return arr.reduce(sum, 0);
}  