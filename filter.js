fs = require('fs')
const asyncloop = require('node-async-loop')
spamlist = ["x","a"]
var map = {}


function startScan(fileName,cb){


fs.readFile('./uploadfile/'+ fileName,'utf8',(err,result)=>{
 
 	if(err){ return console.log(err.message) }		
		
		 asyncloop(spamlist,(element,next) =>{
 		 	// result = result.replace(element,"*")
			count = 0			 	
		 	while((result.includes(element))){
			 	// console.log(result.replace(element,"*"))
			 	result = result.replace(element,"*")
			 count = count + 1
			 }
			 map[element] = count 
			 if(!result.includes(element)){
			 	next()
			 }
		 	},(err)=>{
		 		fs.unlink('./uploadfile/'+ fileName,()=>{
		 			console.log(result)
				setTimeout(() =>{ fs.writeFile('./uploadfile/'+ fileName,result,(err)=>{
					if(err){ return console.log(result) }
 
 							cb()
 	 					})},3000)
			})
		 	// console.log(result)
		 })		
})

}

startScan('sample.txt',()=>{

})

module.exports.startScan = startScan