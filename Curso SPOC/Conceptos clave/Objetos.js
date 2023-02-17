/*Podemos acceder a las claves/valores del objeto mediante un for y
añadiendo/quitando [] en el for*/ 
const obj = {
  a: 1,
  b: '2',
  c: function() { console.log('foo'); }
};

for (const p in obj) {
  console.log(p);
}
for (const p in obj) {
  console.log(obj[p]);
}

/*Las propiedades de un objeto literal pueden ser funciones. En este caso 
se llaman métodos y se pueden llamar desde el nombre del objeto utilizando 
la sintaxis de . */
const obj2 = {
    foo: function () {
      // …
    },
    bar: function () {
      // …
    },
  };
/*const obj = {
  foo() {
    // …
  },
  bar() {
    // …
  },
}; */

const user = {
    name: "John",
    age: 30,
    sayHello: function() {
      console.log(`Hello, ${this.name}`);
    }
  };
  
  user.sayHello();