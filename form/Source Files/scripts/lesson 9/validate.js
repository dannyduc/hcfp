$(function() {
/***********************************************************************************************/
/* Define some regular expressions */
/***********************************************************************************************/
var expEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
	expLettersOnly = /^[a-zA-Z ]+$/,
	expLettersNumbers = /^[a-zA-Z0-9]*$/;
		


/***********************************************************************************************/
/* Validate form on typing */
/***********************************************************************************************/
$( "#form-new-account" ).on( "keyup", "input.validate-locally", function() {
	validateField( $(this) );
});



/***********************************************************************************************/
/* On form submit, do an AJAX call */
/***********************************************************************************************/
$( "#form-new-account" ).submit(function(e) {
	// Prevent the form from submitting by default
	e.preventDefault();
	
	// Get the form action
	var $this = $( this ),
		action = $this.attr( "action" );
		
	// Do an AJAX request
	$.post(
		action,
		$this.serialize(),
		function( data ) {
			// We display the returned message
			$( ".ajax-message" ).html( data ).show();
			
			// Depending on the nature of the message, we apply success or error classes
			$( ".ajax-message:contains('Error!')" ).removeClass( "ajax-success" ).addClass( "ajax-error" );
			$( ".ajax-message:contains('Success!')" ).removeClass( "ajax-error" ).addClass( "ajax-success" );
		}
	);
});

	

/***********************************************************************************************/
/* Function that checks if a field has the correct minimum length */
/***********************************************************************************************/
function validateLength( fieldValue, minLength ) {
	// We remove trailing and leading whitespace
	return ( $.trim( fieldValue ).length > minLength );
}



/***********************************************************************************************/
/* Function that validates a field */
/***********************************************************************************************/
function validateField( field ) {
	var errorText = "",
		error = false,
		value = field.val(),
		siblings = field.siblings( ".demo-errors" );
	
	// Test for which field is sent
	switch ( field.attr( "name" ) ) {
		case "name": 
			if ( !validateLength( value, 2 ) ) {
				error = true;
				errorText += "The name is too short!<br />";
			}
			
			if ( !expLettersOnly.test( value ) ) {
				error = true;
				errorText += "The name can only contain letters and spaces!";
			}
			
			break;

		case "username": 
			if ( !validateLength( value, 2 ) ) {
				error = true;
				errorText += "The username is too short!<br />";
			}
			
			if ( !expLettersNumbers.test( value ) ) {
				error = true;
				errorText += "The username can only contain alphanumeric characters!";
			}
			
			break;

		case "gender": 
			if ( value === "0" ) {
				error = true;
				errorText += "Please select a gender!";
			}
			
			break;

		case "email": 
			if ( !expEmail.test( value ) ) {
				error = true;
				errorText += "The email address format is invalid!";
			}
			
			break;

		case "password": 
			if ( !validateLength( value, 5 ) ) {
				error = true;
				errorText += "The password is too short!<br />";
			}
			
			if ( !expLettersNumbers.test( value ) ) {
				error = true;
				errorText += "The password can only contain alphanumeric characters!";
			}
			
			break;

		case "confirm-password": 
			if ( value !== $( "#password" ).val() ) {
				error = true;
				errorText += "The passwords don't match!";
			}
			
			break;
	}
	
	// Display the error message below the field
	siblings.html(errorText);
	
	// If there are errors return false
	return !error;
}
});