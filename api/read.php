<?php

require_once('mysql_connect.php');

$query = "SELECT * FROM Inventory";

$result = mysqli_query($conn, $query);

$output = [
    'success' => false,
    'error' => [],
    'data' => []
];

if(!empty($result)){
    if(mysqli_num_rows( $result ) !==0 ){
        $output['success'] = true;
        while($row = mysqli_fetch_assoc($result)){
          $output['data'][] = $row;
        }
    }
}   

$json_output = json_encode($output);

print($json_output);

?>