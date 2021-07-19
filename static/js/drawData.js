function draw(data,monthlyData,period) {
	console.log(period)
	var dataByCategory = [['Category', 'Amount']]
	var cat = {}
	var dataByTransaction = [['Way of Transaction', 'Amount']]
	var way = {}
    var dataByTypOfTransaction = [['Type of Transaction', 'Amount']]
	var type = {}
  for(var key in data){
	if (data[key].category in cat){
	
		cat[data[key].category]+=Number(data[key].amount)}
	else{

		cat[data[key].category]=Number(data[key].amount)
	}
	if (data[key].wayOfTransaction in way){
		way[data[key].wayOfTransaction]+=Number(data[key].amount)}
	else{
		way[data[key].wayOfTransaction]=Number(data[key].amount)
	}
	if (data[key].typeOfTransaction in type){
		type[data[key].typeOfTransaction]+=Number(data[key].amount)}
	else{
		type[data[key].typeOfTransaction]=Number(data[key].amount)
	}

  }
  for (var key in cat){
		dataByCategory.push([key,cat[key]])}
  for (var key in type){
		dataByTypOfTransaction.push([key,type[key]])}
  for (var key in way){
		dataByTransaction.push([key,way[key]])}	

  console.log(dataByCategory)
  var dataByCategory = google.visualization.arrayToDataTable(dataByCategory);
  var dataByTypOfTransaction = google.visualization.arrayToDataTable(dataByTypOfTransaction);
  var dataByTransaction = google.visualization.arrayToDataTable(dataByTransaction);
  // Optional; add a title and set the width and height of the chart
  var optionscat = {'title':'Category', 'width':550, 'height':400};
  var optionsway = {'title':'Way', 'width':550, 'height':400};
  var optionstype = {'title':'Type', 'width':550, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart1 = new google.visualization.PieChart(document.getElementById('piechart1'));
  chart1.draw(dataByCategory, optionscat);
  var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));
  chart2.draw(dataByTypOfTransaction, optionsway);
  var chart3 = new google.visualization.PieChart(document.getElementById('piechart3'));
  chart3.draw(dataByTransaction, optionstype);
  if (period=='monthly'){
    
	var amountByMonth = [['Month', 'Amount']]
	var incomeByMonth = [['Month', 'Income']]
	var expenseByMonth = [['Month', 'Expense']]
	for (month in monthlyData){
		 amountByMonth.push([month,monthlyData[month]['total']])
		 incomeByMonth.push([month,monthlyData[month]['income']])
		 expenseByMonth.push([month,monthlyData[month]['expense']])}
	var amountByMonth = google.visualization.arrayToDataTable(amountByMonth)
	var incomeByMonth = google.visualization.arrayToDataTable(incomeByMonth)
	var expenseByMonth = google.visualization.arrayToDataTable(expenseByMonth)
	var optionsamt = {'title':'Monthly Transactions', 'width':550, 'height':400};
	var optionsinc = {'title':'Monthly Income', 'width':550, 'height':400};
	var optionsexp = {'title':'Monthly Expense', 'width':550, 'height':400};
    var chart4 = new google.visualization.PieChart(document.getElementById('piechart4'));
    chart4.draw(amountByMonth, optionsamt);
    var chart5 = new google.visualization.PieChart(document.getElementById('piechart5'));
    chart5.draw(incomeByMonth, optionsinc);
    var chart6 = new google.visualization.PieChart(document.getElementById('piechart6'));
    chart6.draw(expenseByMonth, optionsexp);
  }else{
  		document.getElementById('piechart4').innerHTML = "<p></p>"
		document.getElementById('piechart5').innerHTML = "<p></p>"
		document.getElementById('piechart6').innerHTML = "<p></p>"
  
  
  
  }

}