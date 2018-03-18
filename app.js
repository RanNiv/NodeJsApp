let fs = require("fs");  //fs = file-system
let http = require("http");


let content="<h1>default msg</h1>";
let datePartHmlString="morning";
let currentDateTime = new Date(); 

switch(currentDateTime.getHours()) {
case 6:
case 7:
case 8:
case 9:
case 10:
case 11:
datePartHmlString="morning";break;
case 12:
case 13:
case 14:
case 15:
datePartHmlString="afternoon";break;
case 16:
case 17:
case 18:
case 19:
datePartHmlString="evening";break;
case 20:
case 21:
case 22:
case 23:
case 0:
case 1:
case 2:
case 3:
case 4:
case 5:
datePartHmlString="night";
}


datePartHmlString+=".html";


fs.readFile("./htmlpages/"+datePartHmlString,"utf-8", function(err, data){
	content=data;
});

console.log("listen on http://localhost:3500/");

// Create http server:
var myServer = http.createServer(function(request, response){
    
    
	
	// Send back header:
	response.writeHead(200, {"Content-Type": "text/html"});
	
	// Send back content: 
	response.write(content);
	
	// End response:
	response.end();
});

// Start listening on port 3500:
myServer.listen(3500);