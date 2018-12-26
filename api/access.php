<?php

$LOCAL_ACCESS = true;

$output = [
    'success' => false,
    'errors' => []
];

if(empty($_POST['action'])){
    $output[errors][] = "No action specified";
    print(json_encode($output));
    exit();
}

require_once('mysql_connect.php');
switch($_POST['action']){
    case 'read':
        include('CRUD/read.php');
        break;
    case 'create':
        include('CRUD/create.php');
        break;
    case 'delete':
        include('CRUD/delete.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}

$json_output = json_encode($output);
print($json_output);

?>