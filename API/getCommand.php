<?php

$time = $_GET['time'];
$slot = $_GET['slot'];

$link = mysqli_connect("*******", "******", "*******", "neeltron");

$sql = "INSERT INTO med (time, slot) values ($time, $slot);";
if (mysqli_query($link, $sql)) {
  $myObj->resp = "successful";
}
else {
  $myObj->resp = "unsuccessful";
}
$myJSON = json_encode($myObj);
echo $myJSON;
mysqli_close($link);

?>
