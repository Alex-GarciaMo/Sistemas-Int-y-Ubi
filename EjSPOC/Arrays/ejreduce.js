let numbers = [1, 10, 25, 2, 38];
let result = sumArray(numbers);
console.log(result);
  
function sumArray(arr){
  let sum = (a,b) => a+b;
  return arr.reduce(sum, 0);
}  