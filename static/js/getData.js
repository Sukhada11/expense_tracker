// Load google charts
google.charts.load('current', {'packages':['corechart']});
// Draw the chart and set the chart values
function convertDataDay(data,period){
	console.log(data)
	var result = Object.keys(data).sort(function(a, b) {
	return data[a]['day'] - data[b]['day'];})
	srted_data ={}
	for(k in  result){
	srted_data[result[k]]=data[result[k]]}
	var date = new Date();
	var filterdData ={}
    function filterFn(data,start,end) { 
		  var filtered = {}
		  for (var k in data) {
		  
			var date  = new Date(data[k].year,data[k].month-1,data[k].day)

			if (date>=start && date<=end){
				filtered[k] = data[k]
			}
		  }
		  return filtered}
		 
	
	if (period == 'curr') {
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 0);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		filterdData = filterFn(srted_data,firstDay,lastDay)
		
	}
	else if (period =='last'){
		var firstDay = new Date(date.getFullYear(), date.getMonth()-2, 0);
        var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

		filterdData = filterFn(srted_data,firstDay,lastDay)
		
		
	}
	
	else if (period == 'last3'){
		var firstDay = new Date(date.getFullYear(), date.getMonth()-3, 0);
        var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
		
		filterdData = filterFn(srted_data,firstDay,lastDay)
		
		
	}
	else {
		var firstDay = new Date(date.getFullYear(), date.getMonth()-6, 0);
        var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);

		filterdData = filterFn(srted_data,firstDay,lastDay)

	}
	return filterdData
}

