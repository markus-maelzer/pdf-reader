const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');

// expected to put pdf buffer as argument!
const parsePdf = require('./parse-pdf');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const port = process.env.PORT || 3001;
const staticDir = path.join(__dirname, '../frontend/build')

app.use(express.static(staticDir));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/parse-pdf', upload.single('pdf'), (req, res) => {
  var { originalname } = req.file;
  console.log(`parsing: ${originalname}`);

  parsePdf(req.file.buffer).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send('something caused an error please contact the one responsible')
  })
})

app.listen(port, () => {
  console.log(`Server is definately not started on Port: ${port}`);
})
