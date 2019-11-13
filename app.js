const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const multer = require('multer')
const filter = require('./filter.js')
var flash = require('express-flash')

const publicDirectory = path.join('__dirname','../public')
const viewsPath = path.join('__dirname','../views')
const partialspath = path.join('__join','../views/partials')

 
app.use(express.static(publicDirectory))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialspath)

const port = process.env.PORT || 3000


app.get('/',(req,res) =>{
  res.render('index')
})
 var file_name   
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadfile')
  },
  filename: function (req, file, cb) {
  	console.log(file.originalname)
  	file_name = file.originalname 
    cb(null, file.originalname)
  }
})


var upload = multer({ storage: storage })


app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  
  const file = req.file
  
    if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

    filter.startScan(file_name,()=>{
    		console.log("scanning done!...")
        res.render('index',{downloadLink: DfileName})
     })

})



app.listen(port,()  =>{
  console.log("App is listening on port "+ port)
})