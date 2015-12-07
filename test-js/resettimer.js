var resetButton = $("#resetButton");

resetButton.on("click",resetTimer);

function resetTimer(){
	clearInterval(loopingTimer);
	$("#timer-clock").html(function(index,oldhtml){
		return $("#work-time").html();
	});
	subtractTime.on("click",changeSessionValues);
	addTime.on("click",changeSessionValues);
	engageButton.on("click",startCountDown);
}