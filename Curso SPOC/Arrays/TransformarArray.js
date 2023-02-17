/*El método map es uno de los más útiles y de uso mas frecuente. La sintaxis es:

let result = arr.map(function(item, index, array) {
  // Devuelve el nuevo valor en lugar del valor del elemento
});
El método llama a la función argumento para cada elemento del Array y devuelve el Array de resultados. Por ejemplo, 
el código a continuación transforma cada elemento en su longitud. Como resultado tendremos un nuevo Array con las 
longitudes de cada cadena de caracteres del Array original. */
const nombres = ["Andrea", "Teresa", "Telmo"];
const nombresLength = nombres.map(item => item.length);
console.log(nombresLength);

/*El método sort modifica el Array original, ordenandolo según la función que le hemos pasado como parámetro. Si no 
hay parámetros, el método sort ordena lexicográficamente, es decir, considera cada elemento del Array como si fuera 
una cadena de carácteres. */

let arr = [ 1, 2, 15, 5 ];
// sort reordena el contenido del Array 
arr.sort();
console.log(arr);

/*Porque, como se ha anticipado, los elementos se ordenan, de forma predeterminada, como si fueran cadenas de carácteres. 
Literalmente, todos los elementos se convierten en cadenas de carácteres y luego se comparan. Por lo tanto, se aplica el 
ordenamiento lexicográfico y, de hecho, "2" > "15".
Para usar nuestro propio orden de clasificación, necesitamos proporcionar una función de dos parámetros, como argumento 
del método sort. La función debería funcionar así:

function(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
Es necesario que la función devuelva 0 si los elementos son iguales, un valor positivo (cualquier valor positivo, no tiene 
porque ser 1) si el primer elemento es "mayor" que el segundo, y un valor negativo si el primer elemento es "menor" que el segundo. */

let arr2 = [1, 2, 15, 5];
// sort reordena el contenido del Array 
arr2.sort(function(a, b) {     //arr.sort((a,b) => a-b) tambien funciona
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
});
console.log(arr2);

/*Métodos split y join
He aquí una situación de la vida real. Estamos escribiendo una aplicación Web de mensajería y queremos que una persona pueda ingresar 
una lista de receptores delimitados por comas, como si fuese una única cadeda de caractéres. Por ejemplo: Andrea, Teresa, Telmo.
Para nosotros, como programadores, tener una lista de nombres sería mucho más cómodo que todos los nombres en una única cadena. 
¿Cómo conseguir extraer los nombres de la cadena?
El método split(delim) hace exactamente eso. Divide la cadena en un Array por el valor del parámetro delim. En el siguiente ejemplo, 
dividimos por una coma, seguida de espacio. El resultado que se obtiene es un Array con los tres nombres como elementos. */
let str = "Andrea, Teresa, Telmo";
let names = str.split(", ");
console.log(names);
//El método join hace lo contrario, crea una cadena str de los elementos del Array pegados por el separador proporcionado como parámetro.
let names2 = ["Andrea", "Teresa", "Telmo"];
let str2 = names2.join(", ");
console.log(str2);