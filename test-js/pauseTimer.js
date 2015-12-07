

function pauseCountDown(event){
	var target = $(event.target);
	clearInterval(loopingTimer);
	target.removeClass("pause");
	target.addClass("start");
	engageButton.on("click",startCountDown);

}