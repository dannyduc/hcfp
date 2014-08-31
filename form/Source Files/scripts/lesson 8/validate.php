<?php
/***********************************************************************************************/
/* If nothing is posted then we exit */
/***********************************************************************************************/
if (!$_POST) {
	die("This file cannot be accessed directly!");
}



/***********************************************************************************************/
/* Define regular expression patterns */
/***********************************************************************************************/
$expEmail = 			'/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/';
$expLettersOnly = 		'/^[a-zA-Z ]+$/';
$expLettersNumbers = 	'/^[a-zA-Z0-9]*$/';



/***********************************************************************************************/
/* Define the function for checking the field length */
/***********************************************************************************************/
function validateLength($fieldValue, $minLength) {
	return (strlen(trim($fieldValue)) > $minLength);
}



/***********************************************************************************************/
/* Get the posted field values and validate each field */
/***********************************************************************************************/
$name 				= $_POST["name"];
$username 			= $_POST["username"];	
$gender 			= $_POST["gender"];	
$email 				= $_POST["email"];	
$password 			= $_POST["password"];	
$confirmPassword	= $_POST["confirm-password"];	
$subscribe 			= $_POST["subscribe"];

$errorExists 		= false;
$errors 			= "Errors: <ul>";

// Name
if (!validateLength($name, 2)) {
	$errorExists = true;
	$errors .= "<li>The name is too short!</li>";
}
if (preg_match($expLettersOnly, $name) !== 1) {
	$errorExists = true;
	$errors .= "<li>The name can only contain letters and spaces!</li>";
}

// Username
if (!validateLength($username, 2)) {
	$errorExists = true;
	$errors .= "<li>The username is too short!</li>";
}
if (preg_match($expLettersNumbers, $username) !== 1) {
	$errorExists = true;
	$errors .= "<li>The username can only contain alphanumeric characters!</li>";
}

// Gender
if ($gender === "1") {
	$gender = "Male";
} else if ($gender === "2") {
	$gender = "Female";
} else {
	$errorExists = true;
	$errors .= "<li>Please select a gender!</li>";
}

// Email
if (preg_match($expEmail, $email) !== 1) {
	$errorExists = true;
	$errors .= "<li>The email address format is invalid!</li>";
}

// Password
if (!validateLength($password, 5)) {
	$errorExists = true;
	$errors .= "<li>The password is too short!</li>";
}
if (preg_match($expLettersNumbers, $password) !== 1) {
	$errorExists = true;
	$errors .= "<li>The password can only contain alphanumeric characters!</li>";
}

// Confirm Password
if ($confirmPassword !== $password) {
	$errorExists = true;
	$errors .= "<li>The passwords don't match!</li>";
}

// If no errors, echo the results
if (!$errorExists) {
	echo "<h3>Success! The form has been submitted!</h3>"
		. "<p>Details:</p>"
		. "<ul>"
		. "<li>Name: $name</li>"
		. "<li>Usernname: $username</li>"
		. "<li>Gender: $gender</li>"
		. "<li>Email: $email</li>"
		. "<li>Subscribe to newsletter: $subscribe</li>"
		. "</ul>";
} else {
	echo "<h3>Error! Please address the following issues:</h3>"
		. $errors;
}	
?>