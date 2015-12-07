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


function pauseCountDown(event){
	var target = $(event.target);
	clearInterval(loopingTimer);
	target.removeClass("pause");
	target.addClass("start");
	engageButton.on("click",startCountDown);

}

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



var engageButton= $("#engage-button");
var timerBell = document.getElementById("timer-bell");
timerBell.volume = 0.5;
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
    		if($("#timer-title").html() === "Time to Focus!"){
    			$("#timer-title").html("Break Time");
    			timerClock.html(initialBreakTime);
    			lastTime = initialBreakTime;
    			timerBell.src = "breakbell.mp3";
    			timerBell.play();
    			return;
    		}
    		$("#timer-title").html("Time to Focus!");
    		timerClock.html(initialWorkTime);
    		lastTime = initialWorkTime;
    		timerBell.src = "workbell.mp3";
    		timerBell.play();

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

