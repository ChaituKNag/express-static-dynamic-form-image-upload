const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const upload = multer();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.post('/upload', upload.single('imageFile'), (req, res) => {
    console.log(req.file);
    if(req.file.originalname === 'blob') {
        fs.writeFileSync(`./uploads/${Date.now()}.png`, req.file.buffer);
    } else {
        
        fs.writeFileSync(`./uploads/${req.file.originalname}`, req.file.buffer);
    }
    res.send(JSON.stringify(req.body));
})
app.listen(4100, () => console.log("The server is up at : http://localhost:4100/static-form.html"));