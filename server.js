const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./User')



//mongodb connection
const mongoUrl =
    "mongodb+srv://sunny6488:sunny6488@cluster0.jmmfivv.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

// Create Server
const app = express();

// Use MiddleWare
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, '/')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/attachment'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// Route End Point
app.post('/api/v1/attachmentfile-upload', upload.array('attachments'), (req, res, next) => {
    console.log(req.files, req.body);
    UserModel.create({ attachement: req.files.filename })
        .then(result => res.json(result))
        .catch(err => console.log(err));
    const filenames = req.files.map(file => file.filename);
    res.json({
        message: 'File Uploaded!',
        status: 'success',
        filenames,
    })
})


//->Show UI...
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

// Listening Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
})