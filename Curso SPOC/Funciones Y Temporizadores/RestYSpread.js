/*En JavaScript, a diferencia de otros lenguajes, se puede llamar a una función con cualquier número de argumentos,
 sin importar cómo esté definida */
function sum(a, b) {
    return a + b;
}

console.log(sum(1, 2, 3, 4, 5));

/*La sintaxis de los parámetros rest nos permite mencionar parametros en una definición de función con tres puntos ...,
 que literalmente significa "reunir los parámetros restantes en un Array".
La sintaxis rest sirve para reunir los parámetros restantes, es decir que siempre estará en última posición en los
 argumentos de una función. Lo podémos utilizar para reunir todos los argumentos en un Array: */
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


function showName(firstName, lastName, ...titles) {
    let name = firstName + " " + lastName;
    let title = "";
    for (let t of titles) {
        title = title + t + " ";
    }
    console.log(name + ", " + title);
}
showName("Julius", "Caesar", "General", "Consul", "Emperador");

/*Ahora digamos que tenemos una Array con los valores [1, 5, 2]. ¿Cómo llamamos a Math.max para saber cual es el valor mayor?
Pasar el Array como parámetro no funcionará, porque la función se espera una lista de argumentos numéricos, y no un único Array. 
Modificad el código anterior para pasar el Array en lugar de la lista de valores y mirad el resultado...
Tampoco podemos enumerar manualmente los elementos en el código Math.max (arr[0], arr[1], arr[2]), porque es posible que no estemos 
seguros de cuántos elementos haya, o que los elementos sean muchos. A medida que nuestro código se ejecuta, puede haber muchos o 
puede que no haya ninguno.
En tales ocasiones, el operador de propagación spread es lo que necesitamos. La sintaxis es similar a los parámetros rest, 
también usa ..., pero hace todo lo contrario. Cuando ...arr se usa en la llamada a función, el operador expande un objeto iterable
arr a su lista de argumentos. */
let arr = [1, 5, 2];
console.log(Math.max(...arr));