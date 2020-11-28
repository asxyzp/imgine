//JavaScript file for imgine image processing application
//Created by Aashish Loknath Panigrahi (@asxyzp)

$(document).ready(()=>{

	//For hiding buttons and containers before the image is loaded
	$('.io-toggle').hide();
	$('.greyscale').hide();
	$('.output-canvas-div').hide();
	$('.thresholding').hide();
	$('.thresholding-div').hide();
	$('.revert').hide();

	$('.img-file-btn').on('change',(event)=>{

		//For showing buttons and containers after the image is loaded
		$('.io-toggle').show();
		$('.greyscale').show();
		$('.thresholding').show();
		$('.revert').show();

		//Toggling threshold div based on thresholding button
		$('.thresholding').click(()=>{
			$('.thresholding-div').toggle();
		});

		//Form valiation for thresholding
		let threshold_value,threshold_option;
		window.setInterval(()=>{
			threshold_value = $('.thresholding-value').val();		//Thresholding value (0-255)
			threshold_option = $('.thresholding-option').val();		//Thresholding option

			//Setting conditions when the thresholding button will be disabled
			if(Number(threshold_value)<0 || threshold_option=='' || threshold_option==undefined){
					$('.threshold-btn').prop('disabled',true);
			}
			else{
				$('.threshold-btn').prop('disabled',false);
			}
		},100);
	
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
        		let image = new Image();							//Creating an image object
        		image.src = event.target.result;				//Setting data url as image source
        		
				//When the image has been loaded
				image.onload = function(event) {
         			
					//Setting canvas details
					var canvas = document.getElementById('inputCanvas');	//Selecting the canvas element
         			let context = canvas.getContext('2d');					//Setting rendering context
					canvas.width = image.width;								//Setting height of canvas element
         			canvas.height = image.height;							//Setting width of canvas element
         			//ctx.drawImage(image,0,0);								//Drawing image on canvas
					
					//Storing image in cv.Mat & displaying the output
					let src = cv.imread(image);								//Image input frame
					let dst = new cv.Mat();					 				//Image output frame
					dst = src.clone();										//Cloning output frame as an input frame
					cv.imshow(inputCanvas,src);							    //Displaying input frame

					//For toggling between input & output radio buttons
					$('.input-label').click(()=>{

						$('.input-label').addClass('active');
						$('#input').prop('checked',true);
						
						$('.output-label').removeClass('active');
						$('#output').prop('checked',false);
						
						cv.imshow(inputCanvas,src);
						$('.input-canvas-div').show();
						$('.output-canvas-div').hide();
					});
					$('.output-label').click(()=>{
						
						$('.input-label').removeClass('active');
						$('#input').prop('checked',false);
						
						$('.output-label').addClass('active');
						$('#output').prop('checked',true);
						
						cv.imshow(outputCanvas,dst);
						$('.input-canvas-div').hide();
						$('.output-canvas-div').show();
					});

					//For reverting back to dst as a clone of src
					$('.revert').click(()=>{
						dst = src.clone();
						cv.imshow(outputCanvas,dst);
					});

					//For generating greyscale image
					$('.greyscale').click(()=>{
						cv.cvtColor(src,dst,cv.COLOR_RGBA2GRAY);
						cv.imshow(outputCanvas,dst);
					});

					//For generating image after thresholding
					$('.threshold-btn').click(()=>{
						if(threshold_option=='bin'){
							console.log(threshold_value,threshold_option);
							cv.threshold(dst, dst, Number.parseFloat(threshold_value), 255, cv.THRESH_BINARY);
							cv.imshow(outputCanvas,dst);
						}
						else if(threshold_option=='inv'){
							console.log(threshold_value,threshold_option);
							cv.threshold(dst, dst, Number.parseFloat(threshold_value), 255, cv.THRESH_BINARY_INV);
							cv.imshow(outputCanvas,dst);
						}
						else if(threshold_option=='tru'){
							console.log(threshold_value,threshold_option);
							cv.threshold(dst, dst, Number.parseFloat(threshold_value), 255, cv.THRESH_TRUNC);
							cv.imshow(outputCanvas,dst);
						}
						else if(threshold_option=='t20'){
							console.log(threshold_value,threshold_option);
							cv.threshold(dst, dst, Number.parseFloat(threshold_value), 255, cv.THRESH_TOZERO);
							cv.imshow(outputCanvas,dst);
						}
						else if(threshold_option=='inv_t20'){
							console.log(threshold_value,threshold_option);
							cv.threshold(dst, dst, Number.parseFloat(threshold_value), 255, cv.THRESH_TOZERO_INV);
							cv.imshow(outputCanvas,dst);
						}
					});
        		}
      		}
		}
	});

	/*	TESTING HTML CANVAS :

		let canvas = document.getElementById('inputCanvas');
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