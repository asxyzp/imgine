//JavaScript file for imagine
//Created by Aashish Loknath Panigrahi (@asxyzp)

$(document).ready(()=>{
	$('.img-file-btn').on('change',(event)=>{
		if(event.target.files) {
      		
			//console.log(event);								//Event object								
			//console.log(event.target);						//Element which triggers the event
			//console.log(event.target.files);				    //FileList obtained by <input type='file'/>

			//Reading the file and getting it's URL  
			let file = event.target.files[0];					//console.log(file);
      		let reader  = new FileReader();						//Reads data from blob
      		reader.readAsDataURL(file);							//Read the binary data & encodes it as a base64 URL

			//After the data has been successfully read as a data URL
      		reader.onloadend = function(event) 					
			{
        		let image = new Image();						//Creating an image object
        		image.src = event.target.result;				//Setting data url as image source
        		
				//When the image has been loaded
				image.onload = function(event) {
         			
					//Setting canvas details
					var canvas = document.getElementById('imgCanvas');		//Selecting the canvas element
         			let context = canvas.getContext('2d');					//Setting rendering context
					canvas.width = image.width;								//Setting height of canvas element
         			canvas.height = image.height;							//Setting width of canvas element
         			//ctx.drawImage(image,0,0);								//Drawing image on canvas
					
					//Storing image in cv,Mat & displaying the output
					let mat = cv.imread(image);								//Image input
					cv.imshow('imgCanvas',mat);								//Displays input frame on canvas
        		}
      		}
		}
	});

	/*	TESTING HTML CANVAS :

		let canvas = document.getElementById('imgCanvas');
		if(canvas.getContext){
			context = canvas.getContext('2d');
			console.log('Yay! HTML Canvas is supported by your browser');
			context.fillStyle = 'rgba(255,0,0,0.5)';
			context.fillRect(10,10,40,40);
			context.fillStyle = 'rgba(0,0,255,0.5)';
			context.fillRect(30,30,40,40);	
		}
		else{
			console.log('Oops! HTML Canvas isnt supported by your browser');
		}
	*/
});