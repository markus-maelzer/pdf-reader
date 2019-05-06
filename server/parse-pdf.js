const fs = require('fs');
var pdfreader = require('pdfreader');

// const handlePdf = (resolve, reject) =>

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

  new pdfreader.PdfReader().parseBuffer(pdf, (err, item) => {
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
      console.log('done did it :3');
      resolve(content);
    }
  });
})

module.exports = parsePdf;

// for info on changing the module:
// in file: PdfReader.js
// function forEachItem(pdf, handler){
//   var pageNumber = 0;
//   for (var p in pdf.data.Pages) {
//     var page = pdf.data.Pages[p];
//     var number = ++pageNumber;
//     handler(null, {
//       page: number,
//       width: pdf.data.Width,
//       height:pdf.data.Pages[number-1].Height
//     });
//     for (var t in page.Texts) {
//       var item = page.Texts[t];
//       item.text = decodeURIComponent(item.R[0].T);
//       handler(null, item);
//     }
//   }
//   actual change
//   handler(null, {done: true});
// }
