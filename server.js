const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use((req, _, next) => {
  console.log(req.method, req.path, req.params, req.body);
  next();
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  }
});

const upload = multer({ storage: storage })

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file
  res.json({
    name: originalname,
    type: mimetype, 
    size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
