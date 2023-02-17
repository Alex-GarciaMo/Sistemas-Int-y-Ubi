/*Las funciones constructoras se utilizan para crear objetos de la siguiente manera. Primero se declara la función 
constructora siguiendo la convención que el nombre de la función empieza por una letra mayúscula. Por ejemplo, la 
siguiente función se podría utilizar para crear un constructor de objetos que representan películas en un servicio 
de streaming. */
function Movie(title, year) {
    this.title = title;
    this.year = year;
    this.favorite = false;
  }
const movie = new Movie("The Matrix", 1999);
console.log(movie.title);

/*Las propiedades de un objeto pueden ser funciones (métodos), y por supuesto podemos agregar métodos a un objeto
desde las funciones constructoras. */
function Movie2(name, year) {
    this.name = name;
    this.year = year;
    this.favorite = false;
    
    this.showTitle = function() { 
      console.log(this.title);
    };
  }
  
  const movie2 = new Movie2("The Matrix", 1999);
  movie2.showTitle(); //"The Matrix"

