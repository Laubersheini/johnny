function SingleMicroStep(){//legacy(entfernen)?

	microStep();
//console.log(SingleMicroStep.caller)
}


//Abläufe im Microcode


function microStep(display){
switch(parseInt(MicroCode[MicroCodeCounter]))	{
case 2://
RamDb();
MicroCodeCounter++;
if(display){
	FadeIn(1);
	setTimeout(FadeOut, blockFadeoutTime,1)
}
break;

case 1://
DbRam();
MicroCodeCounter++;
if(display){
	FadeIn(0);
	setTimeout(FadeOut, blockFadeoutTime,0)


}
break;

case 13://
AddAcc();
MicroCodeCounter++;
if(display){
	FadeIn(3);
	setTimeout(FadeOut, blockFadeoutTime,3)



}
break;


case 14://
SubAcc();
MicroCodeCounter++;
if(display){
	FadeIn(3);
	setTimeout(FadeOut, blockFadeoutTime,3)



}
break;

case 12://
NullAcc();
MicroCodeCounter++;
if(display){
FadeIn(11);
	setTimeout(FadeOut, blockFadeoutTime,13)
}
break;

case 18://
DbAcc();
MicroCodeCounter++;
if(display){
	FadeIn(3);
	setTimeout(FadeOut, blockFadeoutTime,3)


}

break;

case 15://
AccDb();
MicroCodeCounter++;
if(display){
	FadeIn(4);
	setTimeout(FadeOut, blockFadeoutTime,4)


}

break;

case 16://
IncAcc();
MicroCodeCounter++;


if(display){
FadeIn(12);
	setTimeout(FadeOut, blockFadeoutTime,12)
}

break;

case 17://
DecAcc();
MicroCodeCounter++;
if(display){
FadeIn(13);
	setTimeout(FadeOut, blockFadeoutTime,13)
}
break;

case 3://
DbIns();
MicroCodeCounter++;
if(display){
	FadeIn(2);
	setTimeout(FadeOut, blockFadeoutTime,2)


}
break;

case 5://
InsMc();
if(display){

	FadeIn(5);
	setTimeout(FadeOut, blockFadeoutTime,5)


}
break;

case 11://
InsPc();
MicroCodeCounter++;
if(display){
	FadeIn(7);
	setTimeout(FadeOut, blockFadeoutTime,7)



}
break;

case 4://
InsAd();
MicroCodeCounter++;
if(display){

	FadeIn(6);
	setTimeout(FadeOut, blockFadeoutTime,6)


}
break;

case 8://
PcAd();
MicroCodeCounter++;
if(display){
	FadeIn(8);
	setTimeout(FadeOut, blockFadeoutTime,8)


}
break;

case 7://
NullMc();

if(display){
	FadeIn(14);
	setTimeout(FadeOut, blockFadeoutTime,14)


}
break;

case 9://
IncPc();
MicroCodeCounter++;
if(display){
	FadeIn(17);
	setTimeout(FadeOut, blockFadeoutTime,17)


}
break;

case 10://
IncPc0();
MicroCodeCounter++;

if(display){
	FadeIn(16);
	setTimeout(FadeOut, blockFadeoutTime,16)


}
break;

case 19://
Halt();
MicroCodeCounter++;

if(display){
	FadeIn(15);
	setTimeout(FadeOut, blockFadeoutTime,15)


}
break;

default:
console.log("Ungültiger Befehl " +MicroCode[MicroCodeCounter] + "in Adresse " + MicroCodeCounter + " programm wird beendent");
alert("Kein Befehl in Microcodeadresse " + MicroCodeCounter + " Das Programm wird beendet")
Halt();
NullMc();
break

}//switch
document.getElementById("MicoCodeCounter").innerText = zeroPad(MicroCodeCounter,ramLength -1);

	if(MicroCodeCounter >0){
	document.getElementsByClassName("MicroCodeTable")[MicroCodeCounter-1].style.background = ""
	}
	highlightMc(MicroCodeCounter)

}




//Funktionen des MicroCode
function RamDb(){
	Datenbus = Ram[Addressbus];
	highlightRamAccess()
	document.getElementById("DataBus").innerHTML = zeroPad(Datenbus,ramLength+1);
	aufnehmen(2);
}


function DbRam(){
	writeToRam(Datenbus,Addressbus)
	highlightRamAccess()
	aufnehmen(1);
}

function DbAcc(){
	Akkumulator = Datenbus;
	document.getElementById("Accumulator").innerHTML = zeroPad(Akkumulator,ramLength +1 )

	if(Akkumulator == 0){
		FadeIn(9);
	}else{
		FadeOut(9);

	}
aufnehmen(18);
}



function AccDb(){
	Datenbus = Akkumulator;
	document.getElementById("DataBus").innerHTML = zeroPad(Datenbus,ramLength +1 )
	aufnehmen(15);
}

function NullAcc(){
	Akkumulator=0;
	document.getElementById("Accumulator").innerHTML ="00000";
	FadeIn(9);

	aufnehmen(12);
}

function IncAcc(){
	if(Akkumulator<parseInt(1 +"9".repeat(ramLength))){ Akkumulator++};
	document.getElementById("Accumulator").innerHTML = zeroPad(Akkumulator,ramLength +1 )
	aufnehmen(16);
	FadeOut(9);



	}

function DecAcc(){
	if(Akkumulator>0)Akkumulator--;
	document.getElementById("Accumulator").innerHTML = zeroPad(Akkumulator,ramLength +1 )
	if(Akkumulator == 0){
		FadeIn(9);
	}else{
		FadeOut(9);

	}



	aufnehmen(17);


	}

function AddAcc(){
	if(Akkumulator+Datenbus<"2" + "0".repeat(ramLength)){
	Akkumulator+=Datenbus;
	}else Akkumulator= (1 +"9".repeat(ramLength)).toString();
	document.getElementById("Accumulator").innerHTML = zeroPad(Akkumulator,ramLength +1 )
	aufnehmen(13);


	if(Akkumulator == 0){
		FadeIn(9);
	}else{
		FadeOut(9);

	}
	}

function SubAcc(){
	if(Akkumulator-Datenbus>=0){
	Akkumulator-=Datenbus;

	}else {Akkumulator=0;}

	document.getElementById("Accumulator").innerHTML = zeroPad(Akkumulator,ramLength +1 )

if(Akkumulator == 0){
		FadeIn(9);
	}else{
		FadeOut(9);

	}
	aufnehmen(14);
	}

function DbIns(){
	writeToIns(Datenbus);
	aufnehmen(3);
	}

function InsMc(){
	console.log( Math.floor(ins/ramSize)*10);
	writeToMc( Math.floor(ins/ramSize)*10	) //get only the opcode
	aufnehmen(5);
}

function InsAd(){
writeToAddressBus(zeroPad(ins,ramLength +1).substr(2,ramLength + 1));
aufnehmen(4);
}


function InsPc(){
	writeToPc(zeroPad(ins,ramLength +1).substr(2,ramLength + 1))
	aufnehmen(11);
	}

function PcAd(){
	writeToAddressBus(Programmzaeler);
	aufnehmen(8);
	}

function NullMc(){
//	MicroCodeCounter = 0;
//	document.getElementById("MicroCodeCaption").innerHTML = "000";
	writeToMc(0)
	aufnehmen(7);

}

function IncPc(){
if(Programmzaeler< parseInt("9".repeat(ramLength-1))){
writeToPc(Programmzaeler +1)

}
aufnehmen(9);
}

function IncPc0(){
if(Programmzaeler< parseInt("9".repeat(ramLength-1)) && Akkumulator == 0){
writeToPc(Programmzaeler +1)
}

aufnehmen(10);
}


function Halt(){
	alert("Ende des Programms")
	halt = true ;
	aufnehmen(19);
}
