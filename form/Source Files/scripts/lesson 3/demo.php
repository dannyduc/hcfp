<?php
	// Check to see if the form has been submitted
	if ($_GET['submit']) {
	
		// Echo the name and gender
		echo 'Name: '.$_GET['name'].'<br />';
		echo 'Gender: ';
		
		if ($_POST['gender'] == 1) {
			echo 'Male';
		} else {
			echo 'Female';
		}
	}
?>