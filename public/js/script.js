$(function () {

	// Status page
	if(location.pathname.indexOf('status') != -1) {
		$('#circle-cpu').circleProgress({
			value: 0,
			size: 150,
			startAngle: 4,
			fill: "#a022df",
			emptyFill: "#4a4383"
		});
		  
		$('#circle-gpu').circleProgress({
			value: 0,
			size: 150,
			startAngle: 4,
			fill: "#a022df",
			emptyFill: "#4a4383"
		});


		var socket = io();
		socket.on('updateData', function(data){
			let pcInformation = data['pcInformation'];
					
			//Update html
			$("#circle-cpu").circleProgress('value', pcInformation["cpu_usage"]);
			$("#circle-cpu h3").text(Math.trunc(pcInformation["cpu_usage"]*100)+"%");

			$("#circle-gpu").circleProgress('value', (pcInformation["gpu_usage"]/100));
			$("#circle-gpu h3").text(pcInformation["gpu_usage"]+"%");
			$("#circle-gpu h5").text(pcInformation["gpu_temp"]+"°C");
					
			let ramObj = $(".bar");
			ramObj.removeClass();
			ramObj.addClass("bar bar-"+Math.trunc(pcInformation["ram_usage"]*100)+" white");
			$(".ramUsageLabel").text(Math.trunc(pcInformation["ram_usage"]*100)+"%");
					
			$(".pingLabel").text(pcInformation["ping"]+" ms");
		});

	}else{
		
		$(".interactiveIcons").on( "click", function() {
			let selectedIcon = $(this).data("icon");
			$.ajax({
				url: "/iconExec",
				data: {"icon": selectedIcon}
			});
		});
		
		
		
	}


});