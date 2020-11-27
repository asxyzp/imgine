
//It is necessary to run the following code after HTML content has been loaded
//ERROR : "Cannot read property 'getContext' of null, using canvas"
$(document).ready(()=>{
	let canvas = document.getElementById('canvas');					//HTML Canvas
	if(canvas.getContext){											//Checking for support
		let context = canvas.getContext('2d');						//Setting context
		console.log("Yay! Rendering context exists.");
		
		//Create two overlapping rectangles
		context.fillStyle = 'rgb(255,0,0)';
		context.fillRect(10,10,80,80);
		context.fillStyle = 'rgba(0,0,255,0.5)';
		context.fillRect(50,50,80,80);
	}
	else{
		console.log("Oops! Rendering context doesn't exists.");
	}
});