var supplierInfo;
var source = "https://raw.githubusercontent.com/wilulrich96/plotlyDashTest/master/data.json";
function chartLoader(supplier){
	//checks if globabl variable loaded yet, then calls chartGenerator
	if(supplierInfo == undefined){
		Plotly.d3.json(source, function(rows){  
			supplierInfo = rows;
			chartGenerator(supplier, supplierInfo);
		});
	}
	else{
		chartGenerator(supplier, supplierInfo);
	}
}
function chartGenerator(supplier, jsonData){
	createBarChart(
		"On-Time Order Acknowledment (%)",
		"January",
		[jsonData[supplier]["On-Time PO Acknowledgement"]],
		'plot1'
	);
	createBarChart(
		"On-Time Shipping Window (%)",
		"January",
		[jsonData[supplier]["On Time PU"]],
		'plot2'
	);
	createBarChart(
		"Order Fill Rate (%)",
		"January",
		[jsonData[supplier]["Order Fill Rate"]],
		'plot3'
	);
	createBarChart(
		"ASN Fill Rate (%)",
		"January",
		[jsonData[supplier]["ASN Fill Rate"]],
		'plot4'
	);
}
function createBarChart(title, x, y, div){
	var data = [
		{
			x: y,
			y: x,
			type: "bar",
			orientation: "h"
		}
	];
	var layout = {
		title: title,
		xaxis: {range: [0,100]},
		height:150,
		width:350,
		margin: {
			l: 50,
			r: 50,
			b: 25,
			t: 25,
			pad: 4
		}
	};
	//plot chart
	Plotly.newPlot(div, data, layout);
}
function unpack(rows, key){
	/*
	   * unpack takes in data as rows and
	   * the column desired as key (string)
	   * then returns the data in that column
	   * as a list.
	*/
  return rows.map(function(row) { return row[key]});
}