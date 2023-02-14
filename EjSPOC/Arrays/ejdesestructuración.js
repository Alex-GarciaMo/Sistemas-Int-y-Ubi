const arr = [1, 2, 3, 4, 5];
const [a, b] = arr;
console.log(a); // 1
console.log(b); // 2

let [c=0, d=10] = [1];
console.log(c); // 1
console.log(d); // 10

let [e, ...rest] = arr;
console.log(rest);
