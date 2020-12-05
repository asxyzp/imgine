$(document).ready(()=>{
	$(".file").on("change",(event)=>{
		$(".filePath").html($(".file").val());
		console.log(event.target.files);
		$(".files").html((event.target.files[0]).toString());
	});
});