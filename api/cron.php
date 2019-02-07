<?php

$conn = mysqli_connect('', '', '', '');

$truncateSQL = "TRUNCATE `Inventory`";

mysqli_query($conn, $truncateSQL);

$insertSQL = "INSERT INTO `Inventory` (`id`, `product_title`, `product_description`, `quantity`, `price`) VALUES
(11, 'scriptljsdflkjdalfkjasd', 'a lawnmower that takes care of even the toughest weeds', 1000, '35.89'),
(12, 'apple pies', 'delicious pie from apples', 750, '10.99'),
(17, 'xhghg', 'xhghgxhghgxhghg', 1500, '5.99'),
(19, 'asdkjflkds', 'laksdhfnlksdanmflkdsnflksdjankflmsdakflnsdlkfjnsdlflsk', 1000, '5.99'),
(20, 'Apple Watch', 'Newest apple watch that includes Siri', 750, '6.00'),
(21, 'this is the title', 'this is the description', 1500, '5.00'),
(22, 'asdf', 'asdf', 12, '12.00')";

mysqli_query($conn, $insertSQL);

?>