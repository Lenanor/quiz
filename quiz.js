
$(document).ready(function(){

	// Hides text and button when 'starta quiz'-button is clicked
	$("#show").hide();
    $("#hide").click(function(){
        $("#show").show();
        $("#hide").hide();
        $("#hide-text").hide();
        var startTime = new Date();
    });
  
	var i = 0;
	var rightAnswer = 0;
	var questionArray = [
		["1. Vilket år kom filmen'Mannen på taket'?", 1969, 1976, 1980, 2],
		["2. Är tomat ett bär?", "Ja", "Nej", "Ibland", 1],
		["3. Var uppstod dansen Lindy Hop?", "Queens", "Williamsburg", "Harlem", 3],
		["4. Vilken känd centralitaliensk rätt består av grillat bröd med vitlök, olivolja och tomat?", "Langos", "Naan", "Bruschetta", 3],
		["5. Vilken är Tysklands näst största stad?", "Hamburg", "Dresden", "Berlin", 1 ],
		["6. Vad heter servisen med gröna blad som Stig Lindberg formgivit för Gustavsberg?", "Syrén", "Berså", "Blå Blom", 2],
		["7. Vad hette sångaren i Roxy Music?", "Brian Eno", "Bryan Ferry", "Brian Wilson", 2],
		["8. Vad hette vätgasballongen som deltagarna i Andrées polarexpedition flög iväg med?", "Björnen", "Sälen", "Örnen", 3],
		["9. Var ligger Textilhögskolan?", "Vadstena", "Borås", "Göteborg", 2],
		["10. Vad heter karaktären som spelas av Amy Poehler i den 125 avsnitt långa tv-serien Parcs and Recreation?", "Betty Ford", "Melanie Wolf", "Leslie Knope", 3]
	];
	var second = 0, minute = 0;
	var stop = (questionArray.length-1);
	var startButton = document.querySelector("#hide");


	// Timer which start when 'starta quiz' button is clicked. Stops after one minute.
	startButton.addEventListener("click", function(){
		var clock = setInterval( function(){
	
    		second++
		
    		if(second > 59){
			second = 0
			minute++ 
			}
		
    		if(second < 10){
    			second = ("0" + second);
			}
			var time = document.getElementById("timer").innerHTML = (minute + ":" + second);
			
			// The answer session is max one minute then the page reloads
			// and an alert sign says time over. 
			if(minute == 1 && second == "01"){	 
				clearInterval(clock);
				$(".main-container").hide();
				sessionStorage.reloadAfterPageLoad = true;
				window.location.reload();
				if ( sessionStorage.reloadAfterPageLoad ) {
        		alert( "Tiden är ute!" );
        		sessionStorage.reloadAfterPageLoad = false;
    			}
			}
		}, 1000)
	});

	nextQuestion();
	
	function nextQuestion(){

		document.getElementById("question").innerHTML = questionArray[i][0];
		document.getElementById("1").innerHTML = questionArray[i][1];
		document.getElementById("2").innerHTML = questionArray[i][2];
		document.getElementById("3").innerHTML = questionArray[i][3];
		
		
		document.getElementById("1").addEventListener('click', checkAnswer);
		document.getElementById("2").addEventListener('click', checkAnswer);
		document.getElementById("3").addEventListener('click', checkAnswer);


		// Check if it's the last question in questionArray. 
		// Listen if one of the answer buttons get clicked, if so,
		// run the stopTimer function to create an element node and a text node
		// with the current time and append them. Hide the timer in the top of page (
		// because I don't manage to just stop it).

		if(i === stop){
	    	document.getElementById("1").addEventListener('click', stopTimer);
	     	document.getElementById("2").addEventListener('click', stopTimer);
			document.getElementById("3").addEventListener('click', stopTimer);

			function stopTimer() {
				var stopTime = document.getElementById("timer").innerHTML;
				var nodeTime = document.createElement("p");
	    		var time = document.createTextNode( "Tiden blev " + stopTime + " sekunder");
	    		nodeTime.appendChild(time);
	    		document.getElementById("printAnswers").appendChild(nodeTime);
	    		$("#timer").hide();
	    		$("#show").hide();
			}
		}
	};
	
	// Array[i][4] = the place in the array which holds the right 
	//answer. Choosen answer from buttons with id 1,2 or 3.
	function checkAnswer(event){ 
		var answer = event.target.id;
		var check = questionArray[i][4];
		if( answer == check ){
			rightAnswer += 1;
		}
		i++;
		if( i < questionArray.length){
			nextQuestion();
		}else{
	    	var node = document.createElement("p");
	    	var textnode = document.createTextNode( "Du fick " + rightAnswer + " rätt");
	    	node.appendChild(textnode);
	    	document.getElementById("printAnswers").appendChild(node);
		}	
	};
});









