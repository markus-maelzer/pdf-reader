const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');

// expected to put pdf buffer as argument!
const parsePdf = require('./parse-pdf');

const port = process.env.PORT || 3001;
const staticDir = path.join(__dirname, '../frontend/build')

app.use(express.static(staticDir));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/parse-pdf', (req, res) => {

})

app.listen(port, () => {
  console.log(`Server is definately not started on Port: ${port}`);
})
