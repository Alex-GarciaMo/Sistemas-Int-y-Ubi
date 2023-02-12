let arr = [1, 2, 15, 5];
// sort reordena el contenido del Array 
arr.sort(function(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
});
console.log(arr);