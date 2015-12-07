var engageButton= $("#engage-button");
var loopingTimer;
engageButton.on("click",startCountDown);

function startCountDown(event){
	var target = $(event.target);
	engageButton.off();
	subtractTime.off();
	addTime.off();
	target.removeClass("start");
	target.addClass("pause");
	engageButton.on("click",pauseCountDown);


	var workDuration = $("#work-time");
	var breakDuration = $("#break-time");
	$("#timer-title").html("Time to Focus!");
	timerChange(workDuration,breakDuration);

}


function timerChange(workTime,breakTime){
	var initialWorkTime = workTime.html() + ":00";
	var initialBreakTime = breakTime.html() + ":00";
	var timerClock = $("#timer-clock");
	var lastTime = initialWorkTime;
	if(workTime.html() === timerClock.html() ){
			timerClock.html(initialWorkTime);
		}

    loopingTimer  = window.setInterval(function(){
    	var min = timerClock.html().split(":")[0];
    	var secs = timerClock.html().split(":")[1];

    	if(timerClock.html() === "0:00"){
    		if(lastTime == initialWorkTime){
    			$("#timer-title").html("Break Time");
    			timerClock.html(initialBreakTime);
    			lastTime = initialBreakTime;
    			return;
    		}
    		$("#timer-title").html("Time to Focus!");
    		timerClock.html(initialWorkTime);
    		lastTime = initialWorkTime;
    		return;
    	}

		if(secs === "00"){
			timerClock.html(function(index,oldhtml){
				return (parseInt(min) -1) + ":" + (60 -1);
			});
		}

		if(secs !== "00"){
			timerClock.html(function(index,oldhtml){
				var seconds = parseInt(secs) -1;
				if (seconds < 10){
					seconds = "0" + seconds;
				}
				return min + ":" + seconds ;
			});
		}
		

	},1000);

}