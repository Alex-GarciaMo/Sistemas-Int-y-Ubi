/*La sintaxis de asignación de desestructuración es una expresión de JavaScript que hace posible desempaquetar valores de un Array, 
o propiedades de un objeto, en variables distintas. En esta unidad trataremos solamente su aplicación a Array.
En el ejemplo a continuación, desestructuramos los valores de los primeros dos elementos del Array que identificamos con el nombre
de variable arr en las dos variables a y b. El ejemplo muestra la sintaxis de la asignación de desestructuración. La sintaxis 
es similar a la declaración de un Array con una expresión literal, pero en este caso se utiliza en la parte izquierda de la asignación 
para desempaquetar los valores del Array fuente.
 */
const arr = [1, 2, 3, 4, 5];
const [a, b] = arr;
console.log(a); // 1
console.log(b); // 2

//También se pueden definir valores por defecto para las variables. Observad cual es el resultado de ejecutar el código a continuación.
let [c = 0, d = 10] = [1];
console.log(c); // 1
console.log(d); // 10

/*Un aspecto interesante de la asignación de desestructuración es que se pueden desempaquetar todos los elementos de un 
Array que se desee y asignar los restantes a una variable, a través del operador rest.
¿Os acordáis? El operador ... genera un Array a partir de una lista de argumentos.
Observad el comportamiento del código a continuación: la variable rest contiene los elementos restantes del Array fuente, 
y es ella misma un Array. */
const arr2 = [1, 2, 3];
let [e, ...rest] = arr2;
console.log(rest);