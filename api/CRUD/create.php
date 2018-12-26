<?php

if(empty($LOCAL_ACCESS)){
    die('Direct access not allowed');
}

$product_title = $_POST['product_title'];
$product_description = $_POST['product_description'];
$quantity = $_POST['quantity'];
$price = $_POST['price'];
$output = [
    'success' => false,
    'error' => [],
];

$query = "INSERT INTO `Inventory` SET
    `product_title` = '$product_title',
    `product_description` = '$product_description',
    `quantity` = '$quantity',
    `price` = '$price'";

$result = mysqli_query($conn, $query);

if(!empty($result)){
    if(mysqli_affected_rows($conn)){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }else {
        $output['errors'][] = "Unable to insert data";
    }
} else {
    $output['errors'][] = "Invalid query";
}


?>