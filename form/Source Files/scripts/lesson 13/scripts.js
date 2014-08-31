$(function() {
	// Get the jQuery object in a variable
	var fileInput = $( "#demo-file" );
	
	// Hide the default input
	fileInput.hide();
	
	// If we click on the replacement button, trigger the original button click
	$( "#file-replacement" ).on( "click", function() {
		fileInput.click();
		
		return false;
	} );
	
	// On change, we append the file input value to the parent paragraph
	fileInput.on( "change", function() {
		var $this = $(this);
		
		$this.closest( "p" ).append( "<p><small>" + $this.val() + "</small></p>" );
	} );
});