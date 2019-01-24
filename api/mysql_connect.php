<?php
$servername = "localhost";
$username = "brandon";
$password = "bananaRacecar";
$database_name = "ecom_cart_db";
$port = "3306";

// Create connection
$conn = new mysqli($servername, $username, $password, $database_name, $port);

// Check connection
if (empty($conn)) {
    print("Connection unavailable");
    exit();
} 
// echo "Connected successfully";
?>
