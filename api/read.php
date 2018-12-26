<?php

require_once('mysql_connect.php');

$query = "SELECT * FROM Inventory";

$result = mysql_query($conn, $query);

?>