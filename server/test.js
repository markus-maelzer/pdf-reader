const fs = require('fs');

fs.readFile('./test2.pdf', (err, ads) => {
  console.log(ads);
})
