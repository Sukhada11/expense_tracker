function addShow(data,format){

	var otherheaders = ["Type Of Transaction","Amount","Category","	Way Of Transaction","Note"]
	var monthly={}

	if (format == 'month'){

		var headers = ['Month','Total','Income','Expense']
		
		for (k in data){
			month  = data[k].month
			if (month in monthly){
				monthly[month]['total']+=data[k].amount
				if (data[k].typeOfTransaction == 'income'){
					monthly[month]['income'] += data[k].amount
				}else{
					monthly[month]['expense'] += data[k].amount
				}
			}else{
				monthly[month]={'total':0,'income':0,'expense':0}
				monthly[month]['total']=data[k].amount
				monthly[month]['income'] = 0
				monthly[month]['expense'] = 0
				if (data[k].typeOfTransaction == 'income'){
					monthly[month]['income'] = data[k].amount
				}else{
					monthly[month]['expense'] = data[k].amount
				}
			
			}
		console.log(monthly)
		}
	}else{

		var header  = ['Day']
		headers = header.concat(otherheaders)
	}
	  
	 
	  var tableHTML = "<table class = mytable><tr class = tableRow>";
	  for (var i in headers) {
		tableHTML += "<th class =tableHeading>" + headers[i] + "</th>";
	  }
	  tableHTML += "</tr>";
	  if (format == 'month'){
		for (var month in monthly) {
		t0 = "<tr class = tableRow><td class=tableCell>" + month + "</td>"
		t2 = t0 + "<td class=tableCell>" + monthly[month].total+ "</td>"
		t3 =  t2+ "<td class=tableCell>" + monthly[month].expense+ "</td>"
		t4 =  t3+ "<td class=tableCell>" + monthly[month].income+ "</td>"
		tableHTML = tableHTML +t4
		}}else{

		for (var key in data) {
		t0 = "<tr class = tableRow><td class=tableCell>" + data[key][format] + "</td>"
		t1 = t0 + "<td class=tableCell>" +data[key].typeOfTransaction+ "</td>"
		t2 = t1 + "<td class=tableCell>" + data[key].amount+ "</td>"
		t3 =  t2+ "<td class=tableCell>" + data[key].category+ "</td>"
		t4 = t3+ "<td class=tableCell>" + data[key].wayOfTransaction+ "</td>"
		t5 =  t4 + "<td class=tableCell>" + data[key].note+ "</td> </tr>"
		tableHTML = tableHTML +t5
	  }}
	  tableHTML = tableHTML +'</table>'
	  document.getElementById('expenseTable').innerHTML = tableHTML ;
	  return monthly
	  }