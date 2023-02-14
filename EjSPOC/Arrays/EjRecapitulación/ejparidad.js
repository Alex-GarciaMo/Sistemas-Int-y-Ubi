//usando un bucle for
var sortArrayByParity = function(arr) {
    var idx = 0;
    for(i = 0; i < arr.length; i++){
      if(arr[i] % 2 === 0 && idx !== i){
        [arr[idx], arr[i]] = [arr[i], arr[idx]];
        idx++;
      }  
    }
    return arr;
};

//Usando el método sort
var sortArrayByParity = function(arr) {
    arr.sort((a,b)=> a%2-b%2);
    return arr;
};