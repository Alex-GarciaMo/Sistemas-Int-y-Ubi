/*function sum(a,b){
  return a + b;
}
se puede escribir en una sola linea usando las funciones flechas, obviando los corchetes y la palabra clave return.

let sum = (a,b) => a + b */

/*En JavaScript, en muchas ocasiones, necesitamos escribir funciones pequeñas que se ejecutarán en otro sitio. Es el 
caso de las funciones de callback, por ejemplo las funciones que se ejecutan en las llamadas a la función setTimeout(func). 
En estas ocasiones, muy probablmente, no queremos salir del contexto actual. Las funciones flecha no tienen this, es decir 
que cuando acccedemos al objeto this en una función flecha, este será siempre el valor de this del contexto exterior. Se entenderá
mejor con un ejemplo.
Imaginad que queremos escribir un temporizador para implementar una cuenta atrás. El objeto tendrá un atributo con el valor actual 
del temporizador (10, 9, 8, 7, ...), un método para inicializar el temporizador con un valor determinado y, un método para empezar 
la cuenta atrás. A continuación una posible implementación sin las funciones flechas. 

const timer = {
  count: 0,
  init: function(val){
    this.count = val;
  },
  startCounter: function(){
    let timerId = setTimeout(function cnt(){
      this.count = this.count - 1;
      console.log(this.count);
      if(this.count > 0){
        timerId = setTimeout(cnt, 1000);
      }
    }, 1000);
  }
}
  
timer.init(10);
timer.startCounter();

Esta implementación, sin embargo, no es correcta. Si ejecutamos el código se imprimirá NaN. ¿Sabríais decir por qué?
Para responder a esta pregunta nos tenemos que hacer otra pregunta primero: ¿Cuál es el valor del objeto this dentro de la
función cnt invocada por el temporizador?
this es el objeto Timeout creado por la función setTimeout. Intentad imprirmir por pantalla this dentro de la función cnt para 
verificarlo. Para que el código funcione, por tanto, tenemos que llamar a la función cnt vinculando this al nuestro objeto temporizador.
A continuación se muestra el código correcto.*/

const timer = {
    count: 0,
    init: function(val) {
      this.count = val;
    },
    startCounter: function() {
      let timerId = setTimeout(function cnt() {
        this.count = this.count - 1;
        console.log(this.count);
        if (this.count > 0) {
          timerId = setTimeout(cnt.bind(this), 1000);
        }
      }.bind(this), 1000);
    }
  }
  
  timer.init(10);
  timer.startCounter();

  /*Utilizamos bind(this) porque, cuando llamamos al método startCounter, el objeto this será una referencia a nuestro 
  temporizador (la variable timer).
Ahora, veremos como podemos obtener el mismo resultado sin tener que utilizar el método bind, simplemente utilizando la sintaxis 
de las funciones flecha. */
const timer2 = {
    count: 0,
    init: function(val){
      this.count = val;
      },
  
    startCounter: function(){
        let cnt = () => {
          this.count = this.count - 1;
          console.log(this.count);
          if(this.count > 0){
            timerId = setTimeout(cnt, 1000);
          }
        };
        let timerId = setTimeout(cnt, 1000);
    }
  }
  
  timer2.init(10);
  timer2.startCounter();