/*Función setTimeout
La sintaxis: let timerId = setTimeout (func | code, [delay], [arg1, arg2, ...])
-func | code : una función o una cadena de código para ejecutar. Por lo general, eso es una función. 
Por razones históricas, se puede pasar una cadena de código, pero eso no es recomendable.
-delay, el retraso opcional antes de la ejecución, en milisegundos (1000ms es igual a un 1 segundo), por defecto 
es 0. El planificador invocará la función solamente después de que se complete el código actual.
-arg1, arg2, ..., argumentos opcionales para la función. */
function sayHello() {
    console.log("Hola!");
}

setTimeout(sayHello, 1000);
//setTimeout(sayHello(), 1000); esto da error, se tiene que meter solo el nombre de la función sin ()

/*También hay que tener siempre presente que las funciones setInterval y setTimeout no aseguran la 
execución del código exactamente después del tiempo especificado. El planificador de tares de nuestro 
entorno JavaScript ejecutará el código siempre después que haya finalizado la tarea corriente. Mirad que 
ocurre en el código a continuación: la función sayHello se ejecutará después que haya finalizado el bucle for. */
function sayHello() {
    console.log("Hola!");
}

setTimeout(sayHello, 0);
for (let i = 0; i < 5; i++) {
    console.log(i);
}

/*Llamar a la función setTimeout devuelve un identificador que se puede usar para cancelar la ejecución. En este 
caso utilizamos la función clearTimeout como en el ejemplo a continuación: programamos una función para ejecutarse 
después de un 1000ms y luego cancelamos su ejecución (hemos cambiado de idea). El resultado es que no ocurrirá nada. */
let timerId = setTimeout(() => console.log("no se imprimirá nunca"), 1000);
console.log(timerId); //identificador
clearTimeout(timerId);

/*La sintaxis de la función setInterval es igual a setTimeout:
let timerId = setInterval (func | code, [delay], [arg1, arg2, ...])
Todos los argumentos tienen el mismo significado. Pero a diferencia de setTimeout, ejecuta la función a intervalos 
regulares después del intervalo de tiempo dado. Para detener más llamadas, deberíamos llamar a clearInterval(timerId). 
El siguiente ejemplo mostrará un mensaje cada segundo. Después de 5 segundos, la salida se detiene. */
let timerId2 = setInterval(() => console.log('tick'), 1000);
setTimeout(() => {
    clearInterval(timerId2);
    console.log('stop');
}, 5000);

/*Otra manera de ejecutar una función a intervalos regulares es llamar recursivamente la función setTimeout.
 */
/*
* En lugar de usar: let timerId = setInterval((); console.log('tick'), 2000); 
let timerId = setTimeout(function tick() { 
  console.log('tick'); 
  timerId = setTimeout(tick, 2000); 
}, 2000);

El setTimeout anterior programa la próxima llamada al final de la actual (linea 7). El setTimeout recursivo es un método 
más flexible que setInterval. Por ejemplo, la próxima llamada a la función puede programarse de manera diferente, dependiendo 
de los resultados de la actual.
*/
let delay = 1000;
let execution = 1;
let timerId3 = setTimeout(function flexibleDelay() {
  console.log('tick ' + delay);
  execution++;
  if (execution % 5 != 0) {
    delay = execution * 1000;
  } else {
    delay = 1000;
    execution = 1;
  }
  timerId3 = setTimeout(flexibleDelay, delay);
}, delay);