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
	var data = [
		{
			y: [jsonData[supplier]["On-Time PO Acknowledgement"]],
			x: [jsonData[supplier]["Supplier Name"]],
			type: "bar"
		}
	];
	var layout = {
		title: "On-Time Order Acknowledment (%)"
	}
	//plot chart
	Plotly.newPlot('myDiv', data, layout);
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