fs = require('fs')
const asyncloop = require('node-async-loop')
spamlist = require('./word-list')
 var map = {}


function startScan(fileName,cb){

fs.readFile('./uploadfile/'+ fileName,'utf8',(err,result)=>{
 
 	if(err){ return console.log(err.message) }		
		
		 asyncloop(spamlist,(element,next) =>{
 			count = 0			 	
		 	while((result.includes(element))){
 			 	result = result.replace(element,"*")
			 	count = count + 1
			 }
			 map[element] = count 
			 if(!result.includes(element)){
			 	next()
			 }
		 	},(err)=>{
		 		fs.unlink('./uploadfile/'+ fileName,()=>{
 				DfileName = new Date().getTime().toString() + fileName 
 				newFilename = './public/'+ DfileName

 				setTimeout(() =>{ fs.writeFile(newFilename,result,(err)=>{
					if(err){ return console.log(err) }
 
 							cb()
 	 					})},3000)
			})
 		 })		
})

}

 

module.exports.startScan = startScan