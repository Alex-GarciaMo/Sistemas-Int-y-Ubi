let arr = [3, 1, 3, 2, 5, 4, 4, 4];
let noRepeating = arr.filter(function(item1, index1, arr){
  var f = arr.find(function(item2, index2){
    return item1 === item2 && index1 !== index2;
  });

  return typeof f === "undefined" ? true : false;
});

console.log(noRepeating);