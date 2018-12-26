<?php
$servername = "localhost";
$username = "root";
$password = "root";
$database_name = "ecom_cart_db";
$port = "8888";

// Create connection
$conn = new mysqli($servername, $username, $password, $database_name, $port);

// Check connection
if (empty($conn)) {
    print("Connection unavailable");
    exit();
} 
echo "Connected successfully";
?>