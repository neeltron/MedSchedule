<?php

$link = mysqli_connect("**********", "**********", "**********", "neeltron");
$sql1 = "SELECT * FROM med WHERE slot = 1 ORDER BY id desc LIMIT 1;";
$sql2 = "SELECT * FROM med where slot = 2 ORDER BY id desc LIMIT 1;";
$res1 = mysqli_query($link, $sql1);
if (mysqli_num_rows($res1) > 0) {
  while($row = mysqli_fetch_assoc($res1)) {
  	$time = $row['time'];
  	$slot = $row['slot'];
  	echo date('Hi');
  	if((int) date('Hi') >= 2300) {
    	echo "1";
    }
  }
}
$res2 = mysqli_query($link, $sql2);
if (mysqli_num_rows($res2) > 0) {
  while($row = mysqli_fetch_assoc($res2)) {
  	$time = $row['time'];
  	$slot = $row['slot'];
  	if((int) date('Hi') > 2300) {
    	echo "2";
    }
  }
}

?>