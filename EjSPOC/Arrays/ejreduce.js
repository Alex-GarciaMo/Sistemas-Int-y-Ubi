const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];

let tally = fruitBasket.reduce(function(acc, item){
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});

console.log(tally);