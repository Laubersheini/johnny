/*
David Laubersheimer - 2019

mit dank an Dr. Peter Dauscher


*/
	//daten die zückgesetzt werden müssen
	var Addressbus = 0;
	var Datenbus = 0;
	var halt = false;
	var Akkumulator =0;
	//var Eingabe; // evt unbenutzt ?
	var pause = false;

	var ins = 0;
	var Programmzaeler =0;

	var MicroCodeCounter =0;
	var recording = false;
	var recordingCounter = 150; //gibt an an welcher stelle
	//150 zum testen

	//daten die nicht zurückgesetzt werden müssen
	var bonsai = false;
/*
	var screenShown = false;
	var resolution = 50; //allways square
	var pixelSize;
*/
	var timeoutforexecution  //zum abbrechen des ausführen des Programms
	var alterProgrammzaeler= 0;
	var geschwindigkeit = 1700; // intervall in dem Befehle ausgeführt werden

	var SelectetRamModule = 0;
	var dataHighlightedRamModule =0;

	var controlUnit = false;
	var numberDevisionChar = "." //für ändern zum komma beim englischen
	var MicroCode = [];//0-199 microdeprogramm, 200+ namen der Macrocodes
	var MicroCodeString ="";//nur zum Einlesen
	var lines = [];

	var blockFadeoutTime = 1200;

	var blinkgeschwindigkeit = 700;
	var blinkzyklus = 0;
	var timeoutforblinking //damit das Blinken abgebrochen werden kann


	var RamEingabeHeight //positionierung des Pfeils
	var tabelHeight

	var startScreenFadeOutTime = 1500; // für den Ladebildschirm
	var loaded = false;

	const ramSize = 1000  //this ideally has to be a multiple of 10
	const ramLength = Math.log10(ramSize) +1;

	var Ram = JSON.parse(localStorage.getItem('johnny-ram'));
	if(Ram == null){//default if local store has been cleared or johnny is started for the first time
		Ram = [];
		for(i=0;i<ramSize;i++){
			Ram[i] =0;

    }
		}


var turboMode = false;

//funktionen ohne Zuordnung
function initialize(){
	Befehlsauswahl = document.getElementById("CommandSelect");

		generateRam();

	MicroCode = JSON.parse(localStorage.getItem('johnny-microcode'));
	if(MicroCode == null){
		resetMicrocode();
	}else{
		GenerateMicroCodeTable();
	}



	document.getElementById("executeSpeedSlider").value = geschwindigkeit;
	document.getElementById("controlUnitCheckbox").checked = false;

	document.getElementById("AddressBusInput").addEventListener("keydown",AddressBusInputKeydown);//damit die Entertaste funktioniert
	document.getElementById("DataBusInput").addEventListener("keydown",DataBusInputKeydown);
	document.getElementById("RamInput").addEventListener("keydown",RamInputKeydown);
	document.addEventListener("keydown",keyDownHandler); //nur zum überspringen des ladebildschirms (wird nach dem Laden wieder entfernt)
	document.addEventListener("mousedown",mouseDownHandler); //nur zum überspringen des ladebildschirms (wird nach dem Laden wieder entfernt)
	window.addEventListener('resize', resize);

	document.getElementById(0).style.background = "#00F45D";
	//ladeBildschirm
	loaded = true;
	document.getElementById("loading").innerText ="";
	var loadEnd = new Date().getTime()

	if (window.matchMedia('(display-mode: standalone)').matches) {
		fadeOutStartScreen();
	}else{
		setTimeout(fadeOutStartScreen,startScreenFadeOutTime-(loadEnd-LoadStart));
	}

	}//ende initialize


function resetMicrocode(){


		microCodeString = "8;2;3;5;0;0;0;0;0;0;4;2;18;9;7;0;0;0;0;0;4;2;13;9;7;0;0;0;0;0;4;2;14;9;7;0;0;0;0;0;4;15;1;9;7;0;0;0;0;0;11;7;0;0;0;0;0;0;0;0;4;2;18;10;9;7;0;0;0;0;4;2;18;16;15;1;9;7;0;0;4;2;18;17;15;1;9;7;0;0;4;12;15;1;9;7;0;0;0;0;19;7;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;FETCH;TAKE;ADD;SUB;SAVE;JMP;TST;INC;DEC;NULL;HLT"
		MicroCode =  microCodeString.split(";");
		GenerateMicroCodeTable();

}

function fadeOutStartScreen(){//für verzögertes ausblenden des Startblidschirms(frühstens nach startScreenFadeOutTime ms  )
	document.getElementById("startscreen").style.display = "none";
	document.getElementById("programm").style.display = "inline";
	document.getElementsByTagName("body")[0].style.backgroundImage = "url(Hintergrund.png)"
	document.removeEventListener("keydown", keyDownHandler);	//wird für sonst nichts genutzt
	document.removeEventListener("mousedown",mouseDownHandler);	//wird für sonst nichts genutzt


	//dinge die nach dem Anzeigen gemacht werden müssen
	document.getElementById("innerRamDiv").scrollTop =0
	resize();//damit rameingabe richtig sitzt
	resetComputer()
}

function keyDownHandler(){
	if(loaded){
		fadeOutStartScreen();
	}

}


function mouseDownHandler(){
	if(loaded){
		fadeOutStartScreen();
	}

}


function resize(){

	RamEingabeHeight = getObjectHeight(document.getElementById("RamEingabe"))  //neupositionierung des Peiles für die Rameingabe bei änderung der Größe
	tabelHeight = getObjectHeight(document.getElementById(SelectetRamModule))
	document.getElementById("RamEingabe").style.top = (document.getElementById(SelectetRamModule).getBoundingClientRect().top - RamEingabeHeight/2 + tabelHeight/2)+"px";

	//needed for the Safari fix
	scrollMaxX = document.body.scrollWidth - window.innerWidth;
	scrollMaxY = document.body.scrollHeight - window.innerHeight;

/*
	//ändern der Auflösung des Bildschirms:
	let canvasWidth =document.getElementById("screen").clientWidth
	document.getElementById("screen").width = canvasWidth;
	document.getElementById("screen").height = canvasWidth;
	pixelSize = canvasWidth/resolution;
*/
}

function RamInputKeydown(e){
	if(e.key=="Enter"){
		ManuellRam();


	}
}

function DataBusInputKeydown(e){
	if(e.key === "Enter"){
	ManuellDb()
	}

}

	function AddressBusInputKeydown(e){
	if(e.key === "Enter"){
	ManuellAB()
	}

}



function CheckNumber(X,maxValue,minValue){//Überprüft ob nur Zaheln eingegeben wurden +Größe der Zahlen
	if(X<=maxValue && typeof X == "number" && X>=minValue ){
		return X;

	}
	else if( X>maxValue){
	return maxValue

	}else{ return 0;}

}

function updateSpeed(){
	geschwindigkeit = 3000 -document.getElementById("executeSpeedSlider").value;
	if(geschwindigkeit == 0){
		turboMode = true;
	}else{
		turboMode = false;
	}
}



function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


function getObjectHeight(object){//nimmt ein objekt und gibt die Höhe zurück

	return object.getBoundingClientRect().bottom -object.getBoundingClientRect().top

}




//aufnahme
function aufnahmeBlinken(){
	if(blinkzyklus== 0){
	document.getElementById("recordMcPanel").style.backgroundColor = "red";
	blinkzyklus++;
	}else{
		document.getElementById("recordMcPanel").style.backgroundColor = "yellow";
		blinkzyklus = 0;
	}
	timeoutforblinking =setTimeout(aufnahmeBlinken,blinkgeschwindigkeit);
}

function aufnahme(){

	if(recording){
		recording = false;
		clearTimeout(timeoutforblinking);
		document.getElementById("recordMcPanel").style.backgroundColor = "";
	}else{
		recording = true;
		recordingCounter = Math.floor(CheckNumber(parseInt(document.getElementById("aufnahmeZahl").value),200,0)/10)*10 // ignorieren der letzen stelle
		MicroCode[recordingCounter/10+200] = document.getElementById("aufnahmeName").value; //speichern des Namens
		document.getElementsByClassName("Mccol1")[recordingCounter].innerText = recordingCounter + "   " + MicroCode[recordingCounter/10+200] + ":" ;//name im Mc Tabelle einfügen

		for(i= recordingCounter;i<recordingCounter+10;i++){//zurückseten der Befehle im Mc
			MicroCode[i] = 0;
			document.getElementsByClassName("Mccol2")[i].innerText="";
		}


		//springen im Mc
		var myElement = document.getElementsByClassName('Mccol2')[recordingCounter-10];
		var topPos = myElement.offsetTop;
		document.getElementById('testdiv').scrollTop = topPos;

	//als option bei der Eingabe einfügen
	newOption = document.createElement("option");
	Att= document.createAttribute("value");
	Att.value = recordingCounter/10;
	newOption.setAttributeNode(Att);
	newOption.appendChild(document.createTextNode(zeroPad(recordingCounter/10) + ": " +  MicroCode[recordingCounter/10+200]));
	document.getElementById("CommandSelect").appendChild(newOption)
	aufnahmeBlinken();

	}
}

function aufnehmen(befehl){

if(recording){
MicroCode[recordingCounter] = befehl;	//schreiben des Befehls in mc

//springen beim aufnehmen
var myElement = document.getElementsByClassName('Mccol2')[recordingCounter-10];
var topPos = myElement.offsetTop;
document.getElementById('testdiv').scrollTop = topPos;

	newtd2 = document.getElementsByClassName("Mccol2")[recordingCounter];
	newtd2.innerText = microCodeToText(befehl);

localStorage.setItem("johnny-microcode",JSON.stringify(MicroCode));

recordingCounter++;
}//if

}
var maxRecursion = 15
var currentRecursions = 0;
function executeProgramm(){
	//console.log("hi");
	SingleMacroStep();
	pause = false ;

	if (!halt && alterProgrammzaeler != Programmzaeler){// beenden beim Halt und bei endlosschleifen durch fehlende oder einen jmp befehl auf die selbe adresse
		if(currentRecursions <maxRecursion && turboMode){
			currentRecursions++;
			alterProgrammzaeler = Programmzaeler;
			executeProgramm();

		}else{
		timeoutforexecution  = setTimeout(executeProgramm, geschwindigkeit);
		currentRecursions =0;
		}


	alterProgrammzaeler = Programmzaeler;
}
}




function SingleMacroStep(){
	microStep(false);
	while(MicroCodeCounter!=0){
		microStep(false);
	}

}


//für Ram
function AddOpnd(Address){ // TODO: should this be enabled in turbo mode?
	high = parseInt(zeroPad(Ram[Address],ramLength +1 ).substr(0, 2)) +200; //+200 um auslesen aus Microcode zu vereinfachen

	if(MicroCode[high]!= undefined && high!=200){
	document.getElementsByClassName("col4")[Address].innerHTML = MicroCode[high];
	document.getElementsByClassName("col5")[Address].innerHTML = parseInt(zeroPad(Ram[Address],ramLength +1 ).substr(2,ramLength +1));
	}else
	{
	document.getElementsByClassName("col4")[Address].innerHTML ="";
	document.getElementsByClassName("col5")[Address].innerHTML = "";
	}

}



//einlesen einer Microcodedatei
document.getElementById('microcodefile').onchange = function(){

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // Entire file
   // console.log(this.result);

    // By lines
   MicroCode = this.result.split('\n');

  for(i=0;i<200;i++){ //damit namen erhalten bleiben
	  MicroCode[i] = parseInt(MicroCode[i]);
  }

 GenerateMicroCodeTable();//updaten von tabelle und macrobefehlsauswahl
  };
  reader.readAsText(file);


};

//einlesen einer Ramdatei
document.getElementById('ramfile').onchange = function(){

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // Entire file
   // console.log(this.result);

    // By lines
   Ram = this.result.split('\n');

  updateRam()

  };
  reader.readAsText(file);


};



//"download" von dateien
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}







function pauseProgramm(){
	if(!pause){
		clearTimeout(timeoutforexecution);
		pause = true;

	}else{
	timeoutforexecution  = setTimeout(executeProgramm, geschwindigkeit);
	pause = false ;
	}


}




function nextRamModule(){
	//entfärben of Ram
document.getElementById(SelectetRamModule).style.background = "";
if(SelectetRamModule< parseInt("9".repeat(ramLength-1)) ){

	SelectetRamModule++}

//gelbfärbung der Spalte
document.getElementById(SelectetRamModule).style.background = "yellow";

	if(document.getElementById(SelectetRamModule).getBoundingClientRect().top  + tabelHeight /2< document.getElementById("RamDiv").getBoundingClientRect().bottom){
	document.getElementById("RamEingabe").style.top = (document.getElementById(SelectetRamModule).getBoundingClientRect().top - RamEingabeHeight/2 + tabelHeight/2)+"px"; //neupositionierung des Peiles für die Rameingabe
	}else{
	document.getElementById("innerRamDiv").scrollTop = (SelectetRamModule-1) * tabelHeight;
	document.getElementById("RamEingabe").style.top = (document.getElementById(SelectetRamModule).getBoundingClientRect().top - RamEingabeHeight/2 + tabelHeight/2)+"px"; //neupositionierung des Peiles für die Rameingabe
	}
}

function EditRam(CellNumber){
if(!turboMode){
//entfärben des alten Moduls
	if(dataHighlightedRamModule != SelectetRamModule){
		document.getElementById(SelectetRamModule).style.background = "";
	}



if(typeof(CellNumber) == "object"){
//erkennen der Spalte
SelectetRamModule = CellNumber.srcElement.parentNode.id;
}else {
	SelectetRamModule = CellNumber;

}


//gelbfärbung der Spalte
if(dataHighlightedRamModule != SelectetRamModule){
document.getElementById(SelectetRamModule).style.background = "yellow";
}

	if(document.getElementById(SelectetRamModule).getBoundingClientRect().top  + tabelHeight /2< document.getElementById("RamDiv").getBoundingClientRect().bottom){
	document.getElementById("RamEingabe").style.top = (document.getElementById(SelectetRamModule).getBoundingClientRect().top - RamEingabeHeight/2 + tabelHeight/2)+"px"; //neupositionierung des Peiles für die Rameingabe
	}else{
	document.getElementById("innerRamDiv").scrollTop = (SelectetRamModule-1) * tabelHeight;
	document.getElementById("RamEingabe").style.top = (document.getElementById(SelectetRamModule).getBoundingClientRect().top - RamEingabeHeight/2 + tabelHeight/2)+"px"; //neupositionierung des Peiles für die Rameingabe
	}
	}

}




function highlightMc(collum){	//übernimmt auch springen
//springen im Mc
	//document.getElementsByClassName("MicroCodeTable")[MicroCodeCounter].style.background = "" //muss vor ändern des Mc counters ausgeführt werden
if(!turboMode){
	var myElement = document.getElementsByClassName('Mccol2')[collum];
	var topPos = myElement.offsetTop;
	document.getElementById('testdiv').scrollTop = topPos;

	document.getElementsByClassName("MicroCodeTable")[MicroCodeCounter].style.background = "yellow"
}

}



function highlightRamAccess(){//übernimmt auch das ändern der unteren Tabelle

	if(dataHighlightedRamModule == SelectetRamModule){
		document.getElementById(SelectetRamModule).style.background = "yellow";

	}else{
		document.getElementById(dataHighlightedRamModule).style.background = "";


	}

	if(MicroCodeCounter != 1){ //nichtanzeigen beim FETCH befehl

		dataHighlightedRamModule = Addressbus;
		document.getElementById(dataHighlightedRamModule).style.background = "#00F45D";

	}

		console.log("hi")

}

/*
//this is needed to prevent Safari (ipad) from making the background scroll funny
var scrollX = 0;
var scrollY = 0;
var scrollMinX = 0;
var scrollMinY = 0;
var scrollMaxX = document.body.scrollWidth - window.innerWidth;
var scrollMaxY = document.body.scrollHeight - window.innerHeight;

// where the magic happens
window.addEventListener('scroll', function (e) {
	e.preventDefault();
  scrollX = window.scrollX;
  scrollY = window.scrollY;

  if (scrollX <= scrollMinX) scrollTo(scrollMinX, window.scrollY);
  if (scrollX >= scrollMaxX) scrollTo(scrollMaxX, window.scrollY);

  if (scrollY <= scrollMinY) scrollTo(window.scrollX, scrollMinY);
  if (scrollY >= scrollMaxY) scrollTo(window.scrollX, scrollMaxY);
}, false);
*/
