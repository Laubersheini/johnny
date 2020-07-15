//Funktionen zum Schreiben in Busse/Ram
function writeToRam(Value,Address){
	Ram[Address] = Value;
	document.getElementsByClassName("col2")[Address].innerHTML = zeroPad(Value,5).substr(0, 2)+ "." + zeroPad(Value,5).substr(2,5)
	//document.getElementsByClassName("col3")[Address].innerHTML ="";
	AddOpnd(Address);
	}

function writeToAddressBus(number){
	
	Addressbus = parseInt(number);
	document.getElementById("AddressBus").innerText = zeroPad(Addressbus,3)
}

function writeToIns(number){
	ins = parseInt(number);
	document.getElementById("InsHi").innerText = zeroPad(number,5).substr(0, 2);
	document.getElementById("InsLow").innerText = zeroPad(number,5).substr(2,5)
}


function writeToDb(number){
	Datenbus = parseInt(number);
	document.getElementById("DataBus").innerText =zeroPad(number,5)
}

function writeToMc(number){
	document.getElementsByClassName("MicroCodeTable")[MicroCodeCounter].style.background = "" 
	
	MicroCodeCounter =parseInt(number);
	document.getElementById("MicoCodeCounter").innerText =zeroPad(number,3)	
	
	
	
	//highlighten der spalte
	highlightMc(MicroCodeCounter)
	
}

function writeToAcc(number){
	
	Akkumulator =parseInt(number);
	document.getElementById("Accumulator").innerText =zeroPad(number,5);
	
}

function writeToPc(number){
	
	Programmzaeler =parseInt(number);
	document.getElementById("ProgrammCounter").innerText =zeroPad(number,3);
	EditRam(Programmzaeler);
}
