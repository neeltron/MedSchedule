<?php

date_default_timezone_set('Asia/Kolkata');

$link = mysqli_connect("**********", "**********", "**********", "neeltron");
$sql1 = "SELECT * FROM med WHERE slot = 1 ORDER BY id desc LIMIT 1;";
$sql2 = "SELECT * FROM med where slot = 2 ORDER BY id desc LIMIT 1;";
$res1 = mysqli_query($link, $sql1);
if (mysqli_num_rows($res1) > 0) {
  while($row = mysqli_fetch_assoc($res1)) {
  	$time = $row['time'];
  	$slot = $row['slot'];
  	$time_updated = strtotime($time);
	$newTime = date('Hi', $time_updated);
  	if((int) date('Hi') > (int) $newTime) {
    	echo "1";
    }
  }
}
$res2 = mysqli_query($link, $sql2);
if (mysqli_num_rows($res2) > 0) {
  while($row = mysqli_fetch_assoc($res2)) {
  	$time = $row['time'];
  	$slot = $row['slot'];
  	$time_updated = strtotime($time);
	$newTime = date('Hi', $time_updated);
  	if((int) date('Hi') > (int) $newTime) {
    	echo "2";
    }
  }
}

?>
