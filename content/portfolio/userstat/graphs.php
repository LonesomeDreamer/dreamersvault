<?php

require 'db.php';

$uniqueUsers = array();

for ($i = 0; $i < 24; $i++) {
  $uniqueUsers[] = array("x"=> $i, "y"=> select_query("date", $i));
}

$cities = array();
$byCities = select_query("city");
foreach($byCities as $byOneCity) {
  $cities[] = array("y"=> $byOneCity[0], "label"=> $byOneCity[1]);
}

?>
<!DOCTYPE HTML>
<html>
<head>
<script>
window.onload = function () {

var chart1 = new CanvasJS.Chart("chart1Container", {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light1",
	title:{
		text: "Уникальные посетители по часам"
	},
  axisX:{
    title:"Время",
    interval: 1,
  },
  axisY:{
    title:"Количество уникальных посетителей",
    minimum: 0,
    maximum: 23,
  },
	data: [{
		type: "column",
		indexLabelFontColor: "#5A5757",
		indexLabelPlacement: "outside",
		dataPoints: <?php echo json_encode($uniqueUsers, JSON_NUMERIC_CHECK); ?>
	}]
});
chart1.render();

var chart2 = new CanvasJS.Chart("chart2Container", {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light1",
	title:{
		text: "Разделение пользователей по городам"
	},
  axisX:{
    title:"Время",
  },
  axisY:{
    title:"Количество уникальных посетителей",
  },
	data: [{
		type: "pie",
		indexLabelFontColor: "#5A5757",
		indexLabelPlacement: "outside",
		dataPoints: <?php echo json_encode($cities, JSON_NUMERIC_CHECK); ?>
	}]
});
chart2.render();

}
</script>
</head>
<body>
<div id="chart1Container" style="height: 370px; width: 100%;"></div>
<div id="chart2Container" style="height: 370px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>
