<?php

$conn = mysqli_connect('', '', '', '');

$truncateSQL = "TRUNCATE `Inventory`";

mysqli_query($conn, $truncateSQL);

$insertSQL = "INSERT INTO `Inventory` (`id`, `product_title`, `product_description`, `quantity`, `price`) VALUES
(22, 'Stardust', 'Stardust - Gold frames feature a wayfarer shape with metal.', 300, '30.00'),
(23, 'Andromeda', 'Andromeda - Patterned frames feature a rounded style.', 450, '27.99'),
(24, 'Finale', 'Finale - Gold frames feature a two-toned, geometric style. A unique and vibrant look.', 550, '29.99'),
(25, 'Moonlight', 'Moonlight - Navy frames feature a rounded-rectangular style.', 750, '19.99'),
(26, 'Cascade Gold', 'Cascade is the perfect round frame that is simple enough for any occasion.', 1000, '22.50'),
(27, 'Conifer Black', 'Conifer - Brass glasses feature a simple round wire frame.', 150, '28.99'),
(28, 'Star Gold', 'Star - Gold frames boast a new circular shape with gold metal frames', 460, '5.42'),
(29, 'Hourglass', 'Hourglass Metallic Black - Black rounded frames for a unique look', 1500, '32.00'),
(30, 'Clubmaster', 'Clubmaster - Half circle frames that feature a sophisticated look', 255, '25.95'),
(31, 'Clubmaster', 'Clubmaster - sophisticated frames for the bold', 550, '32.95'),
(32, 'Clubmaster', 'Clubmaster - frames that are for the sophisticated and bold', 750, '32.95');
";

mysqli_query($conn, $insertSQL);

?>