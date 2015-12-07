var subtractTime = $(".subtract-time");
var addTime = $(".add-time");

subtractTime.on("click",changeSessionValues);
addTime.on("click",changeSessionValues);

function changeSessionValues(event){
	var target = $(event.target);
	var timerNumber;
	if (target.is(subtractTime)){
		target.next().html(function(index,oldhtml){
			if(parseInt(oldhtml) === 1){
				return oldhtml;
			}
			timerNumber = parseInt(oldhtml) - 1 ;
			return timerNumber;
		});
	}

	if (target.is(addTime)){
		target.prev().html(function(index,oldhtml){
			timerNumber = parseInt(oldhtml) + 1 ;
			return timerNumber ;
		});
	}
	if (target.parents().is("#work-container")){
		$("#timer-clock").html(timerNumber);
	}	
}