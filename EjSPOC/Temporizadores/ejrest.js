function sumAll(...numbers) {
    let sum = 0;
    for (let n of numbers) {
      sum += n;
    }
    return sum;
  }
  
  console.log(sumAll(1)); // 1
  console.log(sumAll(1, 2)); // 3
  console.log(sumAll(1, 2, 3)); // 6