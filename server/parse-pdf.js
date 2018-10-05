const fs = require('fs');
var pdfreader = require('pdfreader');


const parsePdf = (pdf) => new Promise((resolve, reject) => {
  var rows = {}; // indexed by y-position
  let content = '';

  function printRows() {
    Object.keys(rows)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .forEach((y) => {
      content += (rows[y] || []).join('') + '\n';
    });
  }
  new pdfreader.PdfReader().parseBuffer(pdf, handlePdf);

  const handlePdf = (err, item) => {
    if(err) reject(err);

    if (!item || item.page || item.done) {
      printRows();
      content +=  `\n PAGE: ${item.page}\n`;
      rows = {};
    }
    else if (item.text) {
      (rows[item.y] = rows[item.y] || []).push(item.text);
    }
    // DO NOT FORGET U MADE DONE HAPPEN >_>
    // -> gotta fork this and moake it myself :| pain
    if(item.done) {
      resolve(content);
    }
  }
})

module.exports = parsePdf;
