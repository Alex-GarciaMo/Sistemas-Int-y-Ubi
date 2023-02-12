const arr = [1,2];
const anotherArr = [3,4];
const yetAnotherArr = [5,6];
const obj = {
  aProperty: "Hola ",
  anotherProperty: "Mundo!"
  //[Symbol.isConcatSpreadable]= true
}
const arrayLikeObject = {
  0: "Hola ",
  1: "Mundo!",
  length: 2
  
}

console.log(arr.concat(anotherArr));
console.log(arr.concat(anotherArr, yetAnotherArr, 7, 8));
console.log(arr.concat(anotherArr, yetAnotherArr, obj));
console.log(arr.concat(anotherArr, yetAnotherArr, arrayLikeObject));
console.log(arr);  