<?php
/*
Uploadify v3.0.0
Copyright (c) 2010 Ronnie Garcia

Return true if the file exists
*/
if (file_exists('../../gambar/' . $_POST['filename'])) {
	echo 1;
} else {
	echo 0;
}
?>