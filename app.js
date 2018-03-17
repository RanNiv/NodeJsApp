var fs = require("fs");  //fs = file-system
var http = require("http");


var content="<h1>default msg</h1>";
let datePartHmlString="morning";


var currentDateTime = new Date(); 
var day=currentDateTime.getDate();
var month=currentDateTime.getMonth();
var year=currentDateTime.getFullYear();

var CurrentDate=`${year}-${month+1}-${day}`;
var tomorrowDate=`${year}-${month+1}-${day+1}`;



let morning= {
     htmlFile:"morning",
     startTime: " 06:00:00",
     endTime:" 12:00:00",
     
}

let afternoon= {
    htmlFile: "afternoon",
    startTime: " 12:00:00",
    endTime: " 16:00:00"
}

let evening= {
    htmlFile: "evening",
    startTime : " 16:00:00",
    endTime: " 20:00:00"
}

let night= {
    htmlFile: "night",
    startTime: " 20:00:00",
    endTime: " 06:00:00"
}

let DatePartsArray=[];
DatePartsArray.push(JSON.stringify(morning));
DatePartsArray.push(JSON.stringify(afternoon));
DatePartsArray.push(JSON.stringify(evening));
DatePartsArray.push(JSON.stringify(night));

for (let datepart of DatePartsArray) {

let dateCheckStart=new Date (CurrentDate+JSON.parse(datepart).startTime);
let dateCheckEnd=JSON.parse(datepart).htmlFile=="night"?new Date (tomorrowDate+JSON.parse(datepart).endTime):new Date (CurrentDate+JSON.parse(datepart).endTime);

if (currentDateTime>=dateCheckStart && currentDateTime<dateCheckEnd ) {   
datePartHmlString=JSON.parse(datepart).htmlFile+".html";

break;
}
}


fs.readFile("./htmlpages/"+datePartHmlString,"utf-8", function(err, data){
	content=data;
})


// Create http server:
var myServer = http.createServer(function(request, response){
	
	console.log("User requested page...");
	
	// Send back header:
	response.writeHead(200, {"Content-Type": "text/html"});
	
	// Send back content: 
	response.write(content);
	
	// End response:
	response.end();
});

// Start listening on port 3500:
myServer.listen(3500);