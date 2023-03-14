const fs = require('fs');
const a = 'Hola, Mundito!';

const data = new Uint8Array(Buffer.from(a));
fs.writeFile('file.txt', data, (error) => {
  if (error) throw error;
  console.log('Archivo guardado con éxito');
});

