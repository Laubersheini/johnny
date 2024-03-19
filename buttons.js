var indicators= document.getElementsByClassName("dataMovement")


function FadeOut(number){
	indicators[number].style.display="none";
}

function FadeIn(number){
	indicators[number].style.display="block";
}




function DbRamClick(){
	DbRam();
	FadeIn(0);
	setTimeout(FadeOut, blockFadeoutTime,0)
}


function RamDbClick(){
	RamDb();
	FadeIn(1);
	setTimeout(FadeOut, blockFadeoutTime,1)

}

function DbInsClick(){
	DbIns();
	FadeIn(2);
	setTimeout(FadeOut, blockFadeoutTime,2)

}



function DbAccClick(){
	DbAcc();
	FadeIn(3);
	setTimeout(FadeOut, blockFadeoutTime,3)

}
function AddAccClick(){
	AddAcc();
	FadeIn(3);
	setTimeout(FadeOut, blockFadeoutTime,3)

}
function SubAccClick(){
	SubAcc();
	FadeIn(3);
	setTimeout(FadeOut, blockFadeoutTime,3)

}

function AccDbClick(){
	AccDb();
	FadeIn(4);
	setTimeout(FadeOut, blockFadeoutTime,4)

}



function InsMcClick(){
	InsMc();
	FadeIn(5);
	setTimeout(FadeOut, blockFadeoutTime,5)

}

function InsAdClick(){
	InsAd();
	FadeIn(6);
	setTimeout(FadeOut, blockFadeoutTime,6)

}

function InsPcClick(){
	InsPc();
	FadeIn(7);
	setTimeout(FadeOut, blockFadeoutTime,7)

}
function PcAdClick(){
	PcAd();
	FadeIn(8);
	setTimeout(FadeOut, blockFadeoutTime,8)

}

function NullAccClick(){
	NullAcc();
	FadeIn(11);
	setTimeout(FadeOut, blockFadeoutTime,11)

}


function IncAccClick(){
	IncAcc();
	FadeIn(12);
	setTimeout(FadeOut, blockFadeoutTime,12)


}
function DecAccClick(){
	DecAcc();
	FadeIn(13);
	setTimeout(FadeOut, blockFadeoutTime,13)


}

function NullMcClick(){
	NullMc();

	FadeIn(14);
	setTimeout(FadeOut, blockFadeoutTime,14);



}

function HaltClick(){
	Halt();


	FadeIn(15);
	setTimeout(FadeOut, blockFadeoutTime,15);

}


function IncPc0Click(){
	IncPc0();


	FadeIn(16);
	setTimeout(FadeOut, blockFadeoutTime,16);

}


function IncPcClick(){
	IncPc();
	FadeIn(17);
	setTimeout(FadeOut, blockFadeoutTime,17);

}


function newRam(){
	for(i=0;i<1000;i++){
		Ram[i] =0;
  }


	generateRam();
	localStorage.setItem("johnny-ram",JSON.stringify(Ram))

}

function ToggleControlUnit(){

	var elemente = document.getElementsByClassName("control")

	if(controlUnit){
	for(i=0; i<elemente.length;i++){
	elemente[i].style.display = "none";}
	controlUnit = false ;
	FadeIn(10);
	}else{
	for(i=0; i<elemente.length;i++){
	elemente[i].style.display = "inline";}
	controlUnit = true;
	FadeOut(10);
	}
}



function resetComputer(){

	writeToAddressBus(0);
	writeToDb(0);
	writeToIns(0);
	writeToMc(0);
	writeToAcc(0);
	writeToPc(0);
	halt = false;
	pause = false ;
	FadeIn(9);

	clearTimeout(timeoutforexecution); //beenden des Ausführen des programms
}


function downloadMc(){
	download(MicroCode.join("\r\n"), "Micro_code.mc","txt")

}
function downloadRam(){
	download(Ram.join("\r\n"), "Ram.ram","txt")

}

function CommandSelectChange(){
	var input = document.getElementById("RamInput").value.split(numberDevisionChar)
	document.getElementById("RamInput").value = zeroPad(Befehlsauswahl.value,2 )+ numberDevisionChar + zeroPad(input.pop(),ramLength +1).substr(2,ramLength);

}
function ManuellRam(){

	//ignorieren des Punktes der hi und low trennt
	var input = document.getElementById("RamInput").value.split(numberDevisionChar)
	writeToRam(CheckNumber(parseInt(input.join("")),(1 +"9".repeat(ramLength)).toString(),0),SelectetRamModule)
	nextRamModule();
	}

function ManuellDb(){
writeToDb(CheckNumber(parseInt(document.getElementById("DataBusInput").value),(1 +"9".repeat(ramLength)).toString(),0))



}
function ManuellAB(){

writeToAddressBus(CheckNumber(parseInt(document.getElementById("AddressBusInput").value),("9".repeat(ramLength-1)).toString(),0))


}


//Wenn auf das Hochladebild gegklickt wird wird an file-input "weitergeleitet"
function uploadRam(){
	document.getElementById('ramfile').click();

	 resetComputer()
}
function uploadMc(){
	document.getElementById('microcodefile').click();


}
