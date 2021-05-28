<?php

$time = $_GET['time'];
$slot = $_GET['slot'];

$link = mysqli_connect("*******", "******", "*******", "neeltron");
$sql = "INSERT INTO med (time, slot) values ($time, $slot);";
if (mysqli_query($link, $sql)) {
  echo "successful";
}
else {
  echo "unsuccessful";
}

mysqli_close($link);

?>
