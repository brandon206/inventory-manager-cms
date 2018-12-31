<?php

if(empty($LOCAL_ACCESS)){
    die('Direct access not allowed');
}

if(empty($_POST["product_title"]) || empty($_POST["product_description"]) || empty($_POST["quantity"]) || empty($_POST["price"]) || empty($_POST["id"])) {
    $output["errors"] = "Edit Failed";
  }

$product_title = $_POST['product_title'];
$product_description = $_POST['product_description'];
$quantity = $_POST['quantity'];
$price = $_POST['price'];
$id = $_POST['id'];

$output = [
    'success' => false,
    'errors' => [],
];

$query = " UPDATE `Inventory` SET `product_title` = '$product_title', `product_description` = '$product_description', `quantity` = '$quantity', `price` = '$price' WHERE `id` = '$id' ";


$result = mysqli_query($conn, $query);

if(!empty($result)){
    if(mysqli_affected_rows($conn)){
        $output['success'] = true;
    }else {
        $output['errors'][] = 'Unable to update item';
    }
} else {
    $output['errors'][] = "Invalid query";
}

?>