function toggleBonsai(){
	var confirmed;
console.log("test")
if(bonsai){	
	
	confirmed = confirm("changing to normal mode will clear the microcode");
	if(confirmed){
		activateNormal();
		document.getElementById("bonsaiModeButton").innerText ="bonsai mode";	
		bonsai = false;
		showButtons();
	}	
	}else{
	

	confirmed = confirm("changing to bonsai mode will clear the microcode");
	if(confirmed){
	activateBonsai();
	document.getElementById("bonsaiModeButton").innerText ="normal mode";
	bonsai = true;	
	hideButtons();
	
	}
		
}



}


//disable normal only buttons

function hideButtons(){
	var hiddenButtons = document.getElementsByClassName("hiddenInBonsai");
	for(let i = 0;i<hiddenButtons.length;i++){
		hiddenButtons[i].style.display="none";
		
		
	}
	
	
	
	
}
function showButtons(){
	var hiddenButtons = document.getElementsByClassName("hiddenInBonsai");
	for(let i = 0;i<hiddenButtons.length;i++){
		hiddenButtons[i].style.display="block";
		
		
	}
	
	
	
	
}


function activateBonsai(){

	MicroCodeString = "8;2;3;5;0;0;0;0;0;0;4;2;18;16;15;1;9;7;0;0;4;2;18;17;15;1;9;7;0;0;11;7;0;0;0;0;0;0;0;0;4;2;18;10;9;7;0;0;0;0;19;7;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;FETCH;INC;DEC;JMP;TST;HLT";
	MicroCode =  MicroCodeString.split(";");	

	updateRam()
	GenerateMicroCodeTable();


	}
function activateNormal(){

	MicroCodeString = "8;2;3;5;0;0;0;0;0;0;4;2;18;9;7;0;0;0;0;0;4;2;13;9;7;0;0;0;0;0;4;2;14;9;7;0;0;0;0;0;4;15;1;9;7;0;0;0;0;0;11;7;0;0;0;0;0;0;0;0;4;2;18;10;9;7;0;0;0;0;4;2;18;16;15;1;9;7;0;0;4;2;18;17;15;1;9;7;0;0;4;12;15;1;9;7;0;0;0;0;19;7;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;FETCH;TAKE;ADD;SUB;SAVE;JMP;TST;INC;DEC;NULL;HLT";
	MicroCode =  MicroCodeString.split(";");	

	updateRam()
	GenerateMicroCodeTable();


	}
