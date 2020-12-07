$(document).ready(function(){
	let canvas = $("#canvas");
	let context = canvas['0'].getContext('2d');
	canvas[0].height = 600;
	canvas[0].width = 600;
	context.fillStyle = "rgba(255,0,0,0.5)";
	context.fillRect(20,20,300,300);
	context.fillStyle = "rgba(0,255,0,0.5)";
	context.fillRect(120,120,300,300);
	context.fillStyle = "rgba(0,0,255,0.5)";
	context.fillRect(220,220,300,300);
});