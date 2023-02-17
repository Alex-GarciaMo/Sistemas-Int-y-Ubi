/*Escribir una función capitalize que acepte una cadena de caracteres como parámetro y transforme el texto poniendo en mayuscula 
la primera letra de cada palabra, y en minuscula todas las demás. Por ejemplo, dada la cadena "pensar incomoda como andar bajo la lluvia",
la función retornará "Pensar Incomoda Como Andar Bajo La Lluvia". Asumimos que la cadena contiene solamente caracteres del alfabeto latino,
que las palabras están separadas por un espacio ' ' y que la cadena tiene una longitud mayor o igual a 1. 
function capitalize(str) {
  let capitalizedString = str.charAt(0).toUpperCase();
  for (let i = 1; i < str.length; i++) {
    if (str.charAt(i - 1) === ' ') {
      capitalizedString += str.charAt(i).toUpperCase();
    } else {
      capitalizedString += str.charAt(i).toLowerCase();
    }
  }
  return capitalizedString;
}

const capitalized = capitalize("pensar incomoda como andar bajo la lluvia");
console.log(capitalized);*/

//Usando funciones de orden superior más caracteristico de Javascript
function capitalize(str) {
    /* Declaramos una función que acepte una cadena(palabra) de caracteres por parámetro
     * y devuelva la cadena con el primer caracter en mayusculas
     */
    function capitalizeWord(word){
        let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        return capitalizedWord;
    } // también s.substring(1) sería una solución correcta
    
    /* Convertimos la frase en minusculas y creamos
    * un Array con cada palabra de la frase como elementos con split
    */
    let wordsInString = str.toLowerCase().split(' ');
    
    for(let i = 0; i < wordsInString.length; i++){
        wordsInString[i] = capitalizeWord(wordsInString[i]);
    }
    
    /* El método join es el inverso de split: crea una cadena 
    * a partir del Array, usando el separador que le pasamos 
    * como argumento
    */
    return wordsInString.join(' ');
  }
  
let result = capitalize("pensar incomoda como andar bajo la lluvia");
console.log(result)


/*Una razón para usar una IIFE(FuncionInvocadaInmediatamente) es para implementar un mecánismo de privacidad de los datos. 
Las variables en JavaScript tienen un ámbito (alcance) a nivel de función (solo se pueden usar en la función que las contiene). 
Por esa razón toda variable declarada dentro de una IIFE no puede ser usada fuera de la función. Las IIFE son útiles también p
ara implementar clausuras.  (function(){ ...código de la función... })()
*/
(function() {
    var a = b = 5;
  })();
  
console.log(b);

/*Una clausura (closure) es una función que mantiene una referencia a las variables independientes (free), es decir esas variables 
usadas localmente pero declaradas en el ámbito adjunto (enclosing scope). En palabras mas “sencillas”: la función recuerda el entorno 
en la que se creó. Una clasura se puede definir también como una función interna que tiene acceso al contexto en la que se creó. 
Una clausura se crea cuando una función interna se hace accesible fuera de la función que la creó. Esto ocurre, típicamente, cuando 
una función retorna una función interna.
A continuación un ejemplo. Una función retorna otra función: la función interna tiene acceso a la variable localVariable definida en 
la función externa, incluso después que esta función haya retornado su valor. La clausura mantiene el acceso a las variables locales, 
argumentos y declaraciones de funciones internas de su función externa. */

const implClosure = function() {
    const localVariable = 1;
    return function bar() {
      console.log(localVariable);
    }
  
  };
  
  const getLocalVariable = implClosure();
  getLocalVariable();

//Con el patrón IIFE

/* 
const getLocalVariableIIFE = (function() {
  const localVariable = 1;
  return function bar() {
    console.log(localVariable);
  }
})();

getLocalVariableIIFE(); 
*/