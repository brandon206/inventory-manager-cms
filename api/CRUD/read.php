<?php

if(empty($LOCAL_ACCESS)){
    die('Direct access not allowed');
}

$query = "SELECT * FROM Inventory";

$result = mysqli_query($conn, $query);

$output = [
    'success' => false,
    'errors' => [],
    'data' => []
];

if(!empty($result)){
    if(mysqli_num_rows( $result ) !==0 ){
        $output['success'] = true;
        while($row = mysqli_fetch_assoc($result)){
          $output['data'][] = $row;
        }
    }else {
        $output['errors'][] = "No Data Available";
    }
}else {
    $output['errors'][] = mysqli_error($conn);
}   

?>