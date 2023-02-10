let arr = [1, 2, 3, 4, 5];
let clone;

clone = arr.slice(0);
arr.pop();
console.log(arr); //[1, 2, 3, 4]
console.log(clone); //[1, 2, 3, 4, 5]