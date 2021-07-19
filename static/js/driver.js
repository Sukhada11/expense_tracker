var jsonData 
function onLoad(){
  fetch({{url_for('getMonthlyData')|tojson}},{
	   method: 'GET',
      })
        .then(parseJSON)
        .then(setData);
    }
	function parseJSON(response) {
	  
      return response.json();
    }
	
    function setData(data) {
      jsonData = data
	  addShow(convertDataDay(data,'curr'),'day')
	  }
	  
	  
	
	  if (format == 'month'){
		draw(data,monthly,'monthly')
	  }else{
		draw(data,monthly,'daily')
		}
		
		

	  
	  }
	  function loadData(text){
		if (text == 'curr' || text == 'last'){
	  addShow(convertDataDay(jsonData,text),'day')}
	    else if (text == 'last3' || text == 'last6'){
	  addShow(convertDataDay(jsonData,text),'month')}
	  
		
	  
	  
	  
	  }
	