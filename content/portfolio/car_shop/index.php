<!DOCTYPE html>
<html>

	<head>
		<meta content="en-us" http-equiv="Content-Language" />
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>0x0F's Used Cars</title>
		<style type="text/css">
			body {
				position: absolute;
				width: 100%;
				height: 2000px;
				font-size: 20px;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			hr {
				margin: 0.5em auto;
				width: 50%;
			}

			.auto-style1 {
				text-align: center;
			}

			.newAction {
				display: flex;
				position: relative;
				justify-content: center;
				align-items: center;
				background-color: rgba(36, 34, 30, 0.2);
				left: 0px;
				top: 0px;
				width: 300px;
				height: 50px;
				border-radius: 10px;
				text-decoration: none;
				color: #000000;
				margin: 10px;
				background-clip: padding-box;
			}

			.newAction:hover {
				background-color: rgba(36, 34, 30, 0.4);
			}
		</style>
	</head>

	<body style="background: url('bg.jpg');">

		<h1 class="auto-style1">Welcome to 0x0F's Used Cars</h1>
		<h2 class="auto-style1">Enjoy the stay</h2>
		<h3 class="auto-style1"><?php require("./schedule.php"); ?></h3>
		<hr />
		<a class="newAction" href="form_enter_car.html" target="_blank">Add a Car</a>
		<a class="newAction" href="view_cars.php" target="_blank">View Cars</a>
	</body>

</html>
